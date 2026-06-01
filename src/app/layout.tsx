import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';
import { JsonLd, organizationSchema } from '@/components/json-ld';

export const runtime = "edge";

const SITE_URL = "https://www.thescene.co.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'The Scene Co. | Custom Websites, E-Commerce & POS Systems in India',
    template: '%s | The Scene Co.',
  },
  description:
    'The Scene Co. builds premium custom websites, e-commerce stores, and POS systems — full-stack, with built-in CMS and 1 year free hosting. Zero templates. Based in Bangalore, serving businesses across India.',

  // ── Keywords ──────────────────────────────────────────────────────────
  keywords: [
    'web development company Bangalore',
    'website development company Bangalore',
    'web design companies Bangalore',
    'website developers Bangalore',
    'web development agencies Bangalore',
    'best website design services in Bangalore',
    'custom website development India',
    'web development agency Bangalore',
    'e-commerce store development',
    'POS system development India',
    'custom website Bangalore',
    'Next.js development agency',
    'full stack web development',
    'SaaS development India',
    'website development company India',
    'custom CMS development',
    'Razorpay integration',
    'web agency Bangalore',
    'The Scene Co',
    'thescene.co.in',
    'professional website development',
    'SEO-friendly website development',
    'e-commerce website development Bangalore',
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings: Record<string, string> = await getPublicSettings().catch(() => ({}));

  return (
    <ClerkProvider>
      <html lang="en-IN" className="scroll-smooth overflow-x-hidden" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap"
            rel="stylesheet"
          />
          {/* Geo meta tags for local SEO */}
          <meta name="geo.region" content="IN-KA" />
          <meta name="geo.placename" content="Bangalore" />
          <meta name="geo.position" content="12.9716;77.5946" />
          <meta name="ICBM" content="12.9716, 77.5946" />
        </head>
        <body className="font-body antialiased bg-canvas text-ink overflow-x-hidden flex flex-col min-h-screen">
          {/* Site-wide JSON-LD: Organization + WebSite + LocalBusiness */}
          <JsonLd data={organizationSchema} />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer settings={settings} />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
