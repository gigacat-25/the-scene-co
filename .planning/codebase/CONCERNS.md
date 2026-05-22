# Codebase Concerns

**Analysis Date:** 2026-05-22

## Security

### CRITICAL: Admin Authentication Completely Disabled

- **Files:** `src/middleware.ts`, `src/lib/cf-bindings.ts`
- **Issue:** `isAuthenticated()` in `src/lib/cf-bindings.ts` always returns `true` (line 28). The middleware in `src/middleware.ts` has a comment "Temporary bypass: No login required until Clerk is implemented" and returns `NextResponse.next()` unconditionally.
- **Impact:** Anyone can access `/admin` and perform all CRUD operations (create, update, delete events, team members, services) and upload files to R2 storage. The admin dashboard at `src/app/admin/page.tsx` is fully exposed.
- **Fix approach:** Implement proper session-based auth (Clerk as planned) or at minimum restore the password-hash comparison that exists in `src/app/api/admin/login/route.ts` but is never enforced.

### CRITICAL: Hardcoded Default Password in Schema

- **Files:** `schema.sql` (lines 24-30)
- **Issue:** The schema contains a bcrypt hash of the plaintext password `sceneco_admin` with a comment "change after first login!". The hash is committed to the repository.
- **Impact:** Anyone with repo access knows the default admin password. If the schema is run in production without changing the password, the admin panel is compromised.
- **Fix approach:** Remove the seed password from `schema.sql`. Generate the hash at deployment time from an environment variable. Document the first-login password setup process.

### HIGH: Admin Login Uses SHA-256, Not Bcrypt

- **Files:** `src/app/api/admin/login/route.ts` (lines 15-19)
- **Issue:** The login route hashes the submitted password with SHA-256 (Web Crypto), but the schema seeds a bcrypt hash (`$2a$10$...`). These are incompatible hashing algorithms. The hardcoded fallback hash on line 34 is also a SHA-256 hex string, not bcrypt.
- **Impact:** Even if auth were enabled, the login would never work with the seeded password because SHA-256 !== bcrypt. The system is internally inconsistent.
- **Fix approach:** Use a single hashing algorithm. If using SHA-256 for Edge compatibility, seed the schema with a SHA-256 hash. If using bcrypt, use a bcrypt library compatible with Edge runtime.

### HIGH: No Rate Limiting on Any API Route

- **Files:** All API routes under `src/app/api/`
- **Issue:** No rate limiting is implemented on any endpoint. The login endpoint (`/api/admin/login`), contact form (`/api/contact`), and like endpoint (`PATCH /api/events/[id]`) are all vulnerable to brute-force and abuse.
- **Impact:** Attackers can brute-force the admin password, spam the contact form, or manipulate like counts programmatically.
- **Fix approach:** Add Cloudflare Workers rate limiting or implement a token-bucket algorithm using D1/KV storage.

### HIGH: Contact Form Submits Data Nowhere

- **Files:** `src/app/api/contact/route.ts` (line 16-17), `src/components/contact-form.tsx` (line 44-51)
- **Issue:** The contact form component (`ContactForm`) calls `submitForm()` which only logs to console and simulates a delay. The API route at `/api/contact` has a `// TODO: send email or save to DB here` comment and only logs the data.
- **Impact:** All contact form submissions are lost. Users see a "Message Sent!" toast but no data is persisted or forwarded.
- **Fix approach:** Integrate an email service (Resend, SendGrid) or save submissions to D1. Remove the simulated delay in the component and call the actual API route.

### MEDIUM: Upload Route Has No Filename Sanitization Beyond Extension

- **Files:** `src/app/api/upload/route.ts` (lines 38-41)
- **Issue:** The upload route extracts the file extension and generates a key using timestamp + random string, which is good. However, there's no check for duplicate filenames, no virus scanning, and the 50MB max size is generous for an event website.
- **Impact:** Potential for storage abuse. No protection against uploading malicious files that pass MIME type checks.
- **Fix approach:** Add file content validation (magic bytes), reduce max size to 10MB for images, implement Cloudflare Image Resizing for optimization.

### MEDIUM: Session Cookie Has No CSRF Protection

- **Files:** `src/app/api/admin/login/route.ts` (lines 49-55)
- **Issue:** The `admin_session` cookie is set with `httpOnly: true`, `sameSite: "strict"`, and `secure` in production, which is good. However, there's no CSRF token validation on state-changing requests (POST, PUT, DELETE).
- **Impact:** While `sameSite: strict` mitigates most CSRF, API routes that accept JSON bodies could still be vulnerable to certain attack vectors.
- **Fix approach:** Add CSRF token validation for all mutating API endpoints when full auth is implemented.

