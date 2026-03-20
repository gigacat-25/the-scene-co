import { NextRequest, NextResponse } from "next/server";
import { getBindings, isAuthenticated, unauthorizedResponse, serviceUnavailableResponse } from "@/lib/cf-bindings";

export const runtime = "edge";

// ─── GET /api/team ────────────────────────────────────────────────────────────
export async function GET() {
    const { db } = await getBindings();

    if (!db) {
        // Graceful fallback for local development
        return NextResponse.json({
            team: [],
            _local: true,
            note: "Local mode: Run Cloudflare Pages deployment to see true D1 Team data."
        });
    }

    const result = await db.prepare("SELECT * FROM team_members ORDER BY order_index ASC, id ASC").all();
    return NextResponse.json({ team: result.results });
}

// ─── POST /api/team ───────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
    if (!isAuthenticated(request)) return unauthorizedResponse();

    const { db } = await getBindings();
    if (!db) return serviceUnavailableResponse();

    try {
        const body = await request.json();
        const { name, role, description, image_url } = body;

        // description is mapped to 'bio' in DB
        if (!name || !role || !description) {
            return NextResponse.json({ error: "Name, Role, and Bio are required" }, { status: 400 });
        }

        const finalImage =
            image_url ||
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80";

        const result = await db
            .prepare(
                "INSERT INTO team_members (name, role, bio, image_url, order_index) VALUES (?, ?, ?, ?, ?)"
            )
            .bind(name, role, description, finalImage, 0)
            .run();

        return NextResponse.json({ success: true, id: result.meta.last_row_id }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
