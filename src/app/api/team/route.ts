import { NextRequest, NextResponse } from "next/server";
import { getPublishedTeamMembers, getAllTeamMembers } from "@/lib/db";
import { getBindings, isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "1" && isAuthenticated(request as NextRequest);
    if (isAdmin) {
      const members = await getAllTeamMembers();
      return NextResponse.json({ members });
    }
    const members = await getPublishedTeamMembers();
    return NextResponse.json({ members });
  } catch {
    return NextResponse.json({ members: [] });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = (await getBindings()).db;
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const body = await request.json() as { name?: string; role?: string; bio?: string; image_url?: string; order_index?: number };
    const { name, role, bio, image_url, order_index } = body;
    if (!name || !role) return NextResponse.json({ error: "name and role are required" }, { status: 400 });
    await db.prepare(
      "INSERT INTO team_members (name, role, bio, image_url, order_index) VALUES (?, ?, ?, ?, ?)"
    ).bind(name, role, bio || "", image_url || "", order_index ?? 0).run();
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
