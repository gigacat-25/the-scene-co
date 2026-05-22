# Architecture

**Analysis Date:** 2026-05-22

## Pattern Overview

**Overall:** Next.js 15 App Router with Edge Runtime, deployed on Cloudflare Pages via `@cloudflare/next-on-pages`.

**Key Characteristics:**
- All API routes and pages use `export const runtime = "edge"` for Cloudflare Workers compatibility
- Server components for static/SEO pages; client components (`"use client"`) for interactive UI
- Cloudflare D1 (SQLite) for persistent data; Cloudflare R2 for file storage
- Bindings accessed via `getRequestContext()` from `@cloudflare/next-on-pages`
- Graceful fallbacks for local development when Cloudflare bindings are unavailable
- Admin panel is a single-page client component at `/admin` with inline CRUD for events, team, and services

## Layers

**Presentation Layer (App Router Pages):**
- Purpose: Route handling, page composition, SEO metadata
- Location: `src/app/`
- Contains: `page.tsx` files per route, `layout.tsx`, `robots.ts`, `sitemap.ts`
- Depends on: Section components, UI components
- Used by: End users, search engine crawlers

**Component Layer:**
- Purpose: Reusable UI building blocks
- Location: `src/components/sections/`, `src/components/layout/`, `src/components/ui/`
- Contains: Section components (Hero, Packages, Contact, etc.), layout components (Navbar, Footer), shadcn/ui primitives
- Depends on: React, shadcn/ui, lucide-react, framer-motion
- Used by: App Router pages

**API Layer (Route Handlers):**
- Purpose: RESTful API endpoints for CRUD operations
- Location: `src/app/api/`
- Contains: Route handlers for events, team, services, upload, media, contact, admin login
- Depends on: Cloudflare bindings (`@/lib/cf-bindings`), NextResponse
- Used by: Client-side fetch calls from React components

**Data Layer:**
- Purpose: Database queries and file storage
- Location: `src/lib/cf-bindings.ts` + Cloudflare D1/R2
- Contains: `getBindings()` helper, auth helpers
- Depends on: `@cloudflare/next-on-pages` runtime
- Used by: API route handlers

**AI Layer:**
- Purpose: Genkit AI configuration for future AI features
- Location: `src/ai/`
- Contains: `genkit.ts` (Gemini 2.5 Flash config), `dev.ts` (empty side-effect imports)
- Depends on: `genkit`, `@genkit-ai/google-genai`
- Used by: Not yet actively used in the application

## Data Flow

**Event Listing (Public):**

1. User visits `/past-events` (client component)
2. `useEffect` triggers `fetch("/api/events")`
3. `GET /api/events` route handler calls `getBindings()` for D1
4. D1 query: `SELECT * FROM events ORDER BY created_at DESC`
5. Results returned as JSON to client
6. Client renders event cards with `LikeButton` components

**Event Detail (Public):**

1. User visits `/past-events/[id]` (client component)
2. `useEffect` triggers `fetch("/api/events/${id}")`
3. `GET /api/events/[id]` queries D1 for single event
4. Client renders hero image, description, and gallery

**Event Like (Public):**

1. User clicks `LikeButton` on event card
2. Optimistic UI update (increment/decrement locally)
3. `PATCH /api/events/[id]` with `{ action: "like" | "unlike" }`
4. D1 updates: `UPDATE events SET likes = MAX(0, likes + ?) WHERE id = ?`
5. Server returns updated count; client syncs

**Admin CRUD (Protected):**

1. Admin visits `/admin` (client component)
2. Fetches events, team, services from respective API endpoints
3. Admin fills form, optionally uploads file via `POST /api/upload`
4. Upload goes to R2: `r2.put(key, arrayBuffer, { httpMetadata, customMetadata })`
5. R2 returns key; public URL is `/api/media/${key}`
6. Admin saves event via `POST /api/events` with image URL
7. D1 inserts record with parameterized query

**File Upload Flow:**

1. Admin selects file in admin dashboard
2. `POST /api/upload` receives `multipart/form-data`
3. Validates file type (jpg, png, webp, gif, mp4, webm) and size (max 50MB)
4. Generates key: `events/${timestamp}-${random}.${ext}`
5. Uploads to R2 bucket via `r2.put()`
6. Returns `{ success, key, url: "/api/media/${key}" }`

**File Serving Flow:**

1. Browser requests `/api/media/events/123456-abc.jpg`
2. `GET /api/media/[...key]` extracts key from catch-all param
3. Fetches object from R2: `r2.get(key)`
4. Returns with `Cache-Control: public, max-age=31536000, immutable`

**Contact Form (Stub):**

1. User fills contact form at `/#contact`
2. Form validates with Zod schema
3. `submitForm()` currently simulates network request (TODO: connect to backend)
4. `POST /api/contact` logs to console (TODO: implement email/DB persistence)

