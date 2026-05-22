import { NextRequest, NextResponse } from "next/server";
import { getPublishedPages } from "@/lib/db";
import { getBindings, isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";



export async function GET() {
  try {
    const pages = await getPublishedPages();
    return NextResponse.json({ pages });
  } catch {
    return NextResponse.json({ pages: [] });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const body = await request.json() as { slug?: string; title?: string; meta_description?: string; content?: string; is_published?: number };
    const { slug, title, meta_description, content, is_published } = body;
    if (!slug || !title) return NextResponse.json({ error: "slug and title required" }, { status: 400 });
    await db.prepare("INSERT INTO pages (slug, title, meta_description, content, is_published) VALUES (?, ?, ?, ?, ?)").bind(slug, title, meta_description || "", content || "", is_published ?? 1).run();
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
