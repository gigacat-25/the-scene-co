import { NextRequest, NextResponse } from "next/server";
import { getBindings, isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const { id } = await params;
    const body = await request.json() as { 
      name?: string; 
      price_min?: number; 
      price_max?: number; 
      currency?: string;
      description?: string; 
      delivery_time?: string; 
      is_popular?: number; 
      is_published?: number;
      order_index?: number;
    };
    const { name, price_min, price_max, currency, description, delivery_time, is_popular, is_published, order_index } = body;
    
    await db.prepare(
      "UPDATE pricing_plans SET " +
      "name = COALESCE(?, name), " +
      "price_min = COALESCE(?, price_min), " +
      "price_max = COALESCE(?, price_max), " +
      "currency = COALESCE(?, currency), " +
      "description = COALESCE(?, description), " +
      "delivery_time = COALESCE(?, delivery_time), " +
      "is_popular = COALESCE(?, is_popular), " +
      "is_published = COALESCE(?, is_published), " +
      "order_index = COALESCE(?, order_index) " +
      "WHERE id = ?"
    ).bind(...[name, price_min, price_max, currency, description, delivery_time, is_popular, is_published, order_index, id].map(x => x === undefined ? null : x)).run();
    
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const { id } = await params;
    await db.prepare("DELETE FROM pricing_plans WHERE id = ?").bind(id).run();
    // Also delete features associated with the plan to avoid foreign key errors or dangling references
    await db.prepare("DELETE FROM pricing_features WHERE plan_id = ?").bind(id).run();
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
