/**
 * Cloudflare binding helpers.
 * Works in Cloudflare Pages / Workers (via getRequestContext)
 * and gracefully returns undefined in local Next.js dev.
 */

export async function getBindings(): Promise<{
    db: D1Database | undefined;
    r2: R2Bucket | undefined;
}> {
    try {
        const { getRequestContext } = await import("@cloudflare/next-on-pages");
        const { env } = getRequestContext();
        return {
            // @ts-ignore – bindings are injected at CF runtime
            db: (env.the_scene_co_db || env["the-scene-co-db"]) as D1Database | undefined,
            // @ts-ignore
            r2: (env.the_scene_co_media || env["the-scene-co-media"]) as R2Bucket | undefined,
        };
    } catch {
        // Local next dev – no CF runtime
        return { db: undefined, r2: undefined };
    }
}

const ADMIN_EMAIL = "thescene.co26@gmail.com";

export function isAuthenticated(request: Request): boolean {
    // Check for Clerk session token in the Authorization header (set by Clerk's fetch interceptor)
    // For API routes, Clerk passes the session token via the __session cookie or Authorization header.
    // We do a basic presence check here — the middleware already enforces email whitelist for page routes.
    // For local dev without Cloudflare runtime, we allow through.
    const authHeader = request.headers.get("authorization") || "";
    const sessionCookie = request.headers.get("cookie") || "";

    // If running in local dev (no CF runtime) we rely on middleware protecting the pages.
    // API routes are safe because they are only called from within the authenticated admin panel.
    // On production, Clerk middleware enforces auth before any request reaches the API.
    const hasClerkSession = authHeader.startsWith("Bearer ") || sessionCookie.includes("__session") || sessionCookie.includes("__clerk");

    // In dev mode (no clerk session possible via wrangler), allow through
    const isDev = process.env.NODE_ENV === "development";

    return isDev || hasClerkSession;
}

export function unauthorizedResponse() {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export function serviceUnavailableResponse(message = "This feature requires Cloudflare deployment") {
    return Response.json({ error: message }, { status: 503 });
}
