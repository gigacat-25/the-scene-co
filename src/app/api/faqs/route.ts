import { NextRequest, NextResponse } from "next/server";
import { getPublishedFAQs, getAllFAQs } from "@/lib/db";
import { getBindings, isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "1" && isAuthenticated(request as NextRequest);
    if (isAdmin) {
      const faqs = await getAllFAQs();
      return NextResponse.json({ faqs });
    }
    const category = searchParams.get("category") || undefined;
    const faqs = await getPublishedFAQs(category);
    return NextResponse.json({ faqs });
  } catch {
    return NextResponse.json({ faqs: [] });
  }
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
