"use client";

import { useState } from "react";
import Link from "next/link";
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
      {/* Filter pills */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setFilter("All")}
            className={filter === "All" ? "btn-primary-figma text-sm" : "btn-secondary-figma text-sm"}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={filter === cat ? "btn-primary-figma text-sm" : "btn-secondary-figma text-sm"}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="body-figma text-ink/50">No projects in this category yet.</p>
        </div>
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
                className="group block bg-canvas border border-hairline rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              >
                <div className="relative h-52 w-full overflow-hidden bg-surface-soft">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.is_featured === 1 && (
                    <div className="absolute top-3 left-3 bg-ink text-canvas caption-mono px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="caption-mono text-ink/40 mb-2">{item.category}</div>
                  <h3 className="text-ink font-bold mb-2 group-hover:underline transition-all" style={{ fontSize: 20, fontWeight: 540, lineHeight: 1.35 }}>
                    {item.title}
                  </h3>
                  <p className="body-sm-figma text-ink/65 line-clamp-2">{item.description}</p>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      )}
    </div>
  );
}
