import { NextResponse } from "next/server";
import { getPublishedBlogPosts } from "@/lib/db";

export const runtime = "edge";

export async function GET() {
  try {
    const posts = await getPublishedBlogPosts();
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ posts: [] });
  }
}
