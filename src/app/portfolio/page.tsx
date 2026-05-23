import { getPublishedPortfolio, getPortfolioCategories } from "@/lib/db";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { JsonLd, webPageSchema } from "@/components/json-ld";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Portfolio — Custom Websites & E-Commerce Projects We've Built",
  description:
    "View The Scene Co.'s portfolio of custom websites, e-commerce stores, and POS systems built for businesses across India. Real projects, zero templates.",
  keywords: [
    "web development portfolio India",
    "custom website examples India",
    "e-commerce website portfolio",
    "web agency work Bangalore",
    "POS system projects India",
    "website case studies India",
  ],
  alternates: { canonical: "https://www.thescene.co.in/portfolio" },
  openGraph: {
    url: "https://www.thescene.co.in/portfolio",
    title: "Portfolio | The Scene Co.",
    description:
      "Custom websites, e-commerce stores, and POS systems built for real businesses across India — zero templates.",
  },
};

export default async function PortfolioPage() {
  const items = await getPublishedPortfolio();
  const categories = await getPortfolioCategories();

  const portfolioSchema = webPageSchema({
    name: "Portfolio — Custom Websites & E-Commerce Projects | The Scene Co.",
    description:
      "Custom websites, e-commerce stores, and POS systems built from scratch for businesses across India. No templates.",
    url: "/portfolio",
    breadcrumbs: [{ name: "Portfolio", url: "https://www.thescene.co.in/portfolio" }],
  });

  return (
    <div className="flex flex-col bg-canvas">
      <JsonLd data={portfolioSchema} />

      {/* Page hero */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-16 max-w-6xl">
        <span className="eyebrow-mono text-ink/60 block mb-4">Portfolio</span>
        <h1
          className="text-ink mb-6"
          style={{ fontSize: "clamp(36px, 5vw, 86px)", fontWeight: 340, lineHeight: 1.0, letterSpacing: "-1.72px" }}
        >
          Our work,
          <br />
          <span style={{ fontWeight: 700 }}>zero templates.</span>
        </h1>
        <p className="body-lg-figma text-ink/70 max-w-2xl">
          Custom websites, e-commerce stores, and POS systems — built from scratch for real businesses.
        </p>
      </div>

      <MarqueeStrip />

      <div className="container mx-auto px-4 sm:px-6 py-20 max-w-7xl">
        <PortfolioGrid items={items} categories={categories} />
      </div>

      <CtaBanner
        title="Ready to build something amazing?"
        subtitle="Get a free consultation and detailed quote for your project — no commitment required."
        ctaText="Get a Free Quote"
        ctaLink="/contact"
        secondaryText="View Pricing"
        secondaryLink="/pricing"
        colorBlock="mint"
      />
    </div>
  );
}
