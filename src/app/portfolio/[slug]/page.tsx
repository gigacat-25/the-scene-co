import { getPortfolioBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
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
  if (!item) return { title: "Not Found" };
  return {
    title: `${item.title} — The Scene Co.`,
    description: item.description,
  };
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);
  if (!item) notFound();

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

        <div className="flex gap-4 mt-8">
          <Button asChild size="lg">
            <Link href="/contact">
              <ExternalLink className="h-4 w-4 mr-2" /> Get a Similar Website
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
