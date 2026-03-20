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
            db: env.the_scene_co_db as D1Database | undefined,
            // @ts-ignore
            r2: env.the_scene_co_media as R2Bucket | undefined,
        };
    } catch {
        // Local next dev – no CF runtime
        return { db: undefined, r2: undefined };
    }
}

export function isAuthenticated(request: Request): boolean {
    // Temporary bypass: The user requested to remove the login requirement completely until Clerk is added later.
    return true;
}

export function unauthorizedResponse() {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export function serviceUnavailableResponse(message = "This feature requires Cloudflare deployment") {
    return Response.json({ error: message }, { status: 503 });
}
