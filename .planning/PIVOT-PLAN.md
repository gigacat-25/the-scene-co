# The Scene Co — Pivot Plan: Event Management → SaaS / Website Builder Agency

---

## 1. COMPETITOR ANALYSIS & PRICING LANDSCAPE

### 1.1 DIY Website Builders (Your Indirect Competitors)

| Platform | Starting Price | CMS | E-commerce | Hosting Included | Free Domain |
|---|---|---|---|---|---|
| **Wix** | ₹1,400/mo (~$17/mo) | Yes | Yes (₹2,900/mo) | Yes | 1 year free on annual |
| **Squarespace** | ₹1,320/mo (~$16/mo) | Yes | Yes (₹2,300/mo) | Yes | 1 year free on annual |
| **Webflow** | ₹1,150/mo (~$14/mo) | Excellent | Yes (₹2,400/mo) | Yes | No |
| **Framer** | ₹820/mo (~$10/mo) | Good | No native | Yes | No |
| **Shopify** | ₹2,970/mo (~$36/mo) | Basic | Excellent | Yes | No |
| **WordPress.com** | ₹330/mo (~$4/mo) | Yes | Yes (₹3,700/mo) | Yes | No |

**Key Insight:** These platforms charge ₹800–₹3,000/month PER SITE. Your offer of **1 year free hosting + 1 year free domain** directly undercuts this and is a massive differentiator.

### 1.2 Indian Web Development Agencies (Your Direct Competitors)

| Agency Type | Basic Website | Business Website | E-commerce | Custom Web App |
|---|---|---|---|---|
| **Freelancer** | ₹5K–₹15K | ₹15K–₹40K | ₹30K–₹75K | ₹50K–₹1.5L |
| **Small Agency** | ₹15K–₹40K | ₹40K–₹1L | ₹50K–₹2.5L | ₹1L–₹5L |
| **Mid Agency** | ₹40K–₹1L | ₹1L–₹2.5L | ₹1.5L–₹5L | ₹3L–₹10L |
| **Large Agency** | ₹1L+ | ₹2.5L+ | ₹5L+ | ₹10L+ |

### 1.3 POS System Competitors

| Platform | Monthly Cost | Hardware | Best For |
|---|---|---|---|
| **Square** | Free–₹5,000/mo | ₹3,000+ | Small retail |
| **Toast** | ₹5,000–₹20,000/mo | ₹55,000+ | Restaurants |
| **Lightspeed** | ₹5,500–₹15,000/mo | ₹25,000+ | Retail + Restaurant |
| **Lavu** | ₹5,700–₹25,000/mo | ₹55,000+ | Restaurants |
| **Custom POS** | ₹15K–₹1L+ (one-time) | Variable | Tailored needs |

### 1.4 White-Label SaaS Builders (Your Model Competitors)

| Platform | Monthly Cost | Per-Site Cost | White Label |
|---|---|---|---|
| **GoHighLevel** | $497/mo (~₹41K) | $0 (unlimited) | Yes |
| **Simvoly** | $12–$149/mo | Per plan | 100% |
| **Duda** | $20–$50/mo | $8–$15/site | Yes |
| **Appy Pie** | $15–$36/mo | Per plan | Yes |

---

## 2. RECOMMENDED PRICING STRATEGY FOR THE SCENE CO

### Your Competitive Advantages:
1. **Full-stack custom builds** (not templates) — Next.js, React, custom backends
2. **1 year FREE hosting** — saves clients ₹3K–₹12K/year
3. **1 year FREE domain** — saves clients ₹800–₹1,500/year
4. **Built-in CMS** — clients can manage content without technical knowledge
5. **POS integration** — one-stop shop for e-commerce businesses

### Recommended Packages:

#### 🟢 STARTER — ₹15,000–₹25,000 (one-time)
- 5-page responsive website
- Custom design (not template)
- Contact form + WhatsApp integration
- Basic SEO setup
- Mobile optimized
- 1 year FREE hosting (frontend)
- 1 year FREE domain (.com or .in)
- CMS: Edit text, images, contact info
- Delivery: 7–10 days

#### 🔵 BUSINESS — ₹40,000–₹75,000 (one-time)
- 10–15 page website
- Custom design + animations
- Blog/CMS with full content management
- Lead capture forms + CRM integration
- Advanced SEO + Google Analytics
- Social media integration
- 1 year FREE hosting (frontend)
- 1 year FREE domain
- CMS: Full content management, blog posts, media library
- Delivery: 15–20 days

