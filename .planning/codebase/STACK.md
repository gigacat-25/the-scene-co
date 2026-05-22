# Technology Stack

**Analysis Date:** 2026-05-22

## Languages

**Primary:**
- TypeScript 5 - All application code (`src/**/*.ts`, `src/**/*.tsx`)
- SQL (SQLite/D1) - Database schema in `schema.sql`, seed data in `seed.sql`

**Secondary:**
- JavaScript (ES modules) - PostCSS config (`postcss.config.mjs`)

## Runtime

**Environment:**
- Node.js 20 - Dev environment (`.idx/dev.nix`)
- Cloudflare Workers runtime - Production via `@cloudflare/next-on-pages`

**Package Manager:**
- npm - Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 15.5.2 - Full-stack React framework with App Router
- React 19.2.1 - UI library (`react`, `react-dom`)

**Styling:**
- Tailwind CSS 3.4.1 - Utility-first CSS (`tailwind.config.ts`)
- tailwindcss-animate 1.0.7 - Animation utilities (`tailwind.config.ts`)
- PostCSS 8 - CSS processing (`postcss.config.mjs`)

**UI Components:**
- shadcn/ui - Component library (config: `components.json`)
- Radix UI primitives - 20+ accessible components (e.g., `@radix-ui/react-dialog`, `@radix-ui/react-select`)
- class-variance-authority 0.7.1 - Component variants
- clsx 2.1.1 + tailwind-merge 3.0.1 - Class merging utility (`src/lib/utils.ts`)
- Lucide React 0.475.0 - Icon library

**Animation:**
- Framer Motion 11.3.12 - Motion/animation library

**AI:**
- Genkit 1.20.0 - AI framework (`genkit`, `@genkit-ai/google-genai`, `@genkit-ai/next`)
- Google Gemini 2.5 Flash - AI model (`src/ai/genkit.ts`)

**Forms & Validation:**
- Zod 3.24.2 - Schema validation (`src/components/contact-form.tsx`)
- React Hook Form 7.54.2 - Form management
- @hookform/resolvers 4.1.3 - Zod resolver for RHF

**Data Visualization:**
- Recharts 2.15.1 - Chart components (`src/components/ui/chart.tsx`)

**Maps:**
- @vis.gl/react-google-maps 1.1.0 - Google Maps React wrapper
- @types/google.maps 3.55.11 - Type definitions

**Date Handling:**
- date-fns 3.6.0 - Date utilities
- react-day-picker 9.11.3 - Calendar component

**Carousel:**
- Embla Carousel 8.6.0 - Carousel library (`src/components/ui/carousel.tsx`)

**Dev/Build:**
- @cloudflare/next-on-pages 1.13.16 - Cloudflare Pages adapter
- genkit-cli 1.20.0 - Genkit CLI tools
- patch-package 8.0.0 - Package patching
- dotenv 16.5.0 - Environment variable loading

**Infrastructure:**
- Firebase 11.9.1 - Installed but **not used in source code** (likely a Project IDX / Firebase Studio artifact)
- Firebase App Hosting - Configured via `apphosting.yaml` (maxInstances: 1)

## Key Dependencies

**Critical:**
- `next` 15.5.2 - Core framework
- `@cloudflare/next-on-pages` - Deployment adapter to Cloudflare Workers
- `genkit` - AI flow orchestration
- `zod` - Runtime type validation

**Infrastructure:**
- `wrangler` (via `@cloudflare/next-on-pages`) - Cloudflare CLI
- Cloudflare D1 - SQLite database (binding: `the_scene_co_db`)
- Cloudflare R2 - Object storage (binding: `the_scene_co_media`)

## Configuration

**Environment:**
- `.env.local` - Local environment variables (gitignored)
- `wrangler.toml` - Cloudflare bindings config (D1, R2, vars)
- `apphosting.yaml` - Firebase App Hosting config
- `ADMIN_PASSWORD_HASH` - Admin auth hash (in `wrangler.toml` vars, empty by default)

**Build:**
- `next.config.ts` - Next.js config with `@cloudflare/next-on-pages` dev platform setup, image remote patterns
- `tsconfig.json` - TypeScript config with `@/*` path alias, ES2017 target, bundler module resolution
- `tailwind.config.ts` - Tailwind config with custom fonts (Montserrat, Playfair Display), CSS variables, animations
- `components.json` - shadcn/ui config with default style, RSC enabled, CSS variables

**TypeScript:**
- Strict mode enabled
- Path alias: `@/*` → `./src/*`
- JSX: preserve (Next.js handles transformation)
- Build errors ignored during builds (`ignoreBuildErrors: true`)

## Platform Requirements

**Development:**
- Node.js 20+
- npm
- `npm run dev` - Starts Next.js dev server on port 9002 with Turbopack
- `npm run genkit:dev` - Starts Genkit AI dev server

**Production:**
- Cloudflare Pages deployment
- `npm run pages:build` - Builds for Cloudflare Pages via `@cloudflare/next-on-pages`
- D1 database provisioned (ID: `78963f57-36d8-4dd5-badf-78116887f292`)
- R2 bucket provisioned (`the-scene-co-media`)
- Edge runtime for all API routes and pages

## Image Sources

**Allowed remote patterns** (configured in `next.config.ts`):
- `placehold.co` - Placeholder images
- `images.unsplash.com` - Unsplash stock photos
- `picsum.photos` - Lorem Picsum placeholders

**Local images:**
- `src/img/scene-hero-image.avif` - Hero image

**Placeholder system:**
- `src/lib/placeholder-images.json` - JSON image catalog
- `src/lib/placeholder-images.ts` - TypeScript wrapper for placeholder images

---

*Stack analysis: 2026-05-22*
