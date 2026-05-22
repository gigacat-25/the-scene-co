import { NextRequest, NextResponse } from "next/server";
import { getPublishedBlogPosts } from "@/lib/db";
import { getBindings, isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";



export async function GET() {
  try {
    const posts = await getPublishedBlogPosts();
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ posts: [] });
  }
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
