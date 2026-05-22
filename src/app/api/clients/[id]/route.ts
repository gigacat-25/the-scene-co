import { NextRequest, NextResponse } from "next/server";
import { getBindings, isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const { id } = await params;
    const body = await request.json() as { name?: string; logo_url?: string; order_index?: number; is_published?: number };
    const { name, logo_url, order_index, is_published } = body;
    await db.prepare(
      `UPDATE clients SET
        name = COALESCE(?, name),
        logo_url = COALESCE(?, logo_url),
        order_index = COALESCE(?, order_index),
        is_published = COALESCE(?, is_published),
        updated_at = datetime('now')
       WHERE id = ?`
    ).bind(
      ...[name, logo_url, order_index, is_published, id].map(x => x === undefined ? null : x)
    ).run();
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
  await db.prepare("DELETE FROM clients WHERE id = ?").bind(id).run();
  return NextResponse.json({ success: true });
}