#### 🟣 E-COMMERCE — ₹75,000–₹1,50,000 (one-time)
- Full online store with product catalog
- Payment gateway (Razorpay, Stripe, UPI)
- Inventory management dashboard
- Order tracking system
- Customer accounts + wishlists
- Email notifications
- 1 year FREE hosting
- 1 year FREE domain
- CMS: Products, orders, inventory, content
- Delivery: 25–35 days

#### 🟠 POS + WEBSITE — ₹1,00,000–₹2,50,000 (one-time)
- Custom POS web application
- Inventory management
- Billing + invoicing
- Multi-user access (cashier, manager, admin)
- Sales analytics dashboard
- Integrated website + store
- Payment processing
- 1 year FREE hosting
- 1 year FREE domain
- CMS: Full business management dashboard
- Delivery: 30–45 days

#### 🔴 ENTERPRISE / SAAS — ₹3,00,000+ (custom quote)
- Multi-tenant SaaS platform
- Custom backend + API
- User management + subscriptions
- Advanced analytics
- Third-party integrations
- Dedicated infrastructure
- Ongoing support contract
- Delivery: 60–90 days

### Recurring Revenue (After Year 1):

| Service | Monthly | Annual |
|---|---|---|
| Hosting (frontend) | ₹500–₹1,500/mo | ₹5,000–₹15,000/yr |
| Hosting + CMS | ₹1,000–₹2,500/mo | ₹10,000–₹25,000/yr |
| E-commerce hosting | ₹2,000–₹4,000/mo | ₹20,000–₹40,000/yr |
| POS hosting + support | ₹3,000–₹6,000/mo | ₹30,000–₹60,000/yr |
| Maintenance + updates | ₹2,000–₹5,000/mo | ₹20,000–₹50,000/yr |
| SEO + content | ₹5,000–₹15,000/mo | ₹50,000–₹1,50,000/yr |

---

## 3. CLOUDFLARE PAGES COMPATIBILITY — ZERO BUILD ERROR RULES

**This section is LOCKED. Every file created or modified MUST follow these rules. No exceptions.**

### 3.1 Current Issues Found (Must Fix Before Build)

| # | Issue | File | Severity | Fix |
|---|---|---|---|---|
| 1 | `ignoreBuildErrors: true` masks real TS errors | `next.config.ts` line 11 | **BLOCKER** | Remove this, fix all TS errors properly |
| 2 | `firebase` dependency — uses Node.js APIs not available on edge | `package.json` line 46 | **BLOCKER** | Remove entirely — not used anywhere in code |
| 3 | `genkit` + `@genkit-ai/*` — heavy Node.js deps, not edge-compatible | `package.json` lines 16-17, 48 | **BLOCKER** | Remove from deps + delete `src/ai/` folder |
| 4 | `genkit-cli` in devDeps — unnecessary build weight | `package.json` line 67 | **WARNING** | Remove if not using AI features |
| 5 | `apphosting.yaml` — Firebase config, irrelevant for Cloudflare | root file | **INFO** | Delete or ignore |
| 6 | `react-day-picker` v9 — used by shadcn calendar component | `package.json` line 53 | **KEEP** | Must keep — `src/components/ui/calendar.tsx` depends on it |
| 7 | Middleware has temporary bypass — no real auth | `src/middleware.ts` | **WARNING** | Implement proper session-based auth |
| 8 | `recharts` — uses DOM APIs, breaks SSR if not lazy-loaded | `package.json` line 56 | **WARNING** | Must use `dynamic(() => import(...), { ssr: false })` |
| 9 | `output: 'standalone'` in config — breaks next-on-pages build | `next.config.ts` | **BLOCKER** | Do NOT add — next-on-pages has its own output format |

### 3.2 Cloudflare Pages + next-on-pages Rules

#### Runtime Rules:
- **ALL page components** (`page.tsx`) MUST have `export const runtime = "edge";` — CMS content is dynamic, needs SSR on every request so updates are instant without rebuild
- **ALL API routes** must have `export const runtime = "edge";`
- **Layout components** (`layout.tsx`) MUST have `export const runtime = "edge";`
- **No Node.js builtins** — `fs`, `path`, `child_process`, `import crypto from 'crypto'` (Node module) are NOT available
- **Web Crypto IS available** — `globalThis.crypto` and `crypto.subtle` work fine (for bcrypt, hashing, etc.)
- **No `process.env` in API routes** — use `env` from `getRequestContext()` instead
- **No `new Request()` with body in edge** — use the request object passed to the handler

