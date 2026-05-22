# Coding Conventions

**Analysis Date:** 2026-05-22

## TypeScript

**Strict mode enabled** in `tsconfig.json`:
- `"strict": true` — all strict type-checking options on
- `"noEmit": true` — Next.js handles compilation
- `"moduleResolution": "bundler"` — modern bundler-style resolution
- `"jsx": "preserve"` — Next.js handles JSX transformation
- Target: `ES2017`

**Path alias:** `@/*` maps to `./src/*` — used throughout the codebase for all internal imports.

## File Naming

**Files:** kebab-case
- `src/components/sections/hero.tsx`
- `src/components/contact-form.tsx`
- `src/components/animate-on-scroll.tsx`
- `src/lib/utils.ts`
- `src/hooks/use-toast.ts`

**Functions:** camelCase
- `submitForm`, `handleSave`, `fetchEvents`, `handleDelete`

**Components:** PascalCase (exported named functions)
- `export function Hero()`
- `export function ContactForm()`
- `export function AnimateOnScroll()`

**Types/Interfaces:** PascalCase
- `interface ButtonProps`, `type FormValues`, `interface Service`

## Component Structure

**React Server Components (RSC) by default.** Components are server components unless they need client-side interactivity.

**Client components** use the `"use client"` directive at the top of the file:
```tsx
// src/components/contact-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// ...
```

**Server components** have no directive:
```tsx
// src/components/sections/hero.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return ( ... );
}
```

**When to use `"use client"`:**
- React hooks (`useState`, `useEffect`, `useRef`, `useForm`)
- Event handlers (`onClick`, `onSubmit`)
- Browser APIs (`window`, `IntersectionObserver`)
- Client-only libraries (`framer-motion`, `react-hook-form`)

Examples of client components:
- `src/components/contact-form.tsx` — uses `useForm`, `useToast`
- `src/components/layout/navbar.tsx` — uses `useState`, `Sheet`
- `src/components/layout/footer.tsx` — uses client-side rendering
- `src/components/sections/packages.tsx` — uses `useState`, `useEffect`, `fetch`
- `src/components/animate-on-scroll.tsx` — uses `IntersectionObserver`
- `src/hooks/use-toast.ts` — uses React state management
- `src/hooks/use-mobile.tsx` — uses `window.matchMedia`

Examples of server components:
- `src/components/sections/hero.tsx` — static content
- `src/components/sections/faq.tsx` — static data array
- `src/components/sections/contact.tsx` — renders `ContactForm` (client)
- `src/app/page.tsx` — composes section components
- `src/app/layout.tsx` — root layout with metadata

## Import Organization

**Order observed in source files:**
1. React/Next.js core imports
2. Third-party library imports
3. shadcn/ui component imports
4. Internal imports using `@/` path alias
5. Relative imports from sibling directories

Example from `src/components/contact-form.tsx`:
```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";       // Third-party
import { useForm } from "react-hook-form";                     // Third-party
import { z } from "zod";                                       // Third-party
import { Loader2 } from "lucide-react";                        // Third-party

import { Button } from "@/components/ui/button";               // Internal (@/ alias)
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";                                 // Internal (@/ alias)
import { Input } from "@/components/ui/input";                 // Internal (@/ alias)
import { useToast } from "@/hooks/use-toast";                  // Internal (@/ alias)
import { AnimateOnScroll } from "./animate-on-scroll";         // Relative (sibling)
```

Example from `src/components/ui/button.tsx`:
```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
```

**Path aliases** (from `components.json`):
- `@/components` → `src/components`
- `@/components/ui` → `src/components/ui`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks`
- `@/lib/utils` → `src/lib/utils`

## shadcn/ui Component Patterns

**Config** (`components.json`):
- Style: `default`
- RSC: `true`
- TSX: `true`
- Base color: `neutral`
- CSS variables: `true`
- Icon library: `lucide`

**UI components live in** `src/components/ui/`. There are 36 UI components including:
- `button.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx`
- `form.tsx` (React Hook Form integration)
- `card.tsx`, `badge.tsx`, `dialog.tsx`, `sheet.tsx`
- `accordion.tsx`, `tabs.tsx`, `select.tsx`, `dropdown-menu.tsx`
- `toast.tsx`, `toaster.tsx`, `alert.tsx`, `alert-dialog.tsx`

### CVA (Class Variance Authority) Pattern

All shadcn/ui components use CVA for variant management. Example from `src/components/ui/button.tsx`:

```tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**Key patterns:**
- Variants object exported alongside component (e.g., `buttonVariants`)
- `asChild` prop using `@radix-ui/react-slot` for component composition
- `React.forwardRef` for ref forwarding
- `displayName` set for debugging
- `cn()` wraps the variant call to allow className overrides

