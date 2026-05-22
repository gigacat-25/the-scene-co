# External Integrations

**Analysis Date:** 2026-05-22

## APIs & External Services

**Cloudflare D1 Database:**
- Purpose: Primary data store for events, services, team members, and admin config
- Binding: `the_scene_co_db`
- Database ID: `78963f57-36d8-4dd5-badf-78116887f292`
- Database name: `the-scene-co-db`
- Type: SQLite (serverless)
- Config: `wrangler.toml` lines 6-9
- Access: Via `getBindings()` in `src/lib/cf-bindings.ts`
- Schema: `schema.sql` (tables: `events`, `admin_config`; note: `seed.sql` references `services` and `team_members` tables not in `schema.sql`)
- Used in:
  - `src/app/api/events/route.ts` - GET/POST events
  - `src/app/api/events/[id]/route.ts` - GET/PUT/DELETE individual events
  - `src/app/api/services/route.ts` - GET/POST services
  - `src/app/api/services/[id]/route.ts` - GET/PUT/DELETE individual services
  - `src/app/api/team/route.ts` - GET/POST team members
  - `src/app/api/team/[id]/route.ts` - GET/PUT/DELETE individual team members
  - `src/app/api/admin/login/route.ts` - Admin password hash lookup

**Cloudflare R2 Storage:**
- Purpose: Object storage for event media (images, videos)
- Binding: `the_scene_co_media`
- Bucket name: `the-scene-co-media`
- Config: `wrangler.toml` lines 11-13
- Access: Via `getBindings()` in `src/lib/cf-bindings.ts`
- Used in:
  - `src/app/api/upload/route.ts` - POST uploads (multipart/form-data, max 50MB)
  - `src/app/api/media/[...key]/route.ts` - GET serves files as public proxy

**Google Maps:**
- Package: `@vis.gl/react-google-maps` 1.1.0
- Usage: `src/components/map.tsx` uses Google Maps embed iframe (not the SDK directly)
- Location hardcoded to Bangalore, India coordinates
- Types: `@types/google.maps` 3.55.11

**Google GenAI (via Genkit):**
- Package: `@genkit-ai/google-genai` 1.20.0
- Model: `googleai/gemini-2.5-flash`
- Config: `src/ai/genkit.ts`
- Dev server: `src/ai/dev.ts` (currently empty, flows imported for side effects)
- Scripts: `npm run genkit:dev`, `npm run genkit:watch`
- Auth: Requires `GOOGLE_GENAI_API_KEY` environment variable (not in codebase)

## Data Storage

**Databases:**
- Cloudflare D1 (SQLite)
  - Connection: Via `@cloudflare/next-on-pages` `getRequestContext()` in `src/lib/cf-bindings.ts`
  - Client: D1 native bindings (no ORM)
  - Schema: `schema.sql`
  - Tables:
    - `events` - id, title, category, date, description, image_url, likes, created_at
    - `admin_config` - key/value store for admin password hash
    - `services` - referenced in `seed.sql` (title, description, image_url, icon_name, features, eco_highlights, order_index)
    - `team_members` - referenced in API routes (name, role, bio, image_url, order_index)

**File Storage:**
- Cloudflare R2 (`the-scene-co-media` bucket)
  - Upload endpoint: `POST /api/upload` (`src/app/api/upload/route.ts`)
  - Serve endpoint: `GET /api/media/[...key]` (`src/app/api/media/[...key]/route.ts`)
  - Allowed types: image/jpeg, image/png, image/webp, image/gif, video/mp4, video/webm
  - Max size: 50MB
  - Key pattern: `events/{timestamp}-{random}.{ext}`
  - Cache headers: `public, max-age=31536000, immutable`

**Caching:**
- None detected (no Redis, no Cloudflare KV used)
- R2 media served with 1-year immutable cache headers

## Authentication & Identity

**Admin Auth:**
- Method: Cookie-based session (`admin_session` cookie)
- Password storage: bcrypt hash in D1 `admin_config` table (key: `admin_password_hash`)
- Default password: `sceneco_admin` (hash: `$2a$10$n9CM8OgInDlwpvjLaLbuuuUlAaJnZVlq1FYBPxqJQNq2VFCmBbH9e`)
- Login endpoint: `POST /api/admin/login` (`src/app/api/admin/login/route.ts`)
- Logout endpoint: `DELETE /api/admin/login`
- Session duration: 8 hours
- Cookie flags: httpOnly, secure (production only), sameSite=strict
- Hashing: Web Crypto API SHA-256 in edge runtime (not bcrypt comparison — **potential security issue**)
- Middleware: `src/middleware.ts` matches `/admin` routes (currently bypassed)
- Auth check: `isAuthenticated()` in `src/lib/cf-bindings.ts` (currently returns `true` — **bypassed until Clerk integration**)

**Note:** Firebase is installed (`firebase` 11.9.1 in `package.json`) but **not imported or used anywhere in source code**. It appears to be a leftover from the Project IDX / Firebase Studio environment. The `apphosting.yaml` and `.idx/dev.nix` files reference Firebase App Hosting and Firebase emulators, but the actual application uses Cloudflare for everything.

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- `console.log` / `console.error` used throughout API routes
- Contact form logs submissions to console (`src/app/api/contact/route.ts`)
- Firebase debug logs gitignored (`firebase-debug.log`, `firestore-debug.log`)

## CI/CD & Deployment

**Hosting:**
- Cloudflare Pages (primary)
  - Build command: `npx @cloudflare/next-on-pages`
  - Output: `.worker-next/index.mjs`
  - Compatibility date: 2024-09-23
  - Compatibility flags: `nodejs_compat`
- Firebase App Hosting (configured but likely not primary)
  - `apphosting.yaml`: maxInstances: 1

**CI Pipeline:**
- None detected (no `.github/workflows/`, no CI config files)

**Scripts:**
- `npm run dev` - Local dev with Turbopack on port 9002
- `npm run build` - Standard Next.js build
- `npm run pages:build` - Cloudflare Pages build
- `npm run genkit:dev` - Genkit AI dev server
- `npm run typecheck` - TypeScript type checking
- `npm run lint` - Next.js ESLint

## Environment Configuration

**Required env vars:**
- `GOOGLE_GENAI_API_KEY` - Google AI API key (for Genkit)
- `ADMIN_PASSWORD_HASH` - Admin password hash (in `wrangler.toml` vars, SHA-256 hex)

**Secrets location:**
- `.env.local` - Local development (gitignored)
- Cloudflare Pages environment variables - Production
- `wrangler.toml` `[vars]` section - Non-secret config

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- Contact form (`src/app/api/contact/route.ts`) — currently logs to console only, **TODO: implement email sending or DB storage**

## Integration Patterns

**Cloudflare Bindings Helper:**
- `src/lib/cf-bindings.ts` provides `getBindings()` function
- Uses dynamic `import("@cloudflare/next-on-pages")` to avoid errors in local dev
- Returns `{ db: D1Database | undefined, r2: R2Bucket | undefined }`
- Graceful degradation: returns `undefined` bindings when not on Cloudflare

**API Route Pattern:**
- All API routes use `export const runtime = "edge"`
- Common pattern: check bindings → return 503 if unavailable → proceed
- Auth check: `if (!isAuthenticated(request)) return unauthorizedResponse()` (currently bypassed)

---

*Integration audit: 2026-05-22*
