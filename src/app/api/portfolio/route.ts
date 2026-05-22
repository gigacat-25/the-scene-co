import { NextResponse } from "next/server";
import { getPublishedPortfolio } from "@/lib/db";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const items = await getPublishedPortfolio(category);
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