**State Management:**
- No global state management library (no Redux, Zustand, etc.)
- All state is local component state via `useState`
- Admin dashboard uses multiple `useState` hooks for events, team, services
- Toast notifications use custom reducer-based state in `use-toast.ts`
- Data fetching uses `useEffect` + `fetch` pattern throughout

## Key Abstractions

**Cloudflare Bindings Helper:**
- Purpose: Unified access to D1 and R2 with local dev fallback
- Location: `src/lib/cf-bindings.ts`
- Pattern: `getBindings()` returns `{ db, r2 }` with `undefined` fallbacks
- Auth helpers: `isAuthenticated()` (currently always returns `true`), `unauthorizedResponse()`, `serviceUnavailableResponse()`

**AnimateOnScroll Component:**
- Purpose: Scroll-triggered animations via IntersectionObserver
- Location: `src/components/animate-on-scroll.tsx`
- Pattern: Accepts `animationClass`, `hiddenClass`, optional `delay` props
- Used by: Nearly every section component for entrance animations

**MagneticParticles Component:**
- Purpose: Interactive canvas-based particle background for hero
- Location: `src/components/magnetic-particles.tsx`
- Pattern: 16x16 grid of particles that rotate toward cursor position
- Uses: framer-motion `useMotionValue` for mouse tracking, raw Canvas 2D API

**LikeButton Component:**
- Purpose: Optimistic UI like/unlike with server sync
- Location: `src/components/ui/like-button.tsx`
- Pattern: Optimistic update → PATCH request → server confirmation → revert on error

## Entry Points

**`src/app/layout.tsx` - Root Layout:**
- Triggers: Every page request
- Responsibilities: HTML shell, font loading (Montserrat + Playfair Display), Navbar, Footer, Toaster
- Runtime: edge
- Sets dark mode by default (`className="scroll-smooth dark"`)

**`src/app/page.tsx` - Homepage:**
- Triggers: `GET /`
- Responsibilities: Composes 8 section components (Hero, Packages, Sustainability, Leadership, Testimonials, FAQ, Contact, MapSection)
- Runtime: edge (server component)

**`src/middleware.ts` - Request Middleware:**
- Triggers: Requests matching `/admin` and `/admin/:path*`
- Responsibilities: Currently a no-op bypass (`NextResponse.next()`) — login requirement removed until Clerk integration
- Matcher: `['/admin', '/admin/:path*']`

**`src/app/api/events/route.ts` - Events API:**
- Triggers: `GET /api/events`, `POST /api/events`
- Responsibilities: List all events, create new event (admin only)

**`src/app/api/events/[id]/route.ts` - Single Event API:**
- Triggers: `GET /api/events/[id]`, `DELETE /api/events/[id]`, `PUT /api/events/[id]`, `PATCH /api/events/[id]`
- Responsibilities: Get single event, delete event (admin), update event (admin), toggle like (public)

## Error Handling

**Strategy:** Graceful degradation with local dev fallbacks

**Patterns:**
- **Missing bindings:** API routes check `if (!db)` and return empty data with `_local: true` flag and helpful note
- **Auth bypass:** `isAuthenticated()` always returns `true` (temporary until Clerk added); `unauthorizedResponse()` returns 401 JSON
- **Service unavailable:** `serviceUnavailableResponse()` returns 503 when Cloudflare bindings missing
- **Client-side:** `try/catch` around all `fetch` calls; silent failures with empty state fallbacks
- **Form validation:** Zod schemas in `contact-form.tsx` with react-hook-form integration
- **Admin login:** SHA-256 hash comparison via Web Crypto API (`crypto.subtle.digest`) with D1 fallback to `.env.local`

**Error Response Pattern:**
```typescript
// API routes consistently return:
return NextResponse.json({ error: "message" }, { status: 400/401/404/500 });
```

## Cross-Cutting Concerns

**Logging:** `console.log` for development; `console.error` in catch blocks. No structured logging framework.

**Validation:** Zod schemas for contact form (`src/components/contact-form.tsx`). API routes use manual field checks (`if (!title || !category ...)`).

**Authentication:** Cookie-based admin session (`admin_session` cookie, 8-hour expiry). Currently bypassed — `isAuthenticated()` returns `true`. Login route at `POST /api/admin/login` with SHA-256 hash comparison. Logout via `DELETE /api/admin/login`.

**SEO:** Metadata in `layout.tsx` (title, description, OpenGraph, Twitter cards). `robots.ts` and `sitemap.ts` for search engine configuration.

**Styling:** Tailwind CSS with CSS variables for theming. Custom fonts (Playfair Display for headlines, Montserrat for body). Dark mode only (no light mode toggle). Custom animations (`fade-in`, `slide-in-up`).

**Image Handling:** Mix of `next/image` for local/public assets and raw `<img>` tags for external URLs (Unsplash, R2). Remote patterns configured in `next.config.ts` for `placehold.co`, `images.unsplash.com`, `picsum.photos`.

---

*Architecture analysis: 2026-05-22*
