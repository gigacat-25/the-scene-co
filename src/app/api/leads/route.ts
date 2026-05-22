import { NextRequest, NextResponse } from "next/server";
import { createLead, getLeads, checkRateLimit } from "@/lib/db";
import { isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    const allowed = await checkRateLimit(ip, "contact", 5, 60);
    if (!allowed) return NextResponse.json({ error: "Too many submissions. Try again later." }, { status: 429 });

    const body = await request.json() as { name?: string; email?: string; phone?: string; message?: string; service_interest?: string; budget_range?: string };
    const { name, email, phone, message, service_interest, budget_range } = body;
    if (!name || !email || !message) return NextResponse.json({ error: "name, email, and message required" }, { status: 400 });

    await createLead({ name, email, phone: phone || "", message, service_interest: service_interest || "", budget_range: budget_range || "" });

    // Send emails asynchronously
    try {
      const { sendGmail, getMailEnv } = await import("@/lib/mail");
      const config = await getMailEnv();

      // User acknowledgment email
      const userHtml = `
        <div style="font-family: sans-serif; color: #111; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="font-weight: 540; font-size: 20px;">Thank you for contacting The Scene Co.</h2>
          <p>Hi ${name},</p>
          <p>We've successfully received your inquiry about <strong>${service_interest || "our services"}</strong>. Our team is already reviewing your request and details.</p>
          <p>We will get back to you with a personalized proposal within 24 hours.</p>
          <br />
          <hr style="border: 0; border-top: 1px solid #eaeaea;" />
          <p style="font-size: 12px; color: #888;">This is an automated confirmation of your request. Please do not reply directly to this email.</p>
        </div>
      `;

      // Admin notification email
      const adminHtml = `
        <div style="font-family: sans-serif; color: #111; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="font-weight: 540; font-size: 20px; color: #d93838;">New Lead Inbound!</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Service Interest:</strong> ${service_interest || "Not specified"}</p>
          <p><strong>Budget Range:</strong> ${budget_range || "Not specified"}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 3px solid #111; margin: 15px 0; font-style: italic;">
            ${message.replace(/\n/g, "<br />")}
          </div>
          <p><a href="https://thescene.co.in/admin/leads" style="display: inline-block; background: #111; color: #fff; text-decoration: none; padding: 8px 16px; border-radius: 4px; font-size: 14px;">View In Admin Dashboard</a></p>
        </div>
      `;

      await Promise.allSettled([
        sendGmail({ to: email, subject: "We've received your request — The Scene Co.", htmlBody: userHtml }),
        sendGmail({ to: config.adminEmail, subject: `[New Lead] ${name} - ${service_interest || "Inquiry"}`, htmlBody: adminHtml })
      ]);
    } catch (mailErr) {
      console.error("Failed to send contact emails:", mailErr);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const leads = await getLeads();
    return NextResponse.json({ leads });
  } catch {
    return NextResponse.json({ leads: [] });
  }
}
