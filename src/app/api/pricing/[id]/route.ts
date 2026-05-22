import { NextRequest, NextResponse } from "next/server";
import { getBindings } from "@/lib/cf-bindings";

export const runtime = "edge";

function isAuthenticated(request: NextRequest): boolean {
  return request.cookies.get("admin_session")?.value === "authenticated";
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const { id } = await params;
    const body = await request.json() as { name?: string; price_min?: number; price_max?: number; description?: string; delivery_time?: string; is_popular?: number; order_index?: number };
    const { name, price_min, price_max, description, delivery_time, is_popular, order_index } = body;
    await db.prepare("UPDATE pricing_plans SET name = COALESCE(?, name), price_min = COALESCE(?, price_min), price_max = COALESCE(?, price_max), description = COALESCE(?, description), delivery_time = COALESCE(?, delivery_time), is_popular = COALESCE(?, is_popular), order_index = COALESCE(?, order_index) WHERE id = ?").bind(name, price_min, price_max, description, delivery_time, is_popular, order_index, id).run();
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
