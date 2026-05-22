import { NextResponse } from "next/server";
import { getPublishedPages } from "@/lib/db";

export const runtime = "edge";

export async function GET() {
  try {
    const pages = await getPublishedPages();
    return NextResponse.json({ pages });
  } catch {
    return NextResponse.json({ pages: [] });
  }
}
