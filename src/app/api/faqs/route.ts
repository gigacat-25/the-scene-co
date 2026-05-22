import { NextRequest, NextResponse } from "next/server";
import { getPublishedFAQs, getAllFAQs } from "@/lib/db";
import { isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "1" && isAuthenticated(request as NextRequest);
    if (isAdmin) {
      const faqs = await getAllFAQs();
      return NextResponse.json({ faqs });
    }
    const category = searchParams.get("category") || undefined;
    const faqs = await getPublishedFAQs(category);
    return NextResponse.json({ faqs });
  } catch {
    return NextResponse.json({ faqs: [] });
  }
}
