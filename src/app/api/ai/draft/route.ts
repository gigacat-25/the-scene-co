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

    // 1. Get Gemini API Key
    const settings = await getAllSettings();
    const apiKey = settings.gemini_api_key || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API Key is not configured. Please add it in Admin Settings." },
        { status: 400 }
      );
    }

    // 2. Prepare prompt
    let systemInstruction = "";
    if (type === "invoice") {
      systemInstruction = `
        You are an AI assistant drafting a professional invoice payment request for "The Scene Co." (a premium digital studio building custom websites, e-commerce, and POS software).
        Create a gorgeous HTML email featuring a clean, modern invoice styled with inline CSS.
        Use a minimal black-and-white theme with gray borders matching premium aesthetics.
        The email must include:
        1. Professional greeting to the client.
        2. Elegant table detailing items, rates, quantity, and total.
        3. Clear terms & instructions.
        
        Invoice Details:
        Client Name: ${recipientName || "Valued Client"}
        Items: ${JSON.stringify(invoiceDetails?.items || [])}
        Total Amount: ${invoiceDetails?.currency || "₹"}${invoiceDetails?.total || 0}
        Additional prompt/context: ${prompt || "None"}

        Respond ONLY with a JSON object in this format:
        {
          "subject": "Invoice from The Scene Co.",
          "htmlBody": "<html>HTML content with inline CSS</html>"
        }
      `;
    } else {
      systemInstruction = `
        You are an AI assistant drafting a professional business email for "The Scene Co." (a premium digital studio building custom websites, e-commerce, and POS software).
        Create a polished HTML email with elegant inline CSS.
        
        Details:
        Recipient Name: ${recipientName || "Client"}
        Email Brief/Request: ${prompt || "General business follow-up"}

        Respond ONLY with a JSON object in this format:
        {
          "subject": "Professional Subject Line",
          "htmlBody": "<html>HTML content with inline CSS</html>"
        }
      `;
    }

    // 3. Request Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: systemInstruction }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: `Gemini API error: ${errText}` }, { status: 502 });
    }

    const resData = await response.json() as any;
    const textResult = resData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResult) {
      return NextResponse.json({ error: "No response generated from Gemini." }, { status: 500 });
    }

    // Parse the JSON returned by Gemini
    const parsed = JSON.parse(textResult.trim()) as { subject: string; htmlBody: string };
    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("AI Draft generation error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate draft" }, { status: 500 });
  }
}