#### Why `runtime = "edge"` on pages:
This is a CMS-driven site. Content changes via the admin panel must appear instantly on the public site. With `runtime = "edge"`, every page request fetches fresh data from D1. Without it, pages would be statically generated at build time and content changes would require a full rebuild.

#### Dependency Rules:
- Every npm package must be edge-compatible (no Node.js-only APIs)
- If a package uses `fs`, `net`, `tls`, `http` — it will crash on Cloudflare
- Use `@cloudflare/next-on-pages` to verify compatibility during build
- **Remove unused dependencies** — they increase build size and can cause bundling errors

#### Image Rules:
- All external image domains must be in `next.config.ts` `images.remotePatterns`
- Cloudflare Pages doesn't support Next.js Image Optimization by default — images are proxied
- Add any new image hostnames to `remotePatterns`

#### Database Rules (D1):
- D1 queries must use `db.prepare().run()` or `db.prepare().all()` — no ORM that uses Node.js drivers
- Never use `better-sqlite3`, `sqlite3`, or any Node SQLite driver — D1 has its own API
- All DB access goes through `getBindings()` helper → `env.the_scene_co_db`

#### Storage Rules (R2):
- R2 access goes through `getBindings()` helper → `env.the_scene_co_media`
- Use `r2.put()`, `r2.get()`, `r2.delete()` — the R2 Workers API
- Never use AWS S3 SDK — use Cloudflare's native R2 API

#### Build Script:
```json
"pages:build": "npx @cloudflare/next-on-pages"
```
This is the ONLY build command for Cloudflare deployment. `next build` is for local testing only.

### 3.3 Clean Dependency List (What Stays, What Goes)

#### REMOVE (not edge-compatible / unused):
```
firebase                    → Not used in code, breaks edge
genkit                      → Node.js only, breaks edge
@genkit-ai/google-genai     → Node.js only, breaks edge
@genkit-ai/next             → Node.js only, breaks edge
genkit-cli                  → Dev tool, not needed
```

#### KEEP (edge-compatible):
```
next, react, react-dom      → Core framework
@cloudflare/next-on-pages   → Cloudflare adapter
@radix-ui/*                 → All edge-compatible (client components)
@hookform/resolvers         → Edge-compatible
class-variance-authority    → Edge-compatible
clsx, tailwind-merge        → Edge-compatible
framer-motion               → Client-side only, fine
lucide-react                → Edge-compatible
zod                         → Edge-compatible
react-hook-form             → Edge-compatible
embla-carousel-react        → Client-side only, fine
@vis.gl/react-google-maps   → Client-side only, fine
date-fns                    → Edge-compatible
dotenv                      → Dev only, fine
patch-package               → Dev only, fine
react-day-picker            → REQUIRED by shadcn calendar.tsx component
recharts                    → Must be dynamic import with ssr: false
```

### 3.4 next.config.ts — Cloudflare-Ready Config

```typescript
import type { NextConfig } from 'next';
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

if (process.env.NODE_ENV === 'development') {
  setupDevPlatform();
}

const nextConfig: NextConfig = {
  // NEVER use ignoreBuildErrors: true for Cloudflare deployment
  typescript: {
    ignoreBuildErrors: false,  // ← MUST be false
  },
  eslint: {
    ignoreDuringBuilds: true,  // OK to keep (lint !== build errors)
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      // Add client image domains here as needed
    ],
  },
  // DO NOT add output: 'standalone' — next-on-pages has its own output format
  // Adding it WILL break the Cloudflare build
};

export default nextConfig;
```

### 3.5 Pre-Build Checklist (Run Before Every Deploy)

- [ ] `npx next build` passes with ZERO errors (not just warnings)
- [ ] `npm run pages:build` passes with ZERO errors
- [ ] No `firebase`, `genkit` imports anywhere in `src/`
- [ ] ALL pages, layouts, and API routes have `export const runtime = "edge"`
- [ ] No `fs`, `path`, `child_process` imports in any file
- [ ] No `import crypto from 'crypto'` (Node module) — use `globalThis.crypto` instead
- [ ] `recharts` components wrapped in `dynamic(..., { ssr: false })`
- [ ] All external images listed in `remotePatterns`
- [ ] `getBindings()` used for all D1/R2 access (never direct env access)
- [ ] TypeScript strict mode passes (`npx tsc --noEmit`)
- [ ] `wrangler.toml` has correct D1 database ID and R2 bucket name
- [ ] Environment variables set in Cloudflare Pages dashboard
- [ ] All POST/PUT/DELETE API routes have auth checks
- [ ] Contact form endpoint has rate limiting
- [ ] CMS queries use caching (see Section 3.7)