### cn() Utility

Located at `src/lib/utils.ts`:

```tsx
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage:** Merge Tailwind classes with conditional logic, resolving conflicts via `tailwind-merge`:
```tsx
className={cn("space-y-2", className)}
className={cn(error && "text-destructive", className)}
className={cn(className, isVisible ? animationClass : hiddenClass)}
```

## Tailwind CSS

**Config:** `tailwind.config.ts`
**CSS:** `src/app/globals.css`
**PostCSS:** `postcss.config.mjs` (tailwindcss plugin only)

### CSS Variables (HSL format)

All colors defined as CSS custom properties in `src/app/globals.css`:
```css
:root {
  --background: 263 33% 11%;    /* Deep Indigo */
  --foreground: 60 14% 97%;     /* Off White */
  --primary: 40 76% 63%;        /* Champagne Gold */
  --secondary: 260 41% 25%;     /* Royal Violet */
  --muted: 260 41% 20%;
  --muted-foreground: 60 10% 80%;
  --card: 260 41% 17%;
  --border: 260 41% 25%;
  --ring: 40 76% 63%;
  --radius: 0.75rem;
}
```

Tailwind config maps these to utility classes:
```ts
colors: {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
  // ...
}
```

### Custom Fonts

```ts
fontFamily: {
  body: ['Montserrat', 'sans-serif'],
  headline: ['Playfair Display', 'serif'],
  code: ['monospace'],
}
```

Loaded in `src/app/layout.tsx` via Google Fonts `<link>` tags in `<head>`.

### Custom Animations

Defined in `tailwind.config.ts`:
```ts
keyframes: {
  'fade-in': { 'from': { opacity: '0' }, 'to': { opacity: '1' } },
  'slide-in-up': { 'from': { transform: 'translateY(24px)', opacity: '0' }, 'to': { transform: 'translateY(0)', opacity: '1' } },
},
animation: {
  'fade-in': 'fade-in 1s ease-out forwards',
  'slide-in-up': 'slide-in-up 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
}
```

### Container

```ts
container: {
  center: true,
  padding: "2rem",
  screens: { "2xl": "1400px" },
}
```

### Usage Pattern

Tailwind classes applied directly in JSX. Common patterns:
- Layout: `container mx-auto px-4 py-24 sm:py-32`
- Responsive: `grid grid-cols-1 lg:grid-cols-3 gap-8`
- Text: `font-headline text-3xl font-bold tracking-tight sm:text-4xl`
- Colors: `text-muted-foreground`, `bg-background`, `text-primary`
- Transitions: `transition-colors hover:text-primary`
- Backdrop effects: `bg-background/80 backdrop-blur-lg`
- Opacity modifiers: `border-white/10`, `bg-secondary/20`

## Form Handling

**Stack:** React Hook Form + Zod + `@hookform/resolvers/zod`

**Pattern** from `src/components/contact-form.tsx`:

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// 1. Define Zod schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50),
  email: z.string().email("Please enter a valid email address."),
  eventType: z.enum(["tedx", "corporate", "conference", "college", "brand"], {
    required_error: "Please select an event type.",
  }),
  message: z.string().min(10, "Message must be at least 10 characters.").max(500),
});

type FormValues = z.infer<typeof formSchema>;

// 2. Create form with resolver
const form = useForm<FormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: { name: "", email: "", message: "" },
});

// 3. Submit handler
async function onSubmit(values: FormValues) {
  const result = await submitForm(values);
  if (result.success) {
    toast({ title: "Message Sent!", description: "..." });
    form.reset();
  }
}

// 4. Render with FormProvider + FormField
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Full Name</FormLabel>
          <FormControl>
            <Input placeholder="Jane Doe" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    {/* ... more fields */}
    <Button type="submit" disabled={form.formState.isSubmitting}>
      {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Send Inquiry
    </Button>
  </form>
</Form>
```

