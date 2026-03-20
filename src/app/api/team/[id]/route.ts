import { NextRequest, NextResponse } from "next/server";
import { getBindings, isAuthenticated, unauthorizedResponse, serviceUnavailableResponse } from "@/lib/cf-bindings";

export const runtime = "edge";

type Params = { params: { id: string } };

// ─── GET /api/team/[id] ───────────────────────────────────────────────────────
export async function GET(request: NextRequest, { params }: Params) {
    const { db } = await getBindings();
    if (!db) return serviceUnavailableResponse();

    const result = await db.prepare("SELECT * FROM team_members WHERE id = ?").bind(params.id).first();
    if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ teamMember: result });
}

// ─── DELETE /api/team/[id] ────────────────────────────────────────────────────
export async function DELETE(request: NextRequest, { params }: Params) {
    if (!isAuthenticated(request)) return unauthorizedResponse();

    const { db } = await getBindings();
    if (!db) return serviceUnavailableResponse();

    await db.prepare("DELETE FROM team_members WHERE id = ?").bind(params.id).run();
    return NextResponse.json({ success: true });
}

// ─── PUT /api/team/[id] — update event ──────────────────────────────────────
export async function PUT(request: NextRequest, { params }: Params) {
    if (!isAuthenticated(request)) return unauthorizedResponse();

    const { db } = await getBindings();
    if (!db) return serviceUnavailableResponse();

    try {
        const body = await request.json();
        const { name, role, description, image_url } = body;

        // mapped bio from description in UI form
        if (!name || !role || !description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await db
            .prepare(
                "UPDATE team_members SET name = ?, role = ?, bio = ?, image_url = ? WHERE id = ?"
            )
            .bind(name, role, description, image_url, params.id)
            .run();

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
