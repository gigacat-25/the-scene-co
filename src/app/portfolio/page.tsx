import { getPublishedPortfolio, getPortfolioCategories } from "@/lib/db";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Portfolio — The Scene Co.",
  description: "See our work: custom websites, e-commerce stores, and POS systems built for businesses across India.",
};

export default async function PortfolioPage() {
  const items = await getPublishedPortfolio();
  const categories = await getPortfolioCategories();

  return (
    <div className="flex flex-col">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-white mb-6">
            Our Work
          </h1>
          <p className="text-muted-foreground text-lg">
            Custom websites, e-commerce stores, and POS systems — built from scratch, no templates.
          </p>
        </div>
        <PortfolioGrid items={items} categories={categories} />
      </div>
      <CtaBanner
        title="Ready to Build Something Amazing?"
        subtitle="Get a free consultation and quote for your project."
        ctaText="Get a Free Quote"
        ctaLink="/contact"
      />
    </div>
  );
}
