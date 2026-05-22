import { NextRequest, NextResponse } from "next/server";
import { getBindings } from "@/lib/cf-bindings";

export const runtime = "edge";

function isAuthenticated(request: NextRequest): boolean {
  return request.cookies.get("admin_session")?.value === "authenticated";
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const body = await request.json() as { question?: string; answer?: string; category?: string; order_index?: number };
    const { question, answer, category, order_index } = body;
    if (!question || !answer) return NextResponse.json({ error: "question and answer required" }, { status: 400 });
    await db.prepare("INSERT INTO faqs (question, answer, category, order_index) VALUES (?, ?, ?, ?)").bind(question, answer, category || "general", order_index || 0).run();
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
