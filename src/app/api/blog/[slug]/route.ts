import { NextRequest, NextResponse } from "next/server";
import { getBlogPostBySlug } from "@/lib/db";

export const runtime = "edge";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}
