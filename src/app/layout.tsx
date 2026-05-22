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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://thescene.co.in",
    title: "The Scene Co. | Custom Websites, POS Systems & SaaS Products",
    description: "We build premium custom websites, e-commerce stores, and POS systems — full-stack, with built-in CMS and 1 year free hosting. Zero templates.",
    siteName: "The Scene Co.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Scene Co. | Custom Websites, POS Systems & SaaS Products",
    description: "We build premium custom websites, e-commerce stores, and POS systems — full-stack, with built-in CMS and 1 year free hosting. Zero templates.",
  },
  alternates: {
    canonical: "https://thescene.co.in",
  },
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
      <html lang="en" className="scroll-smooth" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased bg-canvas text-ink">
          <Navbar />
          <main>{children}</main>
          <Footer settings={settings} />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
