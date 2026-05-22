import { NextRequest, NextResponse } from "next/server";
import { getPublishedTestimonials, getAllTestimonials } from "@/lib/db";
import { isAuthenticated } from "@/lib/cf-bindings";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "1" && isAuthenticated(request as NextRequest);
    if (isAdmin) {
      const testimonials = await getAllTestimonials();
      return NextResponse.json({ testimonials });
    }
    const testimonials = await getPublishedTestimonials();
    return NextResponse.json({ testimonials });
  } catch {
    return NextResponse.json({ testimonials: [] });
  }
}
