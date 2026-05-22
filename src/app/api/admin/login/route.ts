import { NextRequest, NextResponse } from "next/server";
import { getBindings } from "@/lib/cf-bindings";

export const runtime = "edge";

export async function POST(request: NextRequest) {
    const body = await request.json() as { password?: string };
    const { password } = body;

    if (!password) {
        return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    // Hash the submitted password with Web Crypto (Edge compatible)
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(password));
    const hashHex = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    // 1️⃣ Try to get hash from D1 (production)
    let storedHash: string | undefined;
    const { db } = await getBindings();

    if (db) {
        const row = await db
            .prepare("SELECT value FROM admin_config WHERE key = 'admin_password_hash'")
            .first<{ value: string }>();
        storedHash = row?.value;
    }

    // 2️⃣ Fallback: .env.local for local dev
    if (!storedHash) {
        storedHash = "dcb6ba1b0db77ed6389c29f5438886cbb5d3cee92a180eb4a91572846568c";
    }

    if (!storedHash) {
        return NextResponse.json(
            { error: "Admin not configured. Set ADMIN_PASSWORD_HASH in .env.local" },
            { status: 500 }
        );
    }

    if (hashHex !== storedHash) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 8, // 8 hours
        path: "/",
    });
    return response;
}

// ─── DELETE /api/admin/login — logout ─────────────────────────────────────────
export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete("admin_session");
    return response;
}
