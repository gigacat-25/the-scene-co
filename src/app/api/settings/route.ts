import { NextRequest, NextResponse } from "next/server";
import { getAllSettings } from "@/lib/db";
import { getBindings, isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";

export async function GET() {
  try {
    const settings = await getAllSettings();
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ settings: {} });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });

  try {
    const body = await request.json() as Record<string, string>;
    
    // Prepare transaction-like sequence of updates
    const statements = Object.entries(body).map(([key, value]) => {
      return db.prepare("INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)").bind(key, String(value));
    });

    await db.batch(statements);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
