"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  image_url: string;
  is_featured: number;
}

interface PortfolioGridProps {
  items: PortfolioItem[];
  categories: string[];
  activeCategory?: string;
}

export function PortfolioGrid({ items, categories, activeCategory }: PortfolioGridProps) {
  const [filter, setFilter] = useState(activeCategory || "All");

  const filtered = filter === "All" ? items : items.filter((item) => item.category === filter);

  return (
    <div>
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Badge
            variant={filter === "All" ? "default" : "outline"}
            className="cursor-pointer px-4 py-1.5 text-sm"
            onClick={() => setFilter("All")}
          >
            All
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              className="cursor-pointer px-4 py-1.5 text-sm"
              onClick={() => setFilter(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No projects in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, index) => (
            <AnimateOnScroll
              key={item.id}
              animationClass="animate-slide-in-up"
              hiddenClass="opacity-0"
              delay={`${index * 0.1}s`}
            >
              <Link
                href={`/portfolio/${item.slug}`}
                className="group block bg-secondary/20 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {item.is_featured === 1 && (
                    <Badge className="absolute top-3 left-3 bg-primary/90">Featured</Badge>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-headline text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      )}
    </div>
  );
}
