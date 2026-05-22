import { getPublishedPortfolio, getPortfolioCategories, getPortfolioBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const runtime = "edge";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const item = await getPortfolioBySlug(slug);
  if (item) {
    return { title: `${item.title} — The Scene Co.`, description: item.description };
  }

  const categories = await getPortfolioCategories();
  const normalizedCategory = categories.find(c => c.toLowerCase() === slug.toLowerCase());
  if (normalizedCategory) {
    return { title: `${normalizedCategory} Portfolio — The Scene Co.`, description: `Browse our ${normalizedCategory.toLowerCase()} projects.` };
  }

  return { title: "Not Found" };
}

export default async function PortfolioSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const item = await getPortfolioBySlug(slug);
  if (item) {
    let technologies: string[] = [];
    try { technologies = JSON.parse(item.technologies || "[]"); } catch {}
    let gallery: string[] = [];
    try { gallery = JSON.parse(item.gallery_urls || "[]"); } catch {}

    return (
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </Link>
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">{item.category}</Badge>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-white mb-6">{item.title}</h1>
          {item.client_name && <p className="text-muted-foreground text-lg mb-8">Client: {item.client_name}</p>}
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">{item.description}</p>
          {technologies.length > 0 && (
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="border-primary/30 text-primary">{tech}</Badge>
                ))}
              </div>
            </div>
          )}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
            <img src={item.image_url} alt={item.title} className="object-cover w-full h-full" />
          </div>
          {gallery.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {gallery.map((url, i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
                  <img src={url} alt={`${item.title} gallery ${i + 1}`} className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-4 mt-8">
            {item.project_url && (
              <Button asChild size="lg">
                <a href={item.project_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" /> Take me to the website
                </a>
              </Button>
            )}
            <Button asChild size="lg" variant={item.project_url ? "outline" : "default"}>
              <Link href="/contact">
                {!item.project_url && <ExternalLink className="h-4 w-4 mr-2" />} Get a Similar Website
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const categories = await getPortfolioCategories();
  const normalizedCategory = categories.find(c => c.toLowerCase() === slug.toLowerCase());
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