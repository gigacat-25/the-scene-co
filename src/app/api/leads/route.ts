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

      // User acknowledgment email - premium Hostinger-style clean branding matching "The Scene Co."
      const userHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff; color: #1f1f1f; max-width: 600px; margin: 0 auto; padding: 40px 20px; line-height: 1.6;">
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="font-size: 20px; font-weight: 700; letter-spacing: 2px; color: #000000; text-transform: uppercase;">THE SCENE CO.</span>
          </div>

          <h1 style="text-align: center; font-size: 28px; font-weight: 700; color: #111111; margin-bottom: 24px; letter-spacing: -0.5px;">We've received your request!</h1>

          <p style="margin-bottom: 16px; font-size: 15px; color: #333333;">Hi ${name},</p>
          
          <p style="margin-bottom: 24px; font-size: 15px; color: #333333;">
            Thank you for reaching out to us. We have received your inquiry regarding <strong>${service_interest || "our custom digital studio services"}</strong>. Our team is already reviewing your details.
          </p>

          <div style="background-color: #f7f7f5; border: 1px solid #e6e6e6; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <h3 style="font-size: 11px; text-transform: uppercase; color: #666666; letter-spacing: 1px; margin: 0 0 12px 0; font-family: monospace;">Inquiry Summary</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333333;">
              <tr>
                <td style="padding: 4px 0; color: #666666; width: 120px;">Interest:</td>
                <td style="padding: 4px 0; font-weight: 600;">${service_interest || "Custom Project"}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #666666;">Est. Budget:</td>
                <td style="padding: 4px 0; font-weight: 600;">${budget_range || "Not specified"}</td>
              </tr>
            </table>
          </div>

          <p style="margin-bottom: 24px; font-size: 15px; color: #333333;">
            We will review your requirements and get back to you with a free personalized proposal within 24 hours.
          </p>

          <p style="margin-top: 24px; font-size: 15px; color: #333333; border-top: 1px solid #e6e6e6; padding-top: 24px;">
            Best regards,<br/>
            <strong>The Scene Co. Team</strong>
          </p>

          <hr style="border: 0; border-top: 1px solid #e6e6e6; margin: 32px 0;" />

          <div style="text-align: center; font-size: 12px; color: #888888;">
            <span style="font-weight: 700; color: #000000; letter-spacing: 1px; text-transform: uppercase;">THE SCENE CO.</span>
            <p style="margin: 8px 0 12px 0; line-height: 1.5;">You received this automated notification because you submitted a request at thescene.co.in.</p>
            <div style="margin: 12px 0;">
              <a href="https://thescene.co.in" style="color: #666666; text-decoration: underline; margin: 0 8px;">Website</a>
              <a href="https://thescene.co.in/privacy" style="color: #666666; text-decoration: underline; margin: 0 8px;">Privacy Policy</a>
            </div>
            <p style="margin: 0;">&copy; 2026 The Scene Co. Ltd. All rights reserved.</p>
          </div>
        </div>
      `;

      // Admin notification email - premium Hostinger-style clean branding matching "The Scene Co."
      const adminHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff; color: #1f1f1f; max-width: 600px; margin: 0 auto; padding: 40px 20px; line-height: 1.6;">
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="font-size: 20px; font-weight: 700; letter-spacing: 2px; color: #000000; text-transform: uppercase;">THE SCENE CO.</span>
          </div>

          <h1 style="text-align: center; font-size: 28px; font-weight: 700; color: #111111; margin-bottom: 24px; letter-spacing: -0.5px;">New Lead Inbound</h1>

          <p style="margin-bottom: 24px; font-size: 15px; color: #333333;">
            A new inquiry has been submitted through the contact form. Details are listed below:
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; color: #333333;">
            <tr style="border-bottom: 1px solid #e6e6e6;">
              <td style="padding: 12px 0; color: #666666; font-weight: 500; width: 150px;">Name</td>
              <td style="padding: 12px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e6e6e6;">
              <td style="padding: 12px 0; color: #666666; font-weight: 500;">Email</td>
              <td style="padding: 12px 0; font-weight: 600;"><a href="mailto:${email}" style="color: #000000; text-decoration: underline;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e6e6e6;">
              <td style="padding: 12px 0; color: #666666; font-weight: 500;">Phone</td>
              <td style="padding: 12px 0; font-weight: 600;">${phone || "Not provided"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e6e6e6;">
              <td style="padding: 12px 0; color: #666666; font-weight: 500;">Service Interest</td>
              <td style="padding: 12px 0; font-weight: 600; color: #1ea64a;">${service_interest || "Not specified"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e6e6e6;">
              <td style="padding: 12px 0; color: #666666; font-weight: 500;">Budget Range</td>
              <td style="padding: 12px 0; font-weight: 600; color: #ff3d8b;">${budget_range || "Not specified"}</td>
            </tr>
          </table>

          <div style="background-color: #f7f7f5; border: 1px solid #e6e6e6; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
            <h4 style="margin: 0 0 10px 0; font-size: 11px; text-transform: uppercase; color: #666666; font-family: monospace; letter-spacing: 1px;">Message</h4>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #333333; font-style: italic; white-space: pre-line;">${message}</p>
          </div>

          <div style="text-align: center; margin: 32px 0;">
            <a href="https://thescene.co.in/admin/leads" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 14px; font-weight: 600;">
              Open Admin Dashboard
            </a>
          </div>

          <hr style="border: 0; border-top: 1px solid #e6e6e6; margin: 32px 0;" />

          <div style="text-align: center; font-size: 12px; color: #888888;">
            <span style="font-weight: 700; color: #000000; letter-spacing: 1px; text-transform: uppercase;">THE SCENE CO.</span>
            <p style="margin: 8px 0 12px 0; line-height: 1.5;">This is an administrative alert sent by the CMS regarding a contact submission.</p>
          </div>
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
