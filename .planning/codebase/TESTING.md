# Testing Patterns

**Analysis Date:** 2026-05-22

## Test Framework

**Status: No testing infrastructure detected.**

- No test files found (`*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx`)
- No test configuration found (`jest.config.*`, `vitest.config.*`, `playwright.config.*`)
- No test scripts in `package.json`

### Package.json Scripts

Current scripts in `package.json`:
```json
{
  "dev": "next dev --turbopack -p 9002",
  "genkit:dev": "genkit start -- tsx src/ai/dev.ts",
  "genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "pages:build": "npx @cloudflare/next-on-pages"
}
```

No `test`, `test:watch`, or `test:coverage` scripts exist.

## What's Missing

### Test Files

**Zero test files** exist in the entire codebase. The following areas have no test coverage:

| Area | Files | Risk |
|------|-------|------|
| UI Components | `src/components/ui/*.tsx` (36 files) | High — visual regressions, broken interactions |
| Section Components | `src/components/sections/*.tsx` (8 files) | Medium — content rendering |
| Forms | `src/components/contact-form.tsx` | High — validation, submission logic |
| Hooks | `src/hooks/use-toast.ts`, `src/hooks/use-mobile.tsx` | Medium — state management |
| API Routes | `src/app/api/**/*.ts` (10 files) | High — data operations, auth bypass |
| Utilities | `src/lib/utils.ts`, `src/lib/cf-bindings.ts` | Low — simple functions |
| Layout | `src/components/layout/*.tsx` (2 files) | Low — structural components |
| Pages | `src/app/**/*.tsx` (8 files) | Medium — page composition |

### Test Configuration

No test runner, assertion library, or mocking framework is installed.

## Recommended Testing Setup

Given the project stack (Next.js 15, TypeScript, React 19), the following setup is recommended:

### Option 1: Vitest (Recommended for this project)

**Why:** Fast, TypeScript-native, works well with Next.js App Router, compatible with existing dependencies.

**Install:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

**Config** (`vitest.config.ts`):
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
```

**Scripts** to add to `package.json`:
```json
{
  "test": "vitest",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage"
}
```

### Option 2: Jest

**Install:**
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom ts-jest @types/jest
```

## What to Test (Priority Order)

### 1. Form Validation (`src/components/contact-form.tsx`)

**What to test:**
- Zod schema validation rules (min length, email format, required fields)
- Form submission with valid data
- Form submission with invalid data
- Loading state during submission
- Toast notification on success/failure
- Form reset after successful submission

### 2. API Routes (`src/app/api/**/*.ts`)

**What to test:**
- `POST /api/contact` — validation, success response, error handling
- `GET /api/services` — response shape, empty state
- `POST /api/services` — auth check, validation, DB interaction
- `GET/POST/PUT/DELETE /api/events` — CRUD operations
- `POST /api/upload` — file handling
- Error responses (400, 401, 500, 503)

### 3. Utility Functions (`src/lib/utils.ts`)

**What to test:**
- `cn()` — class merging, conflict resolution, conditional classes

### 4. Hooks (`src/hooks/*.ts`)

**What to test:**
- `useIsMobile` — breakpoint detection, resize handling
- `useToast` — toast creation, dismissal, limit enforcement

### 5. UI Components (`src/components/ui/*.tsx`)

**What to test:**
- `Button` — variants, sizes, asChild prop, disabled state
- `Form` components — error display, label association
- `Card`, `Badge`, `Dialog`, etc. — rendering with props

### 6. Section Components (`src/components/sections/*.tsx`)

**What to test:**
- `Hero` — content rendering, link destinations
- `FAQ` — accordion rendering, FAQ data display
- `Packages` — loading state, empty state, service rendering

## Test File Organization

**Recommended pattern:** Co-located test files next to source files.

```
src/
├── components/
│   ├── contact-form.tsx
│   ├── contact-form.test.tsx        # Test file next to source
│   ├── ui/
│   │   ├── button.tsx
│   │   └── button.test.tsx
│   └── sections/
│       ├── hero.tsx
│       └── hero.test.tsx
├── hooks/
│   ├── use-toast.ts
│   └── use-toast.test.ts
├── lib/
│   ├── utils.ts
│   └── utils.test.ts
└── app/
    └── api/
        └── contact/
            ├── route.ts
            └── route.test.ts
```

## Mocking Strategy

### What to Mock

- **Cloudflare bindings** (`@cloudflare/next-on-pages`) — not available in test environment
- **Fetch calls** — API responses for component tests
- **Toast notifications** — side effects in form tests
- **IntersectionObserver** — for `AnimateOnScroll` component

### What NOT to Mock

- **Zod validation** — test actual validation behavior
- **React Hook Form** — test actual form behavior
- **cn() utility** — test actual class merging

### Example Mock Pattern (Cloudflare bindings)

```ts
// src/test/setup.ts
vi.mock('@cloudflare/next-on-pages', () => ({
  getRequestContext: () => ({
    env: {
      the_scene_co_db: {
        prepare: vi.fn().mockReturnValue({
          all: vi.fn().mockResolvedValue({ results: [] }),
          run: vi.fn().mockResolvedValue({ meta: { last_row_id: 1 } }),
        }),
      },
      the_scene_co_media: undefined,
    },
  }),
}))
```

## Coverage

**Current coverage:** 0% (no tests exist)

**Recommended target:** 70%+ for critical paths (forms, API routes, utilities)

## E2E Tests

**Status:** Not configured.

**Recommendation:** Consider Playwright for E2E testing of critical user flows:
- Contact form submission
- Navigation between pages
- Admin dashboard CRUD operations
- Mobile responsive behavior

---

*Testing analysis: 2026-05-22*
