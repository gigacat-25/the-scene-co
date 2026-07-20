import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';
import { JsonLd, organizationSchema } from '@/components/json-ld';
import { ClientEffects } from '@/components/ui/ClientEffects';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const runtime = "edge";

const SITE_URL = "https://www.thescene.co.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Best Web Development Company in Bangalore, India | The Scene Co.',
    template: '%s | The Scene Co.',
  },
  description:
    'Looking for the best website development company in Bangalore? The Scene Co. builds custom websites, e-commerce stores, and POS systems from scratch — full-stack, with built-in CMS and 1 year free hosting. Zero templates. Serving businesses across India.',

  // ── Keywords ──────────────────────────────────────────────────────────
  keywords: [
    'best web development company in Bangalore',
    'best web development company in India',
    'best website development company in Bangalore',
    'web development company Bangalore',
    'website development company Bangalore',
    'web design company Bangalore',
    'website designers Bangalore',
    'web development agency Bangalore',
    'best website design services in Bangalore',
    'custom website development India',
    'website development company India',
    'web development company India',
    'e-commerce store development Bangalore',
    'POS system development India',
    'custom website Bangalore',
    'Next.js development agency India',
    'full stack web development India',
    'custom CMS development Bangalore',
    'professional website development Bangalore',
    'SEO-friendly website development Bangalore',
    'e-commerce website development Bangalore',
    'mobile app development Bangalore',
    'software development company Bangalore',
    'digital marketing agency Bangalore',
    'web development services India',
  ],

  // ── Authors & Creator ─────────────────────────────────────────────────
  authors: [{ name: 'The Scene Co.', url: SITE_URL }],
  creator: 'The Scene Co.',
  publisher: 'The Scene Co.',

  // ── Icons ─────────────────────────────────────────────────────────────
  icons: {
    icon: [{ url: '/brand-logo.png', type: 'image/png' }],
    apple: [{ url: '/brand-logo.png', type: 'image/png' }],
    shortcut: '/brand-logo.png',
  },

  // ── Open Graph ────────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'The Scene Co.',
    title: 'The Scene Co. | Custom Websites, E-Commerce & POS Systems in India',
    description:
      'Premium custom websites, e-commerce stores, and POS systems — full-stack, with built-in CMS and 1 year free hosting. Zero templates.',
    images: [
      {
        url: '/brand-logo.png',
        width: 1024,
        height: 1024,
        alt: 'The Scene Co. — Websites & Digital Solutions',
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    site: '@thesceneco',
    creator: '@thesceneco',
    title: 'The Scene Co. | Custom Websites, E-Commerce & POS Systems in India',
    description:
      'Premium custom websites, e-commerce stores, and POS systems — full-stack, with built-in CMS and 1 year free hosting. Zero templates.',
    images: ['/brand-logo.png'],
  },

  // ── Canonical ─────────────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
    languages: { 'en-IN': SITE_URL },
  },

  // ── Robots ────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Google Search Console verification ───────────────────────────────
  // Replace the value below with your actual GSC verification code
  // (from Search Console → Settings → Ownership Verification → HTML Tag)
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? '',
  },

  // ── Category ─────────────────────────────────────────────────────────
  category: 'technology',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

import { getPublicSettings } from '@/lib/db';

/**
 * LayoutShell — async Server Component that fetches settings and renders the
 * Navbar / Footer / Toaster shell for public routes.
 *
 * Admin pages (app/admin/layout.tsx) and login (app/admin/login/page.tsx)
 * overlay the full viewport with z-[9999], visually covering the Navbar/Footer.
 * Keeping headers() out of this component allows Next.js 15 to classify /_not-found
 * as Edge Runtime for @cloudflare/next-on-pages compatibility.
 */
async function LayoutShell({ children }: { children: React.ReactNode }) {
  const settings: Record<string, string> = await getPublicSettings().catch(() => ({}));

  return (
    <>
      {/* Site-wide JSON-LD: Organization + WebSite + LocalBusiness */}
      <JsonLd data={organizationSchema} />
      <Navbar />
      <main className="flex-grow relative z-10">{children}</main>
      <Footer settings={settings} />
      <Toaster />
    </>
  );
}




/** Root layout — must remain SYNCHRONOUS for edge runtime compatibility. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en-IN"
        className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth overflow-x-hidden`}
        suppressHydrationWarning
      >
        <head>
          {/* Asset prefetching */}
          <link rel="dns-prefetch" href="https://images.unsplash.com" />
          <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
          {/* Geo meta tags for local SEO */}
          <meta name="geo.region" content="IN-KA" />
          <meta name="geo.placename" content="Bangalore" />
          <meta name="geo.position" content="12.9716;77.5946" />
          <meta name="ICBM" content="12.9716, 77.5946" />
        </head>
        <body className="font-body antialiased bg-[#050505] text-[#F5F2EE] overflow-x-hidden flex flex-col min-h-screen relative">
          {/* Film Grain Effect Overlay */}
          <div className="film-grain-overlay" />

          <ClientEffects />

          <LayoutShell>{children}</LayoutShell>
        </body>
      </html>
    </ClerkProvider>
  );
}
