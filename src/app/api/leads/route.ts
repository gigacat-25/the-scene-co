import { NextRequest, NextResponse } from "next/server";
import { createLead, getLeads, checkRateLimit } from "@/lib/db";

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
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const session = request.cookies.get("admin_session");
  if (session?.value !== "authenticated") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const leads = await getLeads();
    return NextResponse.json({ leads });
  } catch {
    return NextResponse.json({ leads: [] });
  }
}
