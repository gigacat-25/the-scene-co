import { NextRequest, NextResponse } from "next/server";
import { sendGmail } from "@/lib/mail";
import { isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { to, subject, htmlBody } = (await request.json()) as {
      to: string;
      subject: string;
      htmlBody: string;
    };

    if (!to || !subject || !htmlBody) {
      return NextResponse.json({ error: "to, subject, and htmlBody are required" }, { status: 400 });
    }

    const res = await sendGmail({ to, subject, htmlBody });
    if (!res.success) {
      return NextResponse.json({ error: res.error || "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("AI Send error:", error);
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
