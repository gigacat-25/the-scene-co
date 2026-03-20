import { NextRequest, NextResponse } from "next/server";
import { getBindings } from "@/lib/cf-bindings";

export const runtime = "edge";

// ─── GET /api/media/[...key] ──────────────────────────────────────────────────
// Serves files stored in R2. Acts as a public proxy.
export async function GET(
    _request: NextRequest,
    { params }: { params: { key: string[] } }
) {
    const { r2 } = await getBindings();
    if (!r2) {
        return new NextResponse("R2 not available in local dev", { status: 503 });
    }

    const key = params.key.join("/");
    const object = await r2.get(key);

    if (!object) {
        return new NextResponse("File not found", { status: 404 });
    }

    const contentType = object.httpMetadata?.contentType ?? "application/octet-stream";
    const body = await object.arrayBuffer();

    return new NextResponse(body, {
        headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
            "Content-Length": String(body.byteLength),
        },
    });
}
