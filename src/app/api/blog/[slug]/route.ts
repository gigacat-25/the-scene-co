import { NextRequest, NextResponse } from "next/server";
import { getBlogPostBySlug } from "@/lib/db";
import { getBindings, isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";



export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  const { slug: id } = await params;
  const body = await request.json() as { title?: string; slug?: string; excerpt?: string; content?: string; cover_image_url?: string; author?: string; tags?: string[]; is_published?: number };
  const { title, slug, excerpt, content, cover_image_url, author, tags, is_published } = body;
  const tagsVal = tags ? JSON.stringify(tags) : null;
  await db.prepare("UPDATE blog_posts SET title = COALESCE(?, title), slug = COALESCE(?, slug), excerpt = COALESCE(?, excerpt), content = COALESCE(?, content), cover_image_url = COALESCE(?, cover_image_url), author = COALESCE(?, author), tags = COALESCE(?, tags), is_published = COALESCE(?, is_published), updated_at = datetime('now') WHERE id = ?").bind(...[title, slug, excerpt, content, cover_image_url, author, tagsVal, is_published, id].map(x => x === undefined ? null : x)).run();
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  const { slug: id } = await params;
  await db.prepare("DELETE FROM blog_posts WHERE id = ?").bind(id).run();
  return NextResponse.json({ success: true });
}
