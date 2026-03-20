import { NextRequest, NextResponse } from "next/server";
import { getBindings, isAuthenticated, unauthorizedResponse, serviceUnavailableResponse } from "@/lib/cf-bindings";

export const runtime = "edge";

type Params = { params: { id: string } };

// ─── GET /api/events/[id] ─────────────────────────────────────────────────────
export async function GET(request: NextRequest, { params }: Params) {
    const { db } = await getBindings();
    if (!db) {
        return NextResponse.json({ _local: true, error: "Database not available" }, { status: 503 });
    }

    const result = await db.prepare("SELECT * FROM events WHERE id = ?").bind(params.id).first();
    if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ event: result });
}

// ─── DELETE /api/events/[id] ──────────────────────────────────────────────────
export async function DELETE(request: NextRequest, { params }: Params) {
    if (!isAuthenticated(request)) return unauthorizedResponse();

    const { db } = await getBindings();
    if (!db) return serviceUnavailableResponse();

    await db.prepare("DELETE FROM events WHERE id = ?").bind(params.id).run();
    return NextResponse.json({ success: true });
}

// ─── PUT /api/events/[id] — update event ──────────────────────────────────────
export async function PUT(request: NextRequest, { params }: Params) {
    if (!isAuthenticated(request)) return unauthorizedResponse();

    const { db } = await getBindings();
    if (!db) return serviceUnavailableResponse();

    try {
        const body = await request.json();
        const { title, category, date, description, image_url, gallery_urls } = body;

        if (!title || !category || !date || !description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const finalGallery = gallery_urls ? JSON.stringify(gallery_urls) : "[]";

        await db
            .prepare(
                "UPDATE events SET title = ?, category = ?, date = ?, description = ?, image_url = ?, gallery_urls = ? WHERE id = ?"
            )
            .bind(title, category, date, description, image_url, finalGallery, params.id)
            .run();

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// ─── PATCH /api/events/[id] — toggle like ─────────────────────────────────────
export async function PATCH(request: NextRequest, { params }: Params) {
    const { db } = await getBindings();

    const { action } = await request.json(); // "like" | "unlike"
    const delta = action === "like" ? 1 : -1;

    if (!db) {
        // Local dev: return optimistic value
        return NextResponse.json({ likes: action === "like" ? 1 : 0, _local: true });
    }

    await db
        .prepare("UPDATE events SET likes = MAX(0, likes + ?) WHERE id = ?")
        .bind(delta, params.id)
        .run();

    const row = await db
        .prepare("SELECT likes FROM events WHERE id = ?")
        .bind(params.id)
        .first<{ likes: number }>();

    return NextResponse.json({ likes: row?.likes ?? 0 });
}
