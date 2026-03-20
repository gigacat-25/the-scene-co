import { NextRequest, NextResponse } from "next/server";
import { getBindings, isAuthenticated, unauthorizedResponse, serviceUnavailableResponse } from "@/lib/cf-bindings";

export const runtime = "edge";

// ─── GET /api/events ──────────────────────────────────────────────────────────
export async function GET() {
    const { db } = await getBindings();

    if (!db) {
        // Local dev – return empty list with helpful note
        return NextResponse.json({
            events: [],
            _local: true,
            note: "D1 database only available on Cloudflare. Deploy to see real data.",
        });
    }

    const { results } = await db
        .prepare("SELECT * FROM events ORDER BY created_at DESC")
        .all();

    return NextResponse.json({ events: results });
}

// ─── POST /api/events ─────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
    if (!isAuthenticated(request)) return unauthorizedResponse();

    const { db } = await getBindings();
    if (!db) return serviceUnavailableResponse();

    const body = await request.json();
    const { title, category, date, description, image_url, gallery_urls } = body;

    if (!title || !category || !date || !description) {
        return NextResponse.json({ error: "title, category, date and description are required" }, { status: 400 });
    }

    const finalImage =
        image_url ||
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80";
    const finalGallery = gallery_urls ? JSON.stringify(gallery_urls) : "[]";

    const result = await db
        .prepare(
            "INSERT INTO events (title, category, date, description, image_url, gallery_urls) VALUES (?, ?, ?, ?, ?, ?)"
        )
        .bind(title, category, date, description, finalImage, finalGallery)
        .run();

    return NextResponse.json({ success: true, id: result.meta.last_row_id }, { status: 201 });
}
