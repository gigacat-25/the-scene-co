import { NextRequest, NextResponse } from "next/server";
import { getBindings } from "@/lib/cf-bindings";

export const runtime = "edge";

function isAuthenticated(request: NextRequest): boolean {
  const session = request.cookies.get("admin_session");
  return session?.value === "authenticated";
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

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const { id } = await params;
    const body = await request.json() as { title?: string; meta_description?: string; content?: string; is_published?: number };
    const { title, meta_description, content, is_published } = body;
    await db.prepare("UPDATE pages SET title = COALESCE(?, title), meta_description = COALESCE(?, meta_description), content = COALESCE(?, content), is_published = COALESCE(?, is_published), updated_at = datetime('now') WHERE id = ?").bind(title, meta_description, content, is_published, id).run();
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
  await db.prepare("DELETE FROM pages WHERE id = ?").bind(id).run();
  return NextResponse.json({ success: true });
}
