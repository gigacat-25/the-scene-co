import { NextResponse } from "next/server";
import { getPublishedTestimonials } from "@/lib/db";

export const runtime = "edge";

export async function GET() {
  try {
    const testimonials = await getPublishedTestimonials();
    return NextResponse.json({ testimonials });
  } catch {
    return NextResponse.json({ testimonials: [] });
  }
}
