import { NextResponse } from "next/server";
import { getPublishedFAQs } from "@/lib/db";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const faqs = await getPublishedFAQs(category);
    return NextResponse.json({ faqs });
  } catch {
    return NextResponse.json({ faqs: [] });
  }
}