**Form component hierarchy** (from `src/components/ui/form.tsx`):
- `Form` — alias for `FormProvider`
- `FormField` — wraps `Controller`, provides context
- `FormItem` — wrapper with auto-generated IDs
- `FormLabel` — label with error state styling
- `FormControl` — wraps input with aria attributes
- `FormDescription` — helper text
- `FormMessage` — error message (auto-displayed)

## Hook Patterns

### Custom Hook Pattern

**`useIsMobile`** from `src/hooks/use-mobile.tsx`:
```tsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```

**`useToast`** from `src/hooks/use-toast.ts`:
- Uses a reducer-based state management pattern
- Exports both `useToast` hook and `toast` function
- Uses React context internally via `listeners` array
- Supports `ADD_TOAST`, `UPDATE_TOAST`, `DISMISS_TOAST`, `REMOVE_TOAST` actions

### Hook conventions:
- All hooks use `React.useState` and `React.useEffect` (not destructured imports)
- Hooks in `src/hooks/` directory
- File naming: `use-*.ts` or `use-*.tsx`
- Export named function (not default)

## Error Handling

### API Routes

Pattern from `src/app/api/contact/route.ts`:
```tsx
export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
```

**Patterns:**
- Try/catch wrapping route handler logic
- Input validation with early return (400 status)
- Generic error catch returning 500
- Error messages returned as `{ error: "message" }`
- Success responses as `{ success: true }` or data objects

### Client-side Error Handling

- Form validation via Zod schema (automatic error messages)
- Loading states with `isSubmitting` flag
- Toast notifications for user feedback
- `try/catch/finally` for fetch operations with loading state management

### Cloudflare Bindings

Pattern from `src/lib/cf-bindings.ts`:
```tsx
export async function getBindings() {
  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    const { env } = getRequestContext();
    return { db: env.the_scene_co_db, r2: env.the_scene_co_media };
  } catch {
    return { db: undefined, r2: undefined };
  }
}
```

Graceful degradation when Cloudflare bindings unavailable (local dev).

## Logging

**Framework:** `console.log` / `console.error` only

**Patterns:**
- `console.log("Form submitted:", data)` — debug info
- `console.error("Contact form error:", error)` — error logging
- `console.log("New contact:", { name, email, message })` — event logging

No structured logging framework in use.

## Comments

**Style:** Minimal inline comments, no JSDoc/TSDoc observed

**Patterns:**
- Section dividers: `// ── Upload file to R2 ──────────────────────────────────────────────`
- Inline explanations: `// Local preview`, `// Temporary bypass`
- TODO markers: `// TODO: send email or save to DB here`
- CSS comments in `globals.css`: `/* Deep Indigo */`, `/* Champagne Gold */`

## Layout Pattern

**Root layout** from `src/app/layout.tsx`:
```tsx
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

export const runtime = "edge";

export const metadata: Metadata = { ... };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        {/* Google Fonts links */}
      </head>
      <body className="font-body antialiased bg-background">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
```

**Key patterns:**
- `export const runtime = "edge"` for Cloudflare Pages deployment
- `Metadata` export for SEO
- `suppressHydrationWarning` on `<html>` (dark mode class)
- Global `Toaster` component for toast notifications
- Body classes: `font-body antialiased bg-background`

## Middleware

**Location:** `src/middleware.ts`

```tsx
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
```

Currently a passthrough (auth bypass pending Clerk implementation).

## Build & Dev Scripts

From `package.json`:
```json
{
  "dev": "next dev --turbopack -p 9002",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "pages:build": "npx @cloudflare/next-on-pages"
}
```

**Key notes:**
- Turbopack enabled for dev
- TypeScript typecheck available via `npm run typecheck`
- ESLint via `next lint` (but `ignoreDuringBuilds: true` in next.config.ts)
- TypeScript build errors ignored (`ignoreBuildErrors: true` in next.config.ts)
- Deployed to Cloudflare Pages via `@cloudflare/next-on-pages`

---

*Convention analysis: 2026-05-22*
