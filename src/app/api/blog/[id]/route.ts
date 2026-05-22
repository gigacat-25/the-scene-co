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
    const body = await request.json() as { title?: string; slug?: string; excerpt?: string; content?: string; cover_image_url?: string; author?: string; tags?: string[]; is_published?: number };
    const { title, slug, excerpt, content, cover_image_url, author, tags, is_published } = body;
    if (!title || !slug || !excerpt || !content) return NextResponse.json({ error: "title, slug, excerpt, content required" }, { status: 400 });
    await db.prepare("INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, author, tags, is_published, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(title, slug, excerpt, content, cover_image_url || "", author || "The Scene Co.", JSON.stringify(tags || []), is_published ?? 0, is_published ? new Date().toISOString().slice(0, 10) : null).run();
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  const { id } = await params;
  const body = await request.json() as { title?: string; slug?: string; excerpt?: string; content?: string; cover_image_url?: string; author?: string; tags?: string[]; is_published?: number };
  const { title, slug, excerpt, content, cover_image_url, author, tags, is_published } = body;
  await db.prepare("UPDATE blog_posts SET title = COALESCE(?, title), slug = COALESCE(?, slug), excerpt = COALESCE(?, excerpt), content = COALESCE(?, content), cover_image_url = COALESCE(?, cover_image_url), author = COALESCE(?, author), tags = COALESCE(?, tags), is_published = COALESCE(?, is_published), updated_at = datetime('now') WHERE id = ?").bind(title, slug, excerpt, content, cover_image_url, author, tags ? JSON.stringify(tags) : undefined, is_published, id).run();
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  const { id } = await params;
  await db.prepare("DELETE FROM blog_posts WHERE id = ?").bind(id).run();
  return NextResponse.json({ success: true });
}