### MEDIUM: Media Proxy Serves Files Without Access Control

- **Files:** `src/app/api/media/[...key]/route.ts`
- **Issue:** The media proxy serves any file from R2 without authentication. Combined with the predictable key format (`events/{timestamp}-{random}.{ext}`), an attacker could enumerate files.
- **Impact:** Uploaded files are publicly accessible. If sensitive documents are ever uploaded, they would be exposed.
- **Fix approach:** This is acceptable for public media. If private uploads are needed, add authentication checks. Consider using signed URLs for sensitive content.

## Tech Debt

### Admin Dashboard Is a 1037-Line Monolith

- **Files:** `src/app/admin/page.tsx` (1037 lines)
- **Issue:** The entire admin dashboard is a single component managing events, team members, and services with duplicated state patterns, form handlers, and upload logic. Each entity (events, team, services) has nearly identical CRUD code.
- **Impact:** Extremely difficult to maintain, test, or extend. Any change to one entity's logic risks breaking others.
- **Fix approach:** Extract into separate components: `EventManager`, `TeamManager`, `ServiceManager`. Create a shared `useCrudEntity` hook for the common patterns.

### Duplicated Upload Logic Across Three Handlers

- **Files:** `src/app/admin/page.tsx` (lines 161-189, 288-310, 386-408)
- **Issue:** `handleFileChange`, `handleTeamFileChange`, and `handleServiceFileChange` are nearly identical — only differing in state variable names.
- **Impact:** Bug fixes or improvements must be applied three times. Inconsistencies already exist (different error messages).
- **Fix approach:** Create a single `useFileUpload` hook that accepts state setters as parameters.

### Duplicated Form Save/Delete Patterns

- **Files:** `src/app/admin/page.tsx`
- **Issue:** `handleSave`/`handleTeamSave`/`handleServiceSave` and `handleDelete`/`handleDeleteTeam`/`handleDeleteService` follow identical patterns with different endpoints and state.
- **Impact:** Same maintenance burden as upload duplication.
- **Fix approach:** Parameterize into a generic `useEntityActions(endpoint, stateSetters)` hook.

### TypeScript `any` Types in Error Handlers

- **Files:** `src/app/api/services/[id]/route.ts` (line 63), `src/app/api/services/route.ts` (line 50), `src/app/api/team/[id]/route.ts` (line 54), `src/app/api/team/route.ts` (line 51), `src/app/api/events/[id]/route.ts` (line 57)
- **Issue:** Five catch blocks use `catch (err: any)` and access `err.message` directly.
- **Impact:** Loses type safety. If `err` is not an Error object, `err.message` will be undefined.
- **Fix approach:** Use `catch (err)` with proper type narrowing: `const message = err instanceof Error ? err.message : "Unknown error"`.

### `patch-package` Dependency With No Patches

- **Files:** `package.json` (line 51)
- **Issue:** `patch-package` is listed as a dependency but no `patches/` or `.yarn/patches/` directory exists.
- **Impact:** Unnecessary dependency. May indicate a removed patch was forgotten.
- **Fix approach:** Remove from `package.json` if no patches are needed.

### Build Ignores TypeScript and ESLint Errors

- **Files:** `next.config.ts` (lines 10-15)
- **Issue:** `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true` suppress all type and lint errors during production builds.
- **Impact:** Type errors and lint violations can reach production undetected. Defeats the purpose of having TypeScript.
- **Fix approach:** Fix existing errors and remove these overrides. Add a CI check that fails on type errors.

## Missing Features

### No Test Files Exist

- **Files:** Entire codebase
- **Issue:** Zero test files (`.test.*`, `.spec.*`) found. No testing framework is configured (no jest.config, vitest.config, or playwright.config).
- **Impact:** No automated verification of functionality. Refactoring the 1037-line admin page is extremely risky without tests.
- **Fix approach:** Add Vitest for unit tests and Playwright for E2E. Start with tests for API routes (easiest to test in isolation).

### No CI/CD Pipeline

- **Files:** No `.github/workflows/`, no CI config
- **Issue:** No automated testing, linting, or deployment pipeline. The `apphosting.yaml` references Firebase App Hosting but the project deploys to Cloudflare Pages.
- **Impact:** Manual deployments. No quality gates. No rollback capability.
- **Fix approach:** Add GitHub Actions workflow for typecheck, lint, test, and Cloudflare Pages deployment.

### No Linting/Formatting Configuration

