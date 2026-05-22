# Codebase Structure

**Analysis Date:** 2026-05-22

## Directory Layout

```
the-scene-co-1/
├── .env.local                    # Environment variables (gitignored)
├── .gitignore                    # Git ignore rules
├── apphosting.yaml               # Firebase App Hosting config
├── components.json               # shadcn/ui configuration
├── next.config.ts                # Next.js configuration
├── next-env.d.ts                 # Next.js TypeScript declarations
├── package.json                  # Dependencies and scripts
├── package-lock.json             # npm lockfile
├── postcss.config.mjs            # PostCSS configuration
├── schema.sql                    # D1 database schema + seed data
├── seed.sql                      # Additional seed data (if any)
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── wrangler.toml                 # Cloudflare Wrangler config (D1, R2 bindings)
├── docs/
│   └── blueprint.md              # Project blueprint documentation
├── public/
│   └── logo.jpeg                 # Company logo (referenced in Navbar, Footer, Admin)
├── src/
│   ├── middleware.ts             # Next.js middleware (admin route guard - currently bypassed)
│   ├── ai/
│   │   ├── dev.ts                # Genkit dev entry (empty, for side-effect imports)
│   │   └── genkit.ts             # Genkit AI config (Gemini 2.5 Flash via Google AI)
│   ├── app/
│   │   ├── layout.tsx            # Root layout (fonts, Navbar, Footer, Toaster)
│   │   ├── page.tsx              # Homepage (Hero → Packages → Sustainability → Leadership → Testimonials → FAQ → Contact → MapSection)
│   │   ├── globals.css           # Global styles (CSS variables, Tailwind layers, custom animations)
│   │   ├── favicon.ico           # Browser favicon
│   │   ├── robots.ts             # Dynamic robots.txt generation
│   │   ├── sitemap.ts            # Dynamic sitemap.xml generation
│   │   ├── about/
│   │   │   └── page.tsx          # About Us page (static content)
│   │   ├── admin/
│   │   │   └── page.tsx          # Admin dashboard (client component - events, team, services CRUD)
│   │   ├── past-events/
│   │   │   ├── page.tsx          # Past events listing (client component, fetches /api/events)
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Event detail page (client component, hero + gallery)
│   │   ├── sustainability/
│   │   │   └── page.tsx          # Sustainability page (static content)
│   │   ├── team/
│   │   │   └── page.tsx          # Team page (renders Leadership section)
│   │   └── api/
│   │       ├── admin/
│   │       │   └── login/
│   │       │       └── route.ts  # Admin login/logout (POST/DELETE, SHA-256 hash auth)
│   │       ├── contact/
│   │       │   └── route.ts      # Contact form submission (stub - logs to console)
│   │       ├── events/
│   │       │   ├── route.ts      # Events list/create (GET/POST)
│   │       │   └── [id]/
│   │       │       └── route.ts  # Single event CRUD (GET/PUT/DELETE/PATCH for likes)
│   │       ├── media/
│   │       │   └── [...key]/
│   │       │       └── route.ts  # R2 file serving proxy (GET, cached responses)
│   │       ├── services/
│   │       │   ├── route.ts      # Services list/create (GET/POST)
│   │       │   └── [id]/
│   │       │       └── route.ts  # Single service CRUD (GET/PUT/DELETE)
│   │       ├── team/
│   │       │   ├── route.ts      # Team list/create (GET/POST)
│   │       │   └── [id]/
│   │       │       └── route.ts  # Single team member CRUD (GET/PUT/DELETE)
│   │       └── upload/
│   │           └── route.ts      # File upload to R2 (POST, multipart/form-data)
│   ├── components/
│   │   ├── animate-on-scroll.tsx # Scroll-triggered animation wrapper (IntersectionObserver)
│   │   ├── contact-form.tsx      # Contact form with Zod validation + react-hook-form
│   │   ├── magnetic-particles.tsx # Interactive canvas particle background (framer-motion)
│   │   ├── map.tsx               # Google Maps iframe embed
│   │   ├── layout/
│   │   │   ├── navbar.tsx        # Sticky header with desktop nav + mobile sheet menu
│   │   │   └── footer.tsx        # Site footer with nav links, social icons, contact info
│   │   ├── sections/
│   │   │   ├── contact.tsx       # Contact section (form + info layout)
│   │   │   ├── faq.tsx           # FAQ accordion (static data)
│   │   │   ├── hero.tsx          # Hero section with MagneticParticles background
│   │   │   ├── leadership.tsx    # Team grid (fetches /api/team)
│   │   │   ├── map-section.tsx   # Map section wrapper with animation
│   │   │   ├── packages.tsx      # Service packages grid (fetches /api/services)
│   │   │   ├── sustainability.tsx # Sustainability commitments (static data)
│   │   │   └── testimonials.tsx  # Testimonials carousel (static data)
│   │   └── ui/
│   │       ├── accordion.tsx     # shadcn Accordion
│   │       ├── alert.tsx         # shadcn Alert
│   │       ├── alert-dialog.tsx  # shadcn AlertDialog
│   │       ├── avatar.tsx        # shadcn Avatar
│   │       ├── badge.tsx         # shadcn Badge
│   │       ├── button.tsx        # shadcn Button (cva variants)
│   │       ├── calendar.tsx      # shadcn Calendar
│   │       ├── card.tsx          # shadcn Card
│   │       ├── carousel.tsx      # shadcn Carousel (embla)
│   │       ├── chart.tsx         # shadcn Chart (recharts)
│   │       ├── checkbox.tsx      # shadcn Checkbox
│   │       ├── collapsible.tsx   # shadcn Collapsible
│   │       ├── dialog.tsx        # shadcn Dialog
│   │       ├── dropdown-menu.tsx # shadcn DropdownMenu
│   │       ├── form.tsx          # shadcn Form (react-hook-form wrapper)
│   │       ├── input.tsx         # shadcn Input
│   │       ├── label.tsx         # shadcn Label
│   │       ├── like-button.tsx   # Custom LikeButton (optimistic UI + PATCH)
│   │       ├── menubar.tsx       # shadcn Menubar
│   │       ├── popover.tsx       # shadcn Popover
│   │       ├── progress.tsx      # shadcn Progress
│   │       ├── radio-group.tsx   # shadcn RadioGroup
│   │       ├── scroll-area.tsx   # shadcn ScrollArea
│   │       ├── select.tsx        # shadcn Select
│   │       ├── separator.tsx     # shadcn Separator
│   │       ├── sheet.tsx         # shadcn Sheet (mobile menu)
│   │       ├── sidebar.tsx       # shadcn Sidebar
│   │       ├── skeleton.tsx      # shadcn Skeleton
│   │       ├── slider.tsx        # shadcn Slider
│   │       ├── switch.tsx        # shadcn Switch
│   │       ├── table.tsx         # shadcn Table
│   │       ├── tabs.tsx          # shadcn Tabs
│   │       ├── textarea.tsx      # shadcn Textarea
│   │       ├── toast.tsx         # shadcn Toast
│   │       ├── toaster.tsx       # shadcn Toaster (renders toast queue)
│   │       └── tooltip.tsx       # shadcn Tooltip
│   ├── hooks/
│   │   ├── use-mobile.tsx        # Responsive breakpoint hook (768px)
│   │   └── use-toast.ts          # Toast state management (reducer-based)
│   ├── img/
│   │   └── scene-hero-image.avif # Static hero image (referenced in placeholder config)
│   └── lib/
│       ├── cf-bindings.ts        # Cloudflare D1/R2 bindings helper + auth helpers
│       ├── placeholder-images.ts # Type + export for placeholder image data
│       ├── placeholder-images.json # Placeholder image URLs and descriptions
│       └── utils.ts              # `cn()` utility (clsx + tailwind-merge)
```

