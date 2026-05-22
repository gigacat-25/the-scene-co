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

      // User acknowledgment email - premium branding matching "The Scene Co."
      const userHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f5; padding: 40px 20px; text-align: center;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #1f1d3d; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15); text-align: left;">
            {/* Header Block */}
            <div style="background-color: #000000; padding: 32px; border-bottom: 1px solid #333; text-align: center;">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">THE SCENE CO.</h1>
              <p style="color: #dceeb1; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 6px 0 0 0; font-family: monospace;">Vision. Code. Zero Templates.</p>
            </div>
            {/* Body Block */}
            <div style="padding: 40px; color: #ffffff;">
              <h2 style="font-size: 22px; font-weight: 600; margin-top: 0; color: #ffffff;">We've received your request!</h2>
              <p style="color: #b0aec6; font-size: 15px; line-height: 1.6; margin: 16px 0 24px 0;">
                Hi ${name},<br/><br/>
                Thank you for reaching out to us. We have received your inquiry regarding <strong>${service_interest || "our custom digital studio services"}</strong>. Our team is already analyzing your details.
              </p>
              
              {/* Highlight Box */}
              <div style="background-color: #2b2852; border-radius: 16px; padding: 20px; margin-bottom: 30px; border: 1px solid #3d3b66;">
                <h3 style="font-size: 14px; text-transform: uppercase; color: #dceeb1; letter-spacing: 1px; margin: 0 0 10px 0; font-family: monospace;">Inquiry Summary</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 4px 0; color: #b0aec6; width: 120px;">Interest:</td>
                    <td style="padding: 4px 0; color: #ffffff; font-weight: 600;">${service_interest || "Custom Project"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #b0aec6;">Est. Budget:</td>
                    <td style="padding: 4px 0; color: #ffffff; font-weight: 600;">${budget_range || "Not specified"}</td>
                  </tr>
                </table>
              </div>

              <p style="color: #ffffff; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
                We will review your requirements and get back to you with a free personalized proposal within 24 hours.
              </p>

              <div style="border-top: 1px solid #3a3861; padding-top: 24px; margin-top: 30px;">
                <p style="font-size: 14px; margin: 0; color: #b0aec6;">Best regards,</p>
                <p style="font-size: 16px; font-weight: 700; margin: 4px 0 0 0; color: #ffffff;">The Scene Co. Team</p>
              </div>
            </div>
          </div>
        </div>
      `;

      // Admin notification email - premium admin branding matching "The Scene Co."
      const adminHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f5; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e6e6e6; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <div style="background-color: #dceeb1; padding: 30px; text-align: center; border-bottom: 1px solid #cbdc9d;">
              <h1 style="color: #000000; font-size: 20px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">New Inbound Lead</h1>
              <p style="color: #000000; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; margin: 5px 0 0 0; font-family: monospace; opacity: 0.7;">The Scene Co. CMS Notification</p>
            </div>
            
            <div style="padding: 40px; color: #000000;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 14px;">
                <tr style="border-bottom: 1px solid #f1f1f1;">
                  <td style="padding: 12px 0; color: #666; font-weight: 500; width: 150px;">Name</td>
                  <td style="padding: 12px 0; font-weight: 600;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f1f1;">
                  <td style="padding: 12px 0; color: #666; font-weight: 500;">Email</td>
                  <td style="padding: 12px 0; font-weight: 600;"><a href="mailto:${email}" style="color: #000; text-decoration: underline;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f1f1;">
                  <td style="padding: 12px 0; color: #666; font-weight: 500;">Phone</td>
                  <td style="padding: 12px 0; font-weight: 600;">${phone || "Not provided"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f1f1;">
                  <td style="padding: 12px 0; color: #666; font-weight: 500;">Service Interest</td>
                  <td style="padding: 12px 0; font-weight: 600; color: #1ea64a;">${service_interest || "Not specified"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f1f1;">
                  <td style="padding: 12px 0; color: #666; font-weight: 500;">Budget Range</td>
                  <td style="padding: 12px 0; font-weight: 600; color: #ff3d8b;">${budget_range || "Not specified"}</td>
                </tr>
              </table>

              <div style="background-color: #f7f7f5; border: 1px solid #e6e6e6; border-radius: 16px; padding: 24px; margin-bottom: 30px;">
                <h4 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; color: #666; font-family: monospace; letter-spacing: 1px;">Message</h4>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #333; font-style: italic; white-space: pre-line;">${message}</p>
              </div>

              <div style="text-align: center;">
                <a href="https://thescene.co.in/admin/leads" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-size: 14px; font-weight: 600; transition: background-color 0.2s;">
                  Open Admin Dashboard
                </a>
              </div>
            </div>
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
