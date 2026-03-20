import { NextRequest, NextResponse } from "next/server";
import { getBindings, isAuthenticated, unauthorizedResponse, serviceUnavailableResponse } from "@/lib/cf-bindings";

export const runtime = "edge";

// ─── POST /api/upload ─────────────────────────────────────────────────────────
// Accepts a multipart/form-data with a "file" field.
// Uploads to R2 and returns the public URL.
export async function POST(request: NextRequest) {
    if (!isAuthenticated(request)) return unauthorizedResponse();

    const { r2 } = await getBindings();
    if (!r2) return serviceUnavailableResponse("R2 storage only available on Cloudflare deployment");

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm"];
    if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
            { error: `Unsupported file type: ${file.type}. Allowed: jpg, png, webp, gif, mp4, webm` },
            { status: 400 }
        );
    }

    // Validate file size (max 50MB)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
        return NextResponse.json({ error: "File too large. Max size is 50MB" }, { status: 400 });
    }

    // Generate a unique key
    const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 8);
    const key = `events/${timestamp}-${random}.${ext}`;

    // Upload to R2
    const arrayBuffer = await file.arrayBuffer();
    await r2.put(key, arrayBuffer, {
        httpMetadata: { contentType: file.type },
        customMetadata: { originalName: file.name, uploadedAt: new Date().toISOString() },
    });

    // Return the public URL (via our own API proxy)
    const publicUrl = `/api/media/${key}`;

    return NextResponse.json({ success: true, key, url: publicUrl }, { status: 201 });
}
