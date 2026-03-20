import { NextRequest, NextResponse } from "next/server";
import { getBindings, isAuthenticated, unauthorizedResponse, serviceUnavailableResponse } from "@/lib/cf-bindings";

export const runtime = "edge";

// ─── GET /api/services ────────────────────────────────────────────────────────
export async function GET() {
    const { db } = await getBindings();

    if (!db) {
        return NextResponse.json({
            services: [],
            _local: true,
            note: "Local mode: Database unavailable."
        });
    }

    const result = await db.prepare("SELECT * FROM services ORDER BY order_index ASC, id ASC").all();
    return NextResponse.json({ services: result.results });
}

// ─── POST /api/services ───────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
    if (!isAuthenticated(request)) return unauthorizedResponse();

    const { db } = await getBindings();
    if (!db) return serviceUnavailableResponse();

    try {
        const body = await request.json();
        const { title, description, image_url, icon_name, features, eco_highlights } = body;

        if (!title || !description) {
            return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
        }

        const finalImage = image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80";

        const featuresStr = JSON.stringify(features || []);
        const ecoStr = JSON.stringify(eco_highlights || []);

        const result = await db
            .prepare(
                "INSERT INTO services (title, description, image_url, icon_name, features, eco_highlights, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)"
            )
            .bind(title, description, finalImage, icon_name || "Briefcase", featuresStr, ecoStr, 0)
            .run();

        return NextResponse.json({ success: true, id: result.meta.last_row_id }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
