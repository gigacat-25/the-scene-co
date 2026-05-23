import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';

export const runtime = "edge";

export const metadata: Metadata = {
  title: 'The Scene Co. | Custom Websites, POS Systems & SaaS Products',
  description: 'We build premium custom websites, e-commerce stores, and POS systems — full-stack, with built-in CMS and 1 year free hosting. Zero templates.',
  metadataBase: new URL('https://thescene.co.in'),
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://thescene.co.in",
    title: "The Scene Co. | Custom Websites, POS Systems & SaaS Products",
    description: "We build premium custom websites, e-commerce stores, and POS systems — full-stack, with built-in CMS and 1 year free hosting. Zero templates.",
    siteName: "The Scene Co.",
    images: [{ url: '/logo.png', width: 1024, height: 1024, alt: 'The Scene Co. Logo' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Scene Co. | Custom Websites, POS Systems & SaaS Products",
    description: "We build premium custom websites, e-commerce stores, and POS systems — full-stack, with built-in CMS and 1 year free hosting. Zero templates.",
    images: ['/logo.png'],
  },
  alternates: {
    canonical: "https://thescene.co.in",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

import { getAllSettings } from '@/lib/db';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings: Record<string, string> = await getAllSettings().catch(() => ({}));

  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth overflow-x-hidden" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased bg-canvas text-ink overflow-x-hidden flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer settings={settings} />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
