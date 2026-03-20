import { NextRequest, NextResponse } from "next/server";
import { getBindings, isAuthenticated, unauthorizedResponse, serviceUnavailableResponse } from "@/lib/cf-bindings";

export const runtime = "edge";
type Params = { params: { id: string } };

// ─── GET /api/services/[id] ───────────────────────────────────────────────────
export async function GET(request: NextRequest, { params }: Params) {
    const { db } = await getBindings();
    if (!db) return serviceUnavailableResponse();

    const result = await db.prepare("SELECT * FROM services WHERE id = ?").bind(params.id).first();
    if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ service: result });
}

// ─── DELETE /api/services/[id] ────────────────────────────────────────────────
export async function DELETE(request: NextRequest, { params }: Params) {
    if (!isAuthenticated(request)) return unauthorizedResponse();

    const { db } = await getBindings();
    if (!db) return serviceUnavailableResponse();

    await db.prepare("DELETE FROM services WHERE id = ?").bind(params.id).run();
    return NextResponse.json({ success: true });
}

// ─── PUT /api/services/[id] ───────────────────────────────────────────────────
export async function PUT(request: NextRequest, { params }: Params) {
    if (!isAuthenticated(request)) return unauthorizedResponse();

    const { db } = await getBindings();
    if (!db) return serviceUnavailableResponse();

    try {
        const body = await request.json();
        const { title, description, image_url, icon_name, features, eco_highlights } = body;

        if (!title || !description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const featuresStr = JSON.stringify(features || []);
        const ecoStr = JSON.stringify(eco_highlights || []);

        await db
            .prepare(
                "UPDATE services SET title = ?, description = ?, image_url = ?, icon_name = ?, features = ?, eco_highlights = ? WHERE id = ?"
            )
            .bind(
                title,
                description,
                image_url,
                icon_name || "Briefcase",
                featuresStr,
                ecoStr,
                params.id
            )
            .run();

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
