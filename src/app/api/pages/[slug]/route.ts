import { NextRequest, NextResponse } from "next/server";
import { getPageBySlug } from "@/lib/db";

export const runtime = "edge";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ page });
}
