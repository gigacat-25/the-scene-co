import { NextRequest, NextResponse } from "next/server";
import { getBindings, isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";



export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const body = await request.json() as { name?: string; role?: string; company?: string; quote?: string; avatar_url?: string; rating?: number; order_index?: number };
    const { name, role, company, quote, avatar_url, rating, order_index } = body;
    if (!name || !quote) return NextResponse.json({ error: "name and quote required" }, { status: 400 });
    await db.prepare("INSERT INTO testimonials (name, role, company, quote, avatar_url, rating, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(name, role || "", company || "", quote, avatar_url || "", rating || 5, order_index || 0).run();
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
  const body = await request.json() as { name?: string; role?: string; company?: string; quote?: string; avatar_url?: string; rating?: number; order_index?: number; is_published?: number };
  const { name, role, company, quote, avatar_url, rating, order_index, is_published } = body;
  await db.prepare("UPDATE testimonials SET name = COALESCE(?, name), role = COALESCE(?, role), company = COALESCE(?, company), quote = COALESCE(?, quote), avatar_url = COALESCE(?, avatar_url), rating = COALESCE(?, rating), order_index = COALESCE(?, order_index), is_published = COALESCE(?, is_published) WHERE id = ?").bind(...[name, role, company, quote, avatar_url, rating, order_index, is_published, id].map(x => x === undefined ? null : x)).run();
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  const { id } = await params;
  await db.prepare("DELETE FROM testimonials WHERE id = ?").bind(id).run();
  return NextResponse.json({ success: true });
}
