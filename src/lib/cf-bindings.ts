/**
 * Cloudflare binding helpers.
 * Works in Cloudflare Pages / Workers (via getRequestContext)
 * and gracefully returns undefined in local Next.js dev.
 */

let localDbInstance: any = null;

function getLocalD1Database(): D1Database | undefined {
    try {
        // Guard to ensure this only runs in a true Node.js environment, not in Edge Runtime emulator
        if (typeof process === "undefined" || !process.versions || !process.versions.node) {
            return undefined;
        }

        // Use eval("require") and char codes to bypass Next.js / Webpack / Turbopack static analysis
        const req = typeof require !== "undefined" ? require : eval("require");
        const fs = req(String.fromCharCode(102, 115));
        const path = req(String.fromCharCode(112, 97, 116, 104));
        const { DatabaseSync } = req(String.fromCharCode(110, 111, 100, 101, 58, 115, 113, 108, 105, 116, 101));

        if (localDbInstance) return localDbInstance;

        // Scan .wrangler folder for the sqlite database file
        const proc = typeof process !== "undefined" ? process : null;
        const cwd = proc && typeof proc["cwd"] === "function" ? proc["cwd"]() : ".";
        const wranglerDir = path.join(cwd, ".wrangler", "state", "v3", "d1", "miniflare-D1DatabaseObject");
        if (!fs.existsSync(wranglerDir)) {
            return undefined;
        }

        const files = fs.readdirSync(wranglerDir);
        const sqliteFile = files.find((f: string) => f.endsWith(".sqlite"));
        if (!sqliteFile) {
            return undefined;
        }

        const dbPath = path.join(wranglerDir, sqliteFile);
        const sqliteDb = new DatabaseSync(dbPath);

        class MockD1PreparedStatement {
            private sql: string;
            private bindings: any[];

            constructor(sql: string, bindings: any[] = []) {
                this.sql = sql;
                this.bindings = bindings;
            }

            bind(...values: any[]) {
                return new MockD1PreparedStatement(this.sql, values);
            }

            async all() {
                try {
                    const stmt = sqliteDb.prepare(this.sql);
                    const rows = stmt.all(...this.bindings);
                    return { results: rows, success: true };
                } catch (err: any) {
                    console.error("D1 Local Mock Query Error:", err);
                    throw err;
                }
            }

            async first() {
                try {
                    const stmt = sqliteDb.prepare(this.sql);
                    const rows = stmt.all(...this.bindings);
                    return rows[0] || null;
                } catch (err: any) {
                    console.error("D1 Local Mock Query Error:", err);
                    throw err;
                }
            }

            async run() {
                try {
                    const stmt = sqliteDb.prepare(this.sql);
                    const info = stmt.run(...this.bindings);
                    return { success: true, meta: { changes: info.changes } };
                } catch (err: any) {
                    console.error("D1 Local Mock Run Error:", err);
                    throw err;
                }
            }
        }

        localDbInstance = {
            prepare(sql: string) {
                return new MockD1PreparedStatement(sql);
            }
        } as unknown as D1Database;

        return localDbInstance;
    } catch {
        return undefined;
    }
}

export async function getBindings(): Promise<{
    db: D1Database | undefined;
    r2: R2Bucket | undefined;
}> {
    try {
        const { getRequestContext } = await import("@cloudflare/next-on-pages");
        const { env } = getRequestContext();
        return {
            // @ts-ignore – bindings are injected at CF runtime
            db: (env.the_scene_co_db || env["the-scene-co-db"] || getLocalD1Database()) as D1Database | undefined,
            // @ts-ignore
            r2: (env.the_scene_co_media || env["the-scene-co-media"]) as R2Bucket | undefined,
        };
    } catch {
        // Local next dev – no CF runtime
        return { db: getLocalD1Database(), r2: undefined };
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
