import { NextResponse } from "next/server";
import { getAllSettings } from "@/lib/db";

export const runtime = "edge";

export async function GET() {
  try {
    const settings = await getAllSettings();
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ settings: {} });
  }
}
