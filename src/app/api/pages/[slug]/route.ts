import { NextRequest, NextResponse } from "next/server";
import { getPageBySlug } from "@/lib/db";
import { getBindings, isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";



export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ page });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const { slug: id } = await params;
    const body = await request.json() as { title?: string; meta_description?: string; content?: string; is_published?: number };
    const { title, meta_description, content, is_published } = body;
    await db.prepare("UPDATE pages SET title = COALESCE(?, title), meta_description = COALESCE(?, meta_description), content = COALESCE(?, content), is_published = COALESCE(?, is_published), updated_at = datetime('now') WHERE id = ?").bind(...[title, meta_description, content, is_published, id].map(x => x === undefined ? null : x)).run();
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  const { slug: id } = await params;
  await db.prepare("DELETE FROM pages WHERE id = ?").bind(id).run();
  return NextResponse.json({ success: true });
}