- **Files:** No `.eslintrc*`, no `.prettierrc*`, no `eslint.config.*`
- **Issue:** Beyond Next.js defaults, there's no custom ESLint config or Prettier config. `postcss.config.mjs` and `tailwind.config.ts` exist but no code style enforcement.
- **Impact:** Inconsistent code style. No enforcement of best practices.
- **Fix approach:** Add ESLint config with `@typescript-eslint` rules. Add Prettier for consistent formatting.

### No Admin Login Page

- **Files:** `src/app/admin/page.tsx` references `/admin/login`, but no such route exists
- **Issue:** The admin dashboard redirects to `/admin/login` on 401 responses, but there is no login page at that path. The only admin route is `src/app/admin/page.tsx`.
- **Impact:** If auth were enabled, users would be redirected to a 404 page.
- **Fix approach:** Create `src/app/admin/login/page.tsx` with a password input form that calls `POST /api/admin/login`.

### No `/contact` Page Route

- **Files:** `src/components/sections/contact.tsx` references a contact section, `src/components/contact-form.tsx` exists, but no `src/app/contact/page.tsx`
- **Issue:** The Packages component has an "Enquire Now" button linking to `/contact` (line 141 in `src/components/sections/packages.tsx`), but this route doesn't exist.
- **Impact:** Users clicking "Enquire Now" get a 404.
- **Fix approach:** Create `src/app/contact/page.tsx` that renders the `ContactForm` component.

### No Error Boundary or Global Error Page

- **Files:** No `src/app/error.tsx`, no `src/app/not-found.tsx`
- **Issue:** Next.js app router supports custom error pages, but none are defined.
- **Impact:** Users see default Next.js error pages on crashes or 404s.
- **Fix approach:** Add `src/app/error.tsx` and `src/app/not-found.tsx` with branded error pages.

## Database

### Schema Has DROP TABLE Statements

- **Files:** `schema.sql` (lines 2-3)
- **Issue:** `DROP TABLE IF EXISTS events; DROP TABLE IF EXISTS admin_config;` at the top of the schema.
- **Impact:** Running this schema in production would delete all data. No migration strategy exists.
- **Fix approach:** Use D1 migrations (Wrangler migrations) instead of raw SQL drops. Separate seed data from schema.

### No Database Indexes

- **Files:** `schema.sql`
- **Issue:** The events table has no indexes beyond the primary key. Queries like `ORDER BY created_at DESC` will do full table scans.
- **Impact:** Performance degrades as event count grows.
- **Fix approach:** Add indexes on `created_at`, `category`, and any frequently queried columns.

### No `services` or `team_members` Tables in Schema

- **Files:** `schema.sql`
- **Issue:** The schema only defines `events` and `admin_config` tables, but API routes query `services` and `team_members` tables. The `seed.sql` file inserts into a `services` table that doesn't exist in `schema.sql`.
- **Impact:** The schema.sql is incomplete and cannot be used to recreate the database. The actual D1 database likely has additional tables created outside this schema file.
- **Fix approach:** Add `services` and `team_members` table definitions to `schema.sql`. Ensure schema matches production.

### JSON Data Stored as Strings

- **Files:** `schema.sql`, multiple API routes
- **Issue:** `gallery_urls`, `features`, and `eco_highlights` are stored as JSON strings (TEXT columns) and parsed with `JSON.parse()` in application code.
- **Impact:** No database-level validation of JSON structure. `JSON.parse()` can throw on malformed data. No ability to query inside JSON.
- **Fix approach:** Use D1's JSON type or validate JSON before insertion. Add try/catch around all `JSON.parse()` calls (some already have it, some don't).

## Performance

### No Next.js Image Optimization

- **Files:** Multiple components using `<img>` instead of `<Image>`
- **Issue:** `src/app/past-events/page.tsx`, `src/app/past-events/[id]/page.tsx`, `src/components/sections/packages.tsx`, `src/components/sections/leadership.tsx`, and `src/app/admin/page.tsx` all use native `<img>` tags instead of Next.js `<Image>` component.
- **Impact:** No automatic image optimization, lazy loading, or responsive sizing. External images from Unsplash are served at full resolution.
- **Fix approach:** Replace `<img>` with `<Image>` and configure `remotePatterns` in `next.config.ts` for all image sources.

### No Data Caching Strategy

- **Files:** All API route GET handlers
- **Issue:** Every GET request hits D1 directly with no caching. Events, services, and team data are fetched fresh on every request.
- **Impact:** Unnecessary D1 reads on every page load. Increased latency and Cloudflare costs.
- **Fix approach:** Add Cloudflare Cache API or use Next.js `revalidate` for static data. Events change infrequently and can be cached for minutes.

