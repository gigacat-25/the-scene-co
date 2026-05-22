import { NextRequest, NextResponse } from "next/server";
import { getPortfolioBySlug } from "@/lib/db";
import { getBindings, isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";



export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const { slug: id } = await params;
    const body = await request.json() as { title?: string; slug?: string; category?: string; description?: string; image_url?: string; client_name?: string; technologies?: string; gallery_urls?: string; is_featured?: number; is_published?: number };
    const { title, slug, category, description, image_url, client_name, technologies, gallery_urls, is_featured, is_published } = body;
    await db.prepare("UPDATE portfolio_items SET title = COALESCE(?, title), slug = COALESCE(?, slug), category = COALESCE(?, category), description = COALESCE(?, description), image_url = COALESCE(?, image_url), client_name = COALESCE(?, client_name), technologies = COALESCE(?, technologies), gallery_urls = COALESCE(?, gallery_urls), is_featured = COALESCE(?, is_featured), is_published = COALESCE(?, is_published), updated_at = datetime('now') WHERE id = ?").bind(title, slug, category, description, image_url, client_name, technologies ? JSON.stringify(technologies) : undefined, gallery_urls, is_featured, is_published, id).run();
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
  await db.prepare("DELETE FROM portfolio_items WHERE id = ?").bind(id).run();
  return NextResponse.json({ success: true });
}
