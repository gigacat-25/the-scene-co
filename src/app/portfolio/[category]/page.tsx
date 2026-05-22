import { getPublishedPortfolio, getPortfolioCategories } from "@/lib/db";
import { notFound } from "next/navigation";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import type { Metadata } from "next";

export const runtime = "edge";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${category} Portfolio — The Scene Co.`,
    description: `Browse our ${category.toLowerCase()} projects — custom-built websites and applications.`,
  };
}

export default async function PortfolioCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categories = await getPortfolioCategories();
  const normalizedCategory = categories.find(c => c.toLowerCase() === category.toLowerCase());

  if (!normalizedCategory) notFound();

  const items = await getPublishedPortfolio(normalizedCategory);

  return (
    <div className="container mx-auto px-4 py-24 sm:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-white mb-6">
          {normalizedCategory} Projects
        </h1>
        <p className="text-muted-foreground text-lg">
          Browse our {normalizedCategory.toLowerCase()} work.
        </p>
      </div>
      <PortfolioGrid items={items} categories={categories} activeCategory={normalizedCategory} />
    </div>
  );
}
