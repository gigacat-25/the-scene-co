import { NextRequest, NextResponse } from "next/server";
import { getBindings } from "@/lib/cf-bindings";

export const runtime = "edge";

function isAuthenticated(request: NextRequest): boolean {
  return request.cookies.get("admin_session")?.value === "authenticated";
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const body = await request.json() as Record<string, string>;
    for (const [key, value] of Object.entries(body)) {
      await db.prepare("INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?").bind(key, value, value).run();
    }
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
