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
    const body = await request.json() as { title?: string; slug?: string; category?: string; description?: string; image_url?: string; client_name?: string; technologies?: string; gallery_urls?: string; is_featured?: number };
    const { title, slug, category, description, image_url, client_name, technologies, gallery_urls, is_featured } = body;
    if (!title || !slug || !category || !description) return NextResponse.json({ error: "title, slug, category, description required" }, { status: 400 });
    await db.prepare("INSERT INTO portfolio_items (title, slug, category, description, image_url, client_name, technologies, gallery_urls, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(title, slug, category, description, image_url || "", client_name || "", JSON.stringify(technologies || []), gallery_urls || "[]", is_featured || 0).run();
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const { id } = await params;
    const body = await request.json() as { title?: string; slug?: string; category?: string; description?: string; image_url?: string; client_name?: string; technologies?: string; gallery_urls?: string; is_featured?: number; is_published?: number };
    const { title, slug, category, description, image_url, client_name, technologies, gallery_urls, is_featured, is_published } = body;
    await db.prepare("UPDATE portfolio_items SET title = COALESCE(?, title), slug = COALESCE(?, slug), category = COALESCE(?, category), description = COALESCE(?, description), image_url = COALESCE(?, image_url), client_name = COALESCE(?, client_name), technologies = COALESCE(?, technologies), gallery_urls = COALESCE(?, gallery_urls), is_featured = COALESCE(?, is_featured), is_published = COALESCE(?, is_published), updated_at = datetime('now') WHERE id = ?").bind(title, slug, category, description, image_url, client_name, technologies ? JSON.stringify(technologies) : undefined, gallery_urls, is_featured, is_published, id).run();
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  const { id } = await params;
  await db.prepare("DELETE FROM portfolio_items WHERE id = ?").bind(id).run();
  return NextResponse.json({ success: true });
}
