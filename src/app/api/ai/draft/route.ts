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
      type: "general" | "invoice";
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
    let systemInstruction = "";
    let userPrompt = "";

    if (type === "invoice") {
      systemInstruction = `You are an AI assistant drafting a professional invoice payment request for "The Scene Co." (a premium digital studio building custom websites, e-commerce, and POS software).
Create a gorgeous HTML email featuring a clean, modern invoice styled with inline CSS matching the premium site theme.

Style Guide:
- Outer wrapper background: #f7f7f5 (surface-soft) with 40px vertical padding.
- Center card container: max-width 600px, background #ffffff, border 1px solid #e6e6e6, border-radius 24px, overflow hidden, box-shadow 0 4px 20px rgba(0,0,0,0.05).
- Header block: background #1f1d3d (brand navy), padding 30px, text-align center, with title "THE SCENE CO." in white text (font-size 22px, font-weight 700) and subtitle "INVOICE" in #dceeb1 (brand lime, uppercase, letter-spacing 2px, font-size 11px, monospace).
- Content padding: 40px.
- Table style: width 100%, border-collapse collapse, margin 24px 0, font-size 14px. Column headers (Item, Qty, Rate, Total) in #666 with font-weight 500. Row borders 1px solid #f1f1f1. Total row font-weight 700.
- Accent colors: Success green (#1ea64a) or brand coral (#f3c9b6) for totals or high priority blocks.
- Payment CTA button: background #000000, color #ffffff, border-radius 12px, font-weight 600, padding 14px 28px, text-decoration none, display inline-block.
- CRITICAL layout rule: All buttons/CTAs must be placed in their own separate blocks with vertical space, e.g., <div style="margin: 24px 0; text-align: center;"><a href="..." style="...">Button</a></div>. Never place buttons inline inside a paragraph or sentence. Simple text links can be inline.

The email must include:
1. Professional greeting to the client.
2. Elegant table detailing items, rates, quantity, and total.
3. Clear terms & instructions.

You must respond ONLY with a JSON object containing the keys "subject" and "htmlBody":
{
  "subject": "Invoice from The Scene Co.",
  "htmlBody": "<html>HTML content with inline CSS</html>"
}`;

      userPrompt = `Client Name: ${recipientName || "Valued Client"}
Items: ${JSON.stringify(invoiceDetails?.items || [])}
Total Amount: ${invoiceDetails?.currency || "₹"}${invoiceDetails?.total || 0}
Additional instruction: ${prompt || "None"}`;
    } else {
      systemInstruction = `You are an AI assistant drafting a professional business email for "The Scene Co." (a premium digital studio building custom websites, e-commerce, and POS software).
Create a polished HTML email with elegant inline CSS matching the premium site theme.

Style Guide:
- Outer wrapper background: #f7f7f5 (surface-soft) with 40px vertical padding.
- Center card container: max-width 600px, background #ffffff, border 1px solid #e6e6e6, border-radius 24px, overflow hidden, box-shadow 0 4px 20px rgba(0,0,0,0.05).
- Header block: background #1f1d3d (brand navy), padding 30px, text-align center, with title "THE SCENE CO." in white text (font-size 22px, font-weight 700) and subtitle "CLIENT MEMO" in #dceeb1 (brand lime, uppercase, letter-spacing 2px, font-size 11px, monospace).
- Content padding: 40px, font-size 15px, line-height 1.6, color #000000.
- Buttons / Links: background #000000, color #ffffff, border-radius 12px, font-weight 600, padding 14px 28px, text-decoration none, display inline-block.
- CRITICAL layout rule: All buttons/CTAs must be placed in their own separate blocks with vertical space, e.g., <div style="margin: 24px 0; text-align: center;"><a href="..." style="...">Button</a></div>. Never place buttons inline inside a paragraph or sentence. Simple text links can be inline.

You must respond ONLY with a JSON object containing the keys "subject" and "htmlBody":
{
  "subject": "Professional Subject Line",
  "htmlBody": "<html>HTML content with inline CSS</html>"
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
