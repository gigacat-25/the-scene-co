import { NextRequest, NextResponse } from "next/server";
import { getPortfolioBySlug } from "@/lib/db";

export const runtime = "edge";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}
