import { NextRequest, NextResponse } from "next/server";
import { getAllSettings } from "@/lib/db";
import { isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { type, recipientName, prompt, invoiceDetails } = (await request.json()) as {
      type: "general" | "invoice" | "quotation";
      recipientName?: string;
      prompt?: string;
      invoiceDetails?: any;
    };

    // 1. Get Groq API Key
    const settings = await getAllSettings();
    const apiKey = settings.groq_api_key || process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Groq API Key is not configured. Please add it in Admin Settings." },
        { status: 400 }
      );
    }

    // 2. Prepare instructions and prompts
    const host = request.headers.get("host") || "www.thescene.co.in";
    const protocol = host.includes("localhost") || host.includes("127.0.0.1") || host.includes("192.168.") ? "http" : "https";
    const origin = `${protocol}://${host}`;

    let systemInstruction = "";
    let userPrompt = "";

    if (type === "invoice" || type === "quotation") {
      systemInstruction = `You are an AI assistant drafting a professional project quotation or proposal email for "The Scene Co.".
Create a polished HTML email with elegant inline CSS. The layout must be clean and minimal, matching a premium client proposal design (resembling the modern, white-background email layout from Hostinger).

Structure Constraints:
1. Outer & inner container: background-color: #ffffff, font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif, max-width: 600px, margin: 0 auto, padding: 40px 20px, color: #1f1f1f.
2. Header: Centered brand logo image using <img src="${origin}/brand-logo.gif" alt="The Scene Co." style="width: 140px; height: auto; display: block; margin: 0 auto 24px auto;" />.
3. Main Title: Large bold centered heading (e.g., "Project Quotation from The Scene Co." or "Custom Project Proposal"), font-size: 28px, font-weight: 700, color: #111111, margin-bottom: 24px.
4. Salutation & Body: Left-aligned paragraphs, font-size: 15px, line-height: 1.6, color: #333333, margin-bottom: 16px.
5. Quotation Table: A clean, minimal table showing details. Width: 100%, border-collapse: collapse, margin: 24px 0, font-size: 14px. Column headers in #666 with font-weight: 500. Row borders 1px solid #e6e6e6. Total row font-weight: 700.
6. CTA Button: Centered inside a block <div style="text-align: center; margin: 32px 0;"><a href="https://www.thescene.co.in" style="background-color: #000000; color: #ffffff; padding: 14px 28px; border-radius: 8px; font-weight: 600; text-decoration: none; display: inline-block;">Accept Quotation & Start Project</a></div>. Never place buttons inline inside a paragraph or sentence.
7. Footer Divider: <hr style="border: 0; border-top: 1px solid #e6e6e6; margin: 32px 0;" />.
8. Footer text: Centered, small gray text (#888888, 12px), indicating copyright, links to Website and Support, and disclaimer.

You must respond ONLY with a JSON object containing the keys "subject" and "htmlBody":
{
  "subject": "Project Quotation - The Scene Co.",
  "htmlBody": "<html>HTML content matching the structure rules</html>"
}`;

      userPrompt = `Client Name: ${recipientName || "Valued Client"}
Items: ${JSON.stringify(invoiceDetails?.items || [])}
Total Amount: ${invoiceDetails?.currency || "₹"}${invoiceDetails?.total || 0}
Additional instruction: ${prompt || "None"}`;
    } else {
      systemInstruction = `You are an AI assistant drafting a professional business memo or client email for "The Scene Co.".
Create a polished HTML email with elegant inline CSS. The layout must be clean and minimal, matching a premium client email design (resembling the modern, white-background email layout from Hostinger).

Structure Constraints:
1. Outer & inner container: background-color: #ffffff, font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif, max-width: 600px, margin: 0 auto, padding: 40px 20px, color: #1f1f1f.
2. Header: Centered brand logo image using <img src="${origin}/brand-logo.gif" alt="The Scene Co." style="width: 140px; height: auto; display: block; margin: 0 auto 24px auto;" />.
3. Main Title: Large bold centered heading summarizing the email topic, font-size: 28px, font-weight: 700, color: #111111, margin-bottom: 24px.
4. Salutation & Body: Left-aligned paragraphs, font-size: 15px, line-height: 1.6, color: #333333, margin-bottom: 16px.
5. CTA Button: Centered inside a block <div style="text-align: center; margin: 32px 0;"><a href="https://www.thescene.co.in" style="background-color: #000000; color: #ffffff; padding: 14px 28px; border-radius: 8px; font-weight: 600; text-decoration: none; display: inline-block;">Get in touch</a></div>. Never place buttons inline inside a paragraph or sentence. Simple text links can be inline.
6. Footer Divider: <hr style="border: 0; border-top: 1px solid #e6e6e6; margin: 32px 0;" />.
7. Footer text: Centered, small gray text (#888888, 12px), indicating copyright, links to Website and Support, and disclaimer.

You must respond ONLY with a JSON object containing the keys "subject" and "htmlBody":
{
  "subject": "Professional Subject Line",
  "htmlBody": "<html>HTML content matching the structure rules</html>"
}`;

      userPrompt = `Recipient Name: ${recipientName || "Client"}
Email Brief/Request: ${prompt || "General business follow-up"}`;
    }

    // 3. Request Groq API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: `Groq API error: ${errText}` }, { status: 502 });
    }

    const resData = await response.json() as any;
    const textResult = resData?.choices?.[0]?.message?.content;

    if (!textResult) {
      return NextResponse.json({ error: "No response generated from Groq model." }, { status: 500 });
    }

    // Parse the JSON returned by Llama on Groq
    const parsed = JSON.parse(textResult.trim()) as { subject: string; htmlBody: string };
    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("AI Draft generation error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate draft" }, { status: 500 });
  }
}
