import { NextRequest, NextResponse } from "next/server";
import { getPublishedClients, getAllClients } from "@/lib/db";
import { getBindings, isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "1" && isAuthenticated(request as NextRequest);
    if (isAdmin) {
      const clients = await getAllClients();
      return NextResponse.json({ clients });
    }
    const clients = await getPublishedClients();
    return NextResponse.json({ clients });
  } catch {
    return NextResponse.json({ clients: [] });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const body = await request.json() as { name?: string; logo_url?: string; order_index?: number };
    const { name, logo_url, order_index } = body;
    if (!name) return NextResponse.json({ error: "name is required" }, { status: 400 });
    await db.prepare(
      "INSERT INTO clients (name, logo_url, order_index) VALUES (?, ?, ?)"
    ).bind(name, logo_url || "", order_index ?? 0).run();
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