### 3.6 wrangler.toml — Updated for New Schema

```toml
name = "the-scene-co"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "the_scene_co_db"
database_name = "the-scene-co-db"
database_id = "78963f57-36d8-4dd5-badf-78116887f292"

[[r2_buckets]]
binding = "the_scene_co_media"
bucket_name = "the-scene-co-media"

[vars]
ADMIN_PASSWORD_HASH = ""
```

**Note:** The `main` field is removed — `@cloudflare/next-on-pages` handles the output automatically. The `NODEJS_COMPAT` var is NOT needed — `nodejs_compat` is already set in `compatibility_flags`.

### 3.7 Caching Strategy for CMS Content

Since every page request hits D1, we need caching to avoid slow loads and D1 quota exhaustion.

**Approach: Cloudflare Cache API + Short TTL**

```typescript
// In page.tsx or data-fetching helper
async function getCachedData<T>(key: string, fetcher: () => Promise<T>, ttlSeconds = 60): Promise<T> {
  const cache = caches.default;
  const cacheKey = new Request(`https://cache/${key}`);

  // Try cache first
  const cached = await cache.match(cacheKey);
  if (cached) return cached.json() as Promise<T>;

  // Fetch fresh data
  const data = await fetcher();

  // Store in cache
  const response = new Response(JSON.stringify(data), {
    headers: { 'cache-control': `max-age=${ttlSeconds}, s-maxage=${ttlSeconds}` },
  });
  cache.put(cacheKey, response.clone());

  return data;
}
```

**Cache TTL by content type:**
| Content Type | TTL | Reason |
|---|---|---|
| Site settings | 300s (5 min) | Rarely changes |
| Pricing plans | 300s (5 min) | Rarely changes |
| Portfolio items | 120s (2 min) | Changes occasionally |
| Blog posts | 60s (1 min) | New posts added |
| Testimonials | 300s (5 min) | Rarely changes |
| FAQ entries | 300s (5 min) | Rarely changes |
| Pages content | 60s (1 min) | May change via CMS |

**Cache invalidation:** When admin updates content via CMS API, purge the relevant cache keys:
```typescript
// After admin updates content
async function invalidateCache(key: string) {
  const cache = caches.default;
  const cacheKey = new Request(`https://cache/${key}`);
  await cache.delete(cacheKey);
}
```

### 3.8 Rate Limiting for Contact Form

The `/api/leads` endpoint must be protected from spam.

**Approach: Simple IP-based rate limiting using D1**

```sql
CREATE TABLE rate_limits (
  ip TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  window_start TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (ip, endpoint)
);
```

**Limits:**
- Contact form: 5 submissions per IP per hour
- Login attempts: 10 attempts per IP per hour
- All other POST endpoints: 20 requests per IP per minute

**Implementation in API route:**
```typescript
async function checkRateLimit(db: D1Database, ip: string, endpoint: string, maxRequests: number, windowMinutes: number): Promise<boolean> {
  // Check current count
  const { results } = await db.prepare(
    `SELECT count FROM rate_limits WHERE ip = ? AND endpoint = ? AND window_start > datetime('now', ?)`
  ).bind(ip, endpoint, `-${windowMinutes} minutes`).all();

  if (results && results.length > 0 && (results[0] as any).count >= maxRequests) {
    return false; // Rate limited
  }

  // Increment or insert
  await db.prepare(
    `INSERT INTO rate_limits (ip, endpoint, count, window_start)
     VALUES (?, ?, 1, datetime('now'))
     ON CONFLICT(ip, endpoint) DO UPDATE SET count = count + 1`
  ).bind(ip, endpoint).run();

  return true;
}
```

---

## 4. WEBSITE REBUILD PLAN

### Current State:
- Event management website with pages: Home, About, Team, Past Events, Sustainability
- Admin panel for managing events
- Cloudflare D1 database (events table)
- Cloudflare R2 storage (media)
- Next.js 15 + React 19 + shadcn/ui

### Target State:
- SaaS / Website Builder Agency website
- CMS-powered (your own backend to manage all content)
- Portfolio of past work (repurpose event photos as portfolio)
- Pricing pages with packages
- Lead capture + contact forms
- Admin dashboard for managing website content
- POS showcase section

---

### PHASE 1: Foundation & Database Restructure (Week 1)

**Goal:** Restructure database and core types for the new business model.

**Tasks:**
1. **Update database schema** — Replace `events` table with new tables:
   - `pages` — Website pages managed via CMS
   - `portfolio_items` — Portfolio/work showcase
   - `testimonials` — Client testimonials
   - `pricing_plans` — Pricing packages
   - `leads` — Contact form submissions
   - `site_settings` — Global site config (hero text, contact info, etc.)
   - `blog_posts` — Blog content
   - `faqs` — FAQ entries
   - Keep `admin_config` for admin auth

2. **Update TypeScript types** — Create type definitions for all new entities

3. **Seed data** — Populate with starter content for the new business

**Files modified:**
- `schema.sql`
- `seed.sql`
- `src/lib/types.ts` (new)
- `src/lib/db.ts` (new)

---

### PHASE 2: Core Pages — Marketing Site (Week 1-2)

**Goal:** Build all public-facing pages for the agency website.

**Pages to create:**

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | Hero, services overview, portfolio preview, testimonials, CTA |
| Services | `/services` | Detailed service breakdown (websites, POS, SaaS) |
| Pricing | `/pricing` | Package comparison table, FAQ, CTA |
| Portfolio | `/portfolio` | Showcase past work (repurpose event photos) |
| Portfolio Detail | `/portfolio/[slug]` | Individual project case study |
| Portfolio Category | `/portfolio/[category]` | Filter by category (websites, POS, e-commerce) |
| About | `/about` | Company story, team, values |
| Blog | `/blog` | Content marketing |
| Blog Post | `/blog/[slug]` | Individual article |
| Contact | `/contact` | Lead capture form, map, contact info |
| Privacy Policy | `/privacy` | Legal compliance |
| Terms of Service | `/terms` | Legal compliance |
| 404 Not Found | `not-found.tsx` | Custom error page with navigation back |

**Files created:**
- `src/app/services/page.tsx`
- `src/app/pricing/page.tsx`
- `src/app/portfolio/page.tsx`
- `src/app/portfolio/[slug]/page.tsx`
- `src/app/portfolio/[category]/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/privacy/page.tsx`
- `src/app/terms/page.tsx`
- `src/app/not-found.tsx`
- `src/components/sections/services-grid.tsx`
- `src/components/sections/pricing-table.tsx`
- `src/components/sections/portfolio-grid.tsx`
- `src/components/sections/cta-banner.tsx`

---

### PHASE 3: CMS Admin Dashboard (Week 2-3)

**Goal:** Build the admin panel to manage all website content from one place.

**Admin features:**
- Login authentication (keep existing bcrypt + D1 approach)
- Dashboard overview (leads, page views, recent activity)
- **Pages Manager** — Create/edit/delete website pages
- **Portfolio Manager** — Add projects with images, descriptions, categories
- **Testimonials Manager** — Add/edit client reviews
- **Pricing Manager** — Update pricing plans and features
- **Blog Manager** — Write/edit/publish blog posts
- **FAQ Manager** — Manage FAQ entries
- **Leads Inbox** — View contact form submissions
- **Site Settings** — Update hero text, contact info, social links, SEO meta

**Files created:**
- `src/app/admin/dashboard/page.tsx`
- `src/app/admin/pages/page.tsx`
- `src/app/admin/portfolio/page.tsx`
- `src/app/admin/testimonials/page.tsx`
- `src/app/admin/pricing/page.tsx`
- `src/app/admin/blog/page.tsx`
- `src/app/admin/faqs/page.tsx`
- `src/app/admin/leads/page.tsx`
- `src/app/admin/settings/page.tsx`
- `src/app/admin/layout.tsx`

---

### PHASE 4: API Routes (Week 2-3)

**Goal:** Build API endpoints for CMS operations and public data.

**Auth Rule:** ALL POST, PUT, DELETE routes MUST check authentication before processing. Use the existing `isAuthenticated()` helper from `cf-bindings.ts` (to be replaced with proper session-based auth).

**API endpoints:**

| Method | Route | Purpose | Auth Required |
|---|---|---|---|
| GET | `/api/pages` | List all pages | No |
| GET | `/api/pages/[slug]` | Get single page | No |
| POST | `/api/pages` | Create page | **Yes** |
| PUT | `/api/pages/[id]` | Update page | **Yes** |
| DELETE | `/api/pages/[id]` | Delete page | **Yes** |
| GET | `/api/portfolio` | List portfolio items | No |
| GET | `/api/portfolio/[slug]` | Get single item | No |
| POST | `/api/portfolio` | Create item | **Yes** |
| PUT | `/api/portfolio/[id]` | Update item | **Yes** |
| DELETE | `/api/portfolio/[id]` | Delete item | **Yes** |
| GET | `/api/testimonials` | List testimonials | No |
| POST | `/api/testimonials` | Create testimonial | **Yes** |
| GET | `/api/pricing` | Get pricing plans | No |
| PUT | `/api/pricing/[id]` | Update plan | **Yes** |
| GET | `/api/blog` | List blog posts | No |
| GET | `/api/blog/[slug]` | Get single post | No |
| POST | `/api/blog` | Create post | **Yes** |
| PUT | `/api/blog/[id]` | Update post | **Yes** |
| DELETE | `/api/blog/[id]` | Delete post | **Yes** |
| GET | `/api/faqs` | List FAQs | No |
| POST | `/api/faqs` | Create FAQ | **Yes** |
| POST | `/api/leads` | Submit contact form | No (rate limited) |
| GET | `/api/leads` | List leads | **Yes** |
| GET | `/api/settings` | Get site settings | No |
| PUT | `/api/settings` | Update settings | **Yes** |
| POST | `/api/admin/login` | Admin authentication | No |
| POST | `/api/admin/logout` | Admin logout | **Yes** |

**Auth pattern for protected routes:**
```typescript
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) return unauthorizedResponse();
  // ... handle request
}
```

**Keep existing:**
- `src/app/api/upload/route.ts` — File upload to R2 (keep auth check)
- `src/app/api/media/[...key]/route.ts` — Media proxy (keep public access)

---

### PHASE 5: UI Components & Polish (Week 3-4)

**Goal:** Build reusable components, animations, and responsive design.

**Components:**
- Navigation header with mobile menu
- Footer with links, social, contact
- Hero section with animated text
- Service cards grid
- Pricing comparison table
- Portfolio card grid with filter
- Testimonial carousel
- FAQ accordion
- Contact form with validation
- CTA banners
- Blog card grid
- Admin sidebar navigation
- Admin data tables
- Admin form components
- Admin image uploader

**Design system:**
- Color palette (professional, modern)
- Typography scale
- Spacing system
- Component variants

---

### PHASE 6: SEO, Performance & Launch (Week 4)

**Goal:** Optimize for search engines, performance, and deploy.

**Tasks:**
- Dynamic sitemap generation
- robots.txt update
- Open Graph meta tags
- Structured data (JSON-LD) for business
- Image optimization
- Performance audit (Lighthouse)
- Analytics integration
- Deploy to Cloudflare Pages
- Test all flows end-to-end

---

## 5. CMS ARCHITECTURE

### How the CMS Works:

```
┌─────────────────────────────────────────────────┐
│                  ADMIN DASHBOARD                 │
│  (Next.js App Router - Protected Routes)         │
│                                                   │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Pages   │ │Portfolio │ │  Blog    │  ...      │
│  │ Manager │ │ Manager  │ │ Manager  │          │
│  └────┬────┘ └────┬─────┘ └────┬─────┘          │
│       │           │            │                 │
│       └───────────┼────────────┘                 │
│                   │                              │
│            ┌──────▼──────┐                       │
│            │  API Routes  │                       │
│            │  (CRUD ops)  │                       │
│            └──────┬──────┘                       │
└───────────────────┼──────────────────────────────┘
                    │
             ┌──────▼──────┐
             │  D1 Database │
             │  (SQLite)    │
             └──────┬──────┘
                    │
             ┌──────▼──────┐
             │  R2 Storage  │
             │  (Images)    │
             └─────────────┘

