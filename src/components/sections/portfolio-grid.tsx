"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  image_url: string;
  is_featured: number;
  project_url?: string;
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
    <div className="select-none">
      {/* Patch Panel Filter Buttons */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-12 justify-center md:justify-start">
          <button
            onClick={() => setFilter("All")}
            className={`font-mono text-xs tracking-widest px-5 py-2.5 transition-all duration-300 relative border ${
              filter === "All"
                ? "bg-[#D86B2A] border-[#D86B2A] text-[#050505] font-bold shadow-[0_0_12px_rgba(216,107,42,0.3)]"
                : "bg-transparent border-[#7B6A60]/30 text-[#7B6A60] hover:text-[#F5F2EE] hover:border-[#F5F2EE]"
            }`}
          >
            {/* L-brackets on active */}
            {filter === "All" && (
              <>
                <span className="absolute -top-[1px] -left-[1px] w-[4px] h-[4px] bg-[#050505]" />
                <span className="absolute -top-[1px] -right-[1px] w-[4px] h-[4px] bg-[#050505]" />
                <span className="absolute -bottom-[1px] -left-[1px] w-[4px] h-[4px] bg-[#050505]" />
                <span className="absolute -bottom-[1px] -right-[1px] w-[4px] h-[4px] bg-[#050505]" />
              </>
            )}
            [ALL]
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-xs tracking-widest px-5 py-2.5 transition-all duration-300 relative border ${
                filter === cat
                  ? "bg-[#D86B2A] border-[#D86B2A] text-[#050505] font-bold shadow-[0_0_12px_rgba(216,107,42,0.3)]"
                  : "bg-transparent border-[#7B6A60]/30 text-[#7B6A60] hover:text-[#F5F2EE] hover:border-[#F5F2EE]"
              }`}
            >
              {filter === cat && (
                <>
                  <span className="absolute -top-[1px] -left-[1px] w-[4px] h-[4px] bg-[#050505]" />
                  <span className="absolute -top-[1px] -right-[1px] w-[4px] h-[4px] bg-[#050505]" />
                  <span className="absolute -bottom-[1px] -left-[1px] w-[4px] h-[4px] bg-[#050505]" />
                  <span className="absolute -bottom-[1px] -right-[1px] w-[4px] h-[4px] bg-[#050505]" />
                </>
              )}
              [{cat.toUpperCase()}]
            </button>
          ))}
        </div>
      )}

      {/* Grid of Broadcast Portfolio cards */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-[#7B6A60]/20 bg-[#080808]">
          <p className="font-mono text-xs text-[#7B6A60] uppercase tracking-widest">// NO ACTIVE FEED DETECTED</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative border border-[#7B6A60]/20 hover:border-[#D86B2A] bg-[#050505] overflow-hidden aspect-[4/3] flex flex-col justify-end"
              >
                {/* L-brackets on card corners */}
                <span className="absolute -top-[1px] -left-[1px] w-[5px] h-[5px] border-t border-l border-[#7B6A60]/30 group-hover:border-[#D86B2A] transition-colors z-25" />
                <span className="absolute -top-[1px] -right-[1px] w-[5px] h-[5px] border-t border-r border-[#7B6A60]/30 group-hover:border-[#D86B2A] transition-colors z-25" />
                <span className="absolute -bottom-[1px] -left-[1px] w-[5px] h-[5px] border-b border-l border-[#7B6A60]/30 group-hover:border-[#D86B2A] transition-colors z-25" />
                <span className="absolute -bottom-[1px] -right-[1px] w-[5px] h-[5px] border-b border-r border-[#7B6A60]/30 group-hover:border-[#D86B2A] transition-colors z-25" />

                <Link href={`/portfolio/${item.slug}`} className="absolute inset-0 z-10 block">
                  {/* Image container with 3px shift on hover */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden transition-mechanical group-hover:translate-x-[3px] group-hover:translate-y-[3px]">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform duration-500 scale-100 group-hover:scale-105"
                    />

                    {/* Gradient overlay to protect typography readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                  </div>

                  {/* Active Scanline layer on hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-transparent via-[#D86B2A]/5 to-transparent h-12 w-full animate-scanline-wipe z-20" 
                       style={{ animationDuration: "1.2s" }} />
                  
                  {/* Active Noise static layer on hover */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-15 transition-opacity duration-300 z-20"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Top indicators */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    {item.is_featured === 1 && (
                      <span className="font-mono text-[9px] bg-primary text-white font-black px-2 py-0.5 tracking-wider uppercase">
                        [FEATURED]
                      </span>
                    )}
                    <span className="font-mono text-[9px] border border-zinc-700 text-zinc-300 bg-zinc-950/80 px-2 py-0.5 tracking-wider uppercase group-hover:border-primary group-hover:text-white transition-colors">
                      {item.category}
                    </span>
                  </div>

                  {/* Title: Bottom Left Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
                    <span className="block font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] mb-0.5">
                      FEED // ACQUIRED
                    </span>
                    <h3 className="font-sans text-xl sm:text-2xl font-black text-zinc-100 group-hover:text-white tracking-[0.03em] uppercase leading-none transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-400 group-hover:text-zinc-300 mt-1 line-clamp-2 uppercase tracking-wide leading-relaxed max-w-sm transition-colors">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
