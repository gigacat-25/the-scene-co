import { NextRequest, NextResponse } from "next/server";
import { markLeadRead } from "@/lib/db";

export const runtime = "edge";

function isAuthenticated(request: NextRequest): boolean {
  return request.cookies.get("admin_session")?.value === "authenticated";
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await markLeadRead(parseInt(id));
  return NextResponse.json({ success: true });
}