┌─────────────────────────────────────────────────┐
│              PUBLIC WEBSITE                      │
│  (Next.js App Router - Server Components)        │
│                                                   │
│  Fetches content from D1 via server-side         │
│  API calls. No client-side JS for data fetch.    │
│  Fully SSR/SSG for SEO.                          │
└─────────────────────────────────────────────────┘
```

### Content Flow:
1. Admin logs in → accesses dashboard
2. Admin creates/edits content → saved to D1 database
3. Admin uploads images → stored in R2, URL saved to D1
4. Public pages fetch content from D1 at request time (SSR)
5. Content updates are instant — no rebuild needed

---

## 6. TECH STACK (UNCHANGED — ALREADY SOLID)

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 15 App Router | SSR, SEO, API routes |
| UI | React 19 + shadcn/ui | Fast, accessible, beautiful |
| Styling | Tailwind CSS 3 | Utility-first, responsive |
| Animations | Framer Motion | Smooth, professional |
| Validation | Zod + React Hook Form | Type-safe forms |
| Database | Cloudflare D1 (SQLite) | Edge-compatible, free tier |
| Storage | Cloudflare R2 | S3-compatible, free egress |
| Deploy | Cloudflare Pages | Edge network, free tier |
| Auth | bcrypt + sessions + cookies | Simple, secure admin auth (Web Crypto API) |
| Icons | Lucide React | Clean, consistent |
| Maps | @vis.gl/react-google-maps | Google Maps integration |
| Charts | Recharts (dynamic import) | Analytics dashboards |

---

## 7. MIGRATION STRATEGY

### What to KEEP from current site:
- ✅ Cloudflare D1 database infrastructure
- ✅ Cloudflare R2 storage setup
- ✅ `getBindings()` helper (`src/lib/cf-bindings.ts`)
- ✅ Upload API route pattern (will be updated)
- ✅ shadcn/ui component library
- ✅ Tailwind config + global styles
- ✅ TypeScript setup with `@/*` path alias
- ✅ SEO setup (sitemap, robots)
- ✅ `@cloudflare/next-on-pages` adapter

### What to REPLACE:
- ❌ `firebase` dependency → Remove (not used, breaks edge)
- ❌ `genkit` + `@genkit-ai/*` → Remove (not edge-compatible)
- ❌ `src/ai/` folder → Delete (Genkit not usable on Cloudflare)
- ❌ `ignoreBuildErrors: true` → Set to `false`
- ❌ Events table → New CMS tables (see migration plan below)
- ❌ Event pages → Portfolio pages
- ❌ Sustainability page → Services/About content
- ❌ Event-focused hero → Agency-focused hero
- ❌ Past events list → Portfolio showcase
- ❌ `apphosting.yaml` → Delete (Firebase config, irrelevant)
- ❌ `wrangler.toml` `main` field → Remove (next-on-pages handles it)
- ❌ Temporary middleware bypass → Proper session auth

### Data Migration Plan (Existing Events):

**Decision:** Archive existing events as portfolio items, don't delete.

```sql
-- Step 1: Create new portfolio_items table
-- Step 2: Migrate events to portfolio
INSERT INTO portfolio_items (title, category, description, image_url, slug, created_at)
SELECT
  title,
  category,
  description,
  image_url,
  LOWER(REPLACE(title, ' ', '-')) as slug,
  created_at
FROM events;

-- Step 3: Verify migration
SELECT COUNT(*) FROM portfolio_items;  -- Should match events count

-- Step 4: Drop old events table (only after verification)
DROP TABLE events;
```

**Files for migration:**
- `migrate.sql` — Migration script (run manually on D1)
- `src/lib/migrate.ts` — Optional Node.js migration helper (run locally, not deployed)

### What to ADD:
- ➕ Pricing pages + components
- ➕ Services page + components
- ➕ Blog system
- ➕ CMS admin dashboard
- ➕ Lead capture system
- ➕ Portfolio system
- ➕ Testimonials system
- ➕ FAQ system
- ➕ Site settings management

---

## 8. TIMELINE SUMMARY

| Phase | Duration | Deliverable |
|---|---|---|
| 1. Foundation | 3-5 days | New DB schema, types, seed data |
| 2. Marketing Pages | 5-7 days | All public pages live |
| 3. CMS Dashboard | 7-10 days | Full admin panel |
| 4. API Routes | 5-7 days | All CRUD endpoints |
| 5. UI Polish | 5-7 days | Animations, responsive, components |
| 6. Launch | 3-5 days | SEO, deploy, test |

**Total: 4-6 weeks**

---

## 9. REVENUE PROJECTION

### Conservative (5 clients/month):
| Package | Clients | Revenue |
|---|---|---|
| Starter (₹20K) | 2 | ₹40,000 |
| Business (₹55K) | 2 | ₹1,10,000 |
| E-commerce (₹1L) | 1 | ₹1,00,000 |
| **Monthly** | **5** | **₹2,50,000** |

### With recurring revenue (after 6 months):
| Service | Clients | Monthly MRR |
|---|---|---|
| Hosting (₹1K/mo) | 30 | ₹30,000 |
| CMS hosting (₹2K/mo) | 15 | ₹30,000 |
| E-commerce (₹3K/mo) | 5 | ₹15,000 |
| Maintenance (₹3K/mo) | 10 | ₹30,000 |
| **Monthly MRR** | | **₹1,05,000** |

### Total monthly at 6 months: ₹2,50,000 (new) + ₹1,05,000 (recurring) = **₹3,55,000/month**

### Cost Breakdown (Your Expenses):

| Expense | Monthly Cost | Notes |
|---|---|---|
| Cloudflare Pages | ₹0 (free tier) | Up to 500 builds/month, unlimited requests |
| Cloudflare D1 | ₹0 (free tier) | 5GB storage, 100K reads/day, 100K writes/day |
| Cloudflare R2 | ₹0 (free tier) | 10GB storage, 1M reads/month, 1M writes/month |
| Domain (.com) | ₹800–₹1,200/yr | Only for YOUR domain (client domains are their cost) |
| Custom domain for clients | ₹800–₹1,500/yr | Per client, after free year ends |
| **Total monthly cost** | **~₹0–₹100** | Cloudflare free tier covers almost everything |

**Profit margin:** ~95%+ on project revenue (your main cost is time, not infrastructure)

### Payment Terms:

| Milestone | Percentage | When |
|---|---|---|
| Upfront deposit | 40% | Before work begins |
| Design approval | 30% | After client approves mockups |
| Final delivery | 30% | On launch/go-live |

**Why this structure:**
- 40% upfront covers your time investment and commits the client
- 30% at design approval ensures they're engaged in the process
- 30% on delivery ensures you get paid for the full project
- For projects over ₹1L, add a 4th milestone (50% development complete)

**Late payment policy:**
- 7-day grace period after invoice due date
- 2% late fee after grace period
- Hosting suspension after 30 days overdue

---

## 10. NEXT STEPS

1. **Approve this plan** — Review pricing, packages, timeline
2. **Adjust pricing** — Modify based on your market and costs
3. **Fix Cloudflare compatibility first** — Remove bad deps, fix config (Section 3)
4. **Start Phase 1** — Database schema + types + migration
5. **Gather content** — Prepare your company info, portfolio images, testimonials
6. **Set up custom domain** — Point your new domain to Cloudflare Pages

### Deploy Commands:
```bash
# Local test build (must pass with ZERO errors)
npx next build

# Cloudflare Pages build (the REAL deploy command)
npm run pages:build

# Deploy to Cloudflare Pages (output is in .vercel/output, NOT .vercel/output/static)
npx wrangler pages deploy .vercel/output --project-name=the-scene-co
```

### Timeline Clarification (Phase Overlap):

Phases 3 (CMS Dashboard) and 4 (API Routes) overlap in Week 2-3. Here's the correct execution order:

**Week 1:** Phase 1 (Foundation) — MUST complete first
**Week 2:** Phase 4 (API Routes) — Build APIs BEFORE dashboard (dashboard needs APIs)
**Week 2-3:** Phase 2 (Marketing Pages) — Can run parallel with Phase 4
**Week 3:** Phase 3 (CMS Dashboard) — Depends on Phase 4 APIs being ready
**Week 3-4:** Phase 5 (UI Polish) — Depends on Phase 2 pages being built
**Week 4:** Phase 6 (Launch) — Everything must be complete

**Dependency chain:**
```
Phase 1 (DB + Types)
  ├── Phase 4 (API Routes) ──→ Phase 3 (CMS Dashboard)
  └── Phase 2 (Marketing Pages) ──→ Phase 5 (UI Polish)
                                        └── Phase 6 (Launch)
```

If working solo: Do Phase 1 → Phase 4 → Phase 2 → Phase 3 → Phase 5 → Phase 6 sequentially.
If working with a team: Phase 2 and Phase 4 can run in parallel after Phase 1.

Ready to start building? Tell me which phase to begin with, or if you want to adjust anything in this plan first.
