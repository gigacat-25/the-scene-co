import { NextRequest, NextResponse } from "next/server";
import { getPublishedPortfolio, getAllPortfolioItems } from "@/lib/db";
import { getBindings, isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "1" && isAuthenticated(request as NextRequest);
    if (isAdmin) {
      const items = await getAllPortfolioItems();
      return NextResponse.json({ items });
    }
    const category = searchParams.get("category") || undefined;
    const items = await getPublishedPortfolio(category);
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const body = await request.json() as { title?: string; slug?: string; category?: string; description?: string; image_url?: string; client_name?: string; technologies?: string; gallery_urls?: string; project_url?: string; is_featured?: number };
    const { title, slug, category, description, image_url, client_name, technologies, gallery_urls, project_url, is_featured } = body;
    if (!title || !slug || !category || !description) return NextResponse.json({ error: "title, slug, category, description required" }, { status: 400 });
    await db.prepare("INSERT INTO portfolio_items (title, slug, category, description, image_url, client_name, technologies, gallery_urls, project_url, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(title, slug, category, description, image_url || "", client_name || "", JSON.stringify(technologies || []), gallery_urls || "[]", project_url || "", is_featured || 0).run();
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