## Directory Purposes

**`src/app/` - Next.js App Router:**
- Purpose: File-based routing, page layouts, SEO metadata
- Contains: One `page.tsx` per route, `layout.tsx` for shared UI, dynamic route segments (`[id]`, `[...key]`)
- Key files: `src/app/layout.tsx` (root shell), `src/app/page.tsx` (homepage composition)

**`src/app/api/` - API Route Handlers:**
- Purpose: RESTful endpoints for data operations
- Contains: `route.ts` files with named exports (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`)
- Pattern: Each resource has a collection route (`/api/events`) and item route (`/api/events/[id]`)

**`src/components/ui/` - shadcn/ui Component Library:**
- Purpose: Accessible, unstyled UI primitives built on Radix UI
- Contains: 34 components (33 shadcn + 1 custom `like-button.tsx`)
- Pattern: Each component is a self-contained file with exports; uses `cn()` for class merging
- Configured via: `components.json` with `@/components/ui` alias

**`src/components/sections/` - Page Section Components:**
- Purpose: Large-scale page sections (hero, packages, testimonials, etc.)
- Contains: 8 section components, each representing a visual block on a page
- Pattern: Most use `AnimateOnScroll` wrapper; some fetch data from API, others are static

**`src/components/layout/` - Layout Components:**
- Purpose: Persistent site chrome (navbar, footer)
- Contains: `navbar.tsx` (sticky header with mobile sheet), `footer.tsx` (multi-column footer)

**`src/lib/` - Utility Libraries:**
- Purpose: Shared helpers and configuration
- Contains: Cloudflare bindings, class merging utility, placeholder image data
- Key file: `src/lib/cf-bindings.ts` (the bridge to Cloudflare D1/R2)

**`src/hooks/` - Custom React Hooks:**
- Purpose: Reusable React logic
- Contains: `use-mobile.tsx` (responsive detection), `use-toast.ts` (toast state management)

**`src/ai/` - Genkit AI Configuration:**
- Purpose: AI/LLM integration setup
- Contains: `genkit.ts` (Gemini 2.5 Flash config), `dev.ts` (empty dev entry)
- Status: Configured but not actively used in the application yet

**`src/img/` - Static Images:**
- Purpose: Source images referenced in code
- Contains: `scene-hero-image.avif`

**`public/` - Public Static Assets:**
- Purpose: Files served directly at the root URL
- Contains: `logo.jpeg` (company logo, used in Navbar, Footer, Admin)

**`docs/` - Documentation:**
- Purpose: Project documentation
- Contains: `blueprint.md`

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout with fonts, Navbar, Footer, Toaster
- `src/app/page.tsx`: Homepage composing all sections
- `src/middleware.ts`: Request middleware for admin routes

**Configuration:**
- `next.config.ts`: Next.js config (edge runtime setup, image remote patterns)
- `tailwind.config.ts`: Tailwind config (custom fonts, colors, animations)
- `tsconfig.json`: TypeScript config (strict mode, `@/*` path alias)
- `wrangler.toml`: Cloudflare config (D1 database, R2 bucket, env vars)
- `components.json`: shadcn/ui configuration
- `schema.sql`: D1 database schema (events, admin_config tables)

**Core Logic:**
- `src/lib/cf-bindings.ts`: Cloudflare bindings access + auth helpers
- `src/lib/utils.ts`: `cn()` class merging utility
- `src/app/api/events/route.ts`: Events CRUD API
- `src/app/api/upload/route.ts`: R2 file upload API

**Testing:**
- No test files detected. No testing framework configured.

## Naming Conventions

**Files:**
- Pages: `page.tsx` (Next.js convention)
- API routes: `route.ts` (Next.js convention)
- Components: kebab-case (`animate-on-scroll.tsx`, `contact-form.tsx`)
- UI components: kebab-case matching shadcn naming (`button.tsx`, `card.tsx`)
- Hooks: `use-*.tsx` prefix (`use-mobile.tsx`, `use-toast.ts`)
- Utilities: kebab-case (`cf-bindings.ts`, `placeholder-images.ts`)

**Directories:**
- kebab-case throughout (`past-events`, `map-section`, `contact-form`)
- Dynamic route segments: bracket notation (`[id]`, `[...key]`)

**Functions/Variables:**
- camelCase for functions and variables
- PascalCase for React components and TypeScript interfaces
- TypeScript interfaces defined inline or at top of file (e.g., `interface Event`, `interface TeamMember`)

## Where to Add New Code

**New Page:**
- Create directory: `src/app/[page-name]/page.tsx`
- Add metadata export for SEO
- Use `export const runtime = "edge"` for Cloudflare compatibility
- Example: `src/app/gallery/page.tsx`

**New API Endpoint:**
- Create: `src/app/api/[resource]/route.ts` (collection) or `src/app/api/[resource]/[id]/route.ts` (item)
- Export named HTTP method handlers: `export async function GET()`, `export async function POST()`
- Use `getBindings()` from `@/lib/cf-bindings` for D1/R2 access
- Add `export const runtime = "edge"`

**New Section Component:**
- Create: `src/components/sections/[section-name].tsx`
- Wrap content with `AnimateOnScroll` for scroll animations
- Import in page: `import { SectionName } from "@/components/sections/[section-name]"`

**New UI Component:**
- Use shadcn CLI: `npx shadcn@latest add [component]`
- Or create manually in `src/components/ui/[component].tsx`
- Use `cn()` from `@/lib/utils` for class merging
- Use `cva` for variant-based styling (see `button.tsx` pattern)

**New Custom Hook:**
- Create: `src/hooks/use-[name].tsx`
- Export: `export function use[Name]() { ... }`

**New Database Table:**
- Add to `schema.sql`
- Run migration via Wrangler: `npx wrangler d1 execute the-scene-co-db --local --file=schema.sql`
- Update `src/lib/cf-bindings.ts` if new binding needed

**New R2 Upload:**
- Reuse existing `POST /api/upload` endpoint
- Files stored under `events/` prefix; customize key pattern in `src/app/api/upload/route.ts`
- Serve via `GET /api/media/[...key]`

## Special Directories

**`.next/` - Next.js Build Output:**
- Purpose: Generated build artifacts
- Generated: Yes (by `next build` or `next dev`)
- Committed: No (gitignored)

**`.wrangler/` - Wrangler Local State:**
- Purpose: Local Cloudflare dev state (D1 local DB files)
- Generated: Yes (by `wrangler dev`)
- Committed: No

**`node_modules/` - Dependencies:**
- Purpose: npm packages
- Generated: Yes (by `npm install`)
- Committed: No

**`.genkit/` - Genkit Generated Files:**
- Purpose: Genkit AI flow definitions
- Generated: Yes (by `genkit start`)
- Committed: No (gitignored)

---

*Structure analysis: 2026-05-22*