### Admin Dashboard Fetches All Data on Every Mount

- **Files:** `src/app/admin/page.tsx` (lines 154-158)
- **Issue:** Three sequential fetches (`fetchEvents`, `fetchTeam`, `fetchServices`) run on every component mount with no caching or pagination.
- **Impact:** Slow initial load. Refetches on every navigation back to admin.
- **Fix approach:** Add SWR or React Query for caching and background revalidation.

## Architecture Issues

### Inconsistent Error Handling Across API Routes

- **Files:** All API routes under `src/app/api/`
- **Issue:** Some routes wrap operations in try/catch (`src/app/api/services/route.ts`), others don't (`src/app/api/events/route.ts`). Some return `{ error: err.message }`, others let errors propagate.
- **Impact:** Inconsistent error responses make frontend error handling difficult. Uncaught errors may expose stack traces.
- **Fix approach:** Create a shared `withErrorHandling()` wrapper or middleware for consistent error responses.

### No Input Validation Layer

- **Files:** All POST/PUT API routes
- **Issue:** Request bodies are destructured directly without validation. Zod is available in dependencies but only used in the contact form component, not in API routes.
- **Impact:** Malformed requests can cause database errors or unexpected behavior. No protection against injection via unexpected field types.
- **Fix approach:** Create Zod schemas for each entity and validate request bodies before database operations.

### Tight Coupling Between Admin UI and API

- **Files:** `src/app/admin/page.tsx`
- **Issue:** The admin page directly constructs fetch URLs, handles HTTP status codes, and manages error states inline. There's no API client abstraction.
- **Impact:** Changing an API endpoint requires updates in multiple places within the component.
- **Fix approach:** Create an API client module (`src/lib/api.ts`) with typed methods for each entity.

### `seed.sql` References Non-Existent Table

- **Files:** `seed.sql` (line 1)
- **Issue:** `seed.sql` inserts into a `services` table, but `schema.sql` doesn't define it. Running schema then seed would fail.
- **Impact:** Database setup is broken. New developers or deployments cannot initialize the database from these files.
- **Fix approach:** Add the `services` table to `schema.sql` or create a separate migration file.

## Dependencies at Risk

### `patch-package` Without Patches

- **Files:** `package.json` (line 51)
- **Issue:** Listed as a dependency but no patches directory exists.
- **Impact:** Dead dependency.
- **Fix approach:** Remove if unused.

### Firebase Dependencies With No Firebase Usage

- **Files:** `package.json` (line 46: `firebase`), `apphosting.yaml`
- **Issue:** `firebase` is installed but not imported anywhere in the source code. `apphosting.yaml` configures Firebase App Hosting but the project deploys to Cloudflare Pages.
- **Impact:** Unnecessary bundle size. Confusing deployment configuration.
- **Fix approach:** Remove `firebase` from dependencies. Remove or update `apphosting.yaml` to reflect Cloudflare Pages deployment.

### Genkit AI Setup Without Usage

- **Files:** `src/ai/genkit.ts`
- **Issue:** Genkit is configured with Google Gemini but no flows or tools are defined. No AI features are exposed in the application.
- **Impact:** Unused dependency chain (`genkit`, `@genkit-ai/google-genai`, `@genkit-ai/next`, `genkit-cli`).
- **Fix approach:** Either implement AI features or remove the Genkit dependencies to reduce bundle size and deployment complexity.

## Accessibility

### Missing ARIA Labels on Interactive Elements

- **Files:** `src/components/ui/like-button.tsx`, `src/app/admin/page.tsx`
- **Issue:** The like button has no aria-label describing its action. Admin table action buttons (edit, delete) have no accessible labels.
- **Impact:** Screen readers cannot describe the purpose of these buttons.
- **Fix approach:** Add `aria-label` to icon-only buttons.

### Color Contrast Not Verified

- **Files:** All components using `text-muted-foreground`
- **Issue:** Muted text colors on dark backgrounds may not meet WCAG AA contrast ratios (4.5:1 for normal text).
- **Impact:** Low-vision users may not be able to read secondary text.
- **Fix approach:** Run an accessibility audit with Lighthouse or axe DevTools.

### Form Inputs Missing Associated Labels in Admin

- **Files:** `src/app/admin/page.tsx`
- **Issue:** Admin form inputs use `placeholder` attributes but no `<label>` elements. Placeholders disappear on focus and are not accessible to screen readers.
- **Impact:** Poor accessibility for admin users with assistive technology.
- **Fix approach:** Add `<label>` elements or `aria-label` attributes to all form inputs.

---

*Concerns audit: 2026-05-22*
