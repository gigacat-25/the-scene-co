import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

export const runtime = "edge";

export const metadata: Metadata = {
  title: 'The Scene Co. | Events & Experiences, Curated to Perfection.',
  description: 'Premium, experiential, and eco-conscious event planning for TEDx, corporate functions, cultural events, and brand activations.',
  metadataBase: new URL('https://thescene.co.in'),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://thescene.co.in",
    title: "The Scene Co. | Events & Experiences, Curated to Perfection.",
    description: "Premium, experiential, and eco-conscious event planning for TEDx, corporate functions, cultural events, and brand activations.",
    siteName: "The Scene Co.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Scene Co. | Events & Experiences, Curated to Perfection.",
    description: "Premium, experiential, and eco-conscious event planning for TEDx, corporate functions, cultural events, and brand activations.",
  },
  alternates: {
    canonical: "https://thescene.co.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
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
