"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

// Pool of images — each cell will cycle through these
const imagePool = [
  { src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=600&q=80", alt: "Custom Website Design" },
  { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80", alt: "E-Commerce Store" },
  { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80", alt: "Analytics Dashboard" },
  { src: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=600&q=80", alt: "POS System" },
  { src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80", alt: "Mobile App" },
  { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80", alt: "Business Meeting" },
  { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80", alt: "Web Development" },
  { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80", alt: "Data Analytics" },
  { src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80", alt: "Online Shopping" },
  { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80", alt: "Professional" },
  { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80", alt: "Team Work" },
  { src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80", alt: "Design Process" },
];

// 7 cells — each starts at a different offset in the pool so they show different images
const CELL_COUNT = 7;
const initialOffsets = [0, 3, 6, 9, 1, 4, 7];

function ImageCell({
  imageIndex,
  className,
}: {
  imageIndex: number;
  className?: string;
}) {
  const [current, setCurrent] = useState(imageIndex % imagePool.length);
  const [next, setNext] = useState((imageIndex + 1) % imagePool.length);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    // Random interval between 3–6s so cells don't all flip together
    const delay = 3000 + Math.random() * 3000;
    const timer = setInterval(() => {
      setFlipping(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % imagePool.length);
        setNext((n) => (n + 1) % imagePool.length);
        setFlipping(false);
      }, 600);
    }, delay);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`} style={{ perspective: "1000px" }}>
      {/* Current image */}
      <img
        src={imagePool[current].src}
        alt={imagePool[current].alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: "opacity 0.6s ease, transform 0.6s ease",
          opacity: flipping ? 0 : 1,
          transform: flipping ? "scale(1.06)" : "scale(1)",
        }}
      />
      {/* Next image (fades in as current fades out) */}
      <img
        src={imagePool[next].src}
        alt={imagePool[next].alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: "opacity 0.6s ease, transform 0.6s ease",
          opacity: flipping ? 1 : 0,
          transform: flipping ? "scale(1)" : "scale(0.97)",
        }}
      />
    </div>
  );
}

export function Hero() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "88vh", background: "#111" }}
    >
      {/* ── Mosaic grid ── */}
      <div
        className="absolute inset-0 flex gap-2 p-2"
        style={{ opacity: isPaused ? 0.7 : 1, transition: "opacity 0.4s" }}
      >
        {/* Column 1 — narrow, two stacked cells */}
        <div className="flex flex-col gap-2 w-[13%] shrink-0">
          <ImageCell imageIndex={0} className="flex-[3]" />
          <ImageCell imageIndex={5} className="flex-[2]" />
        </div>

        {/* Column 2 — medium, two stacked cells */}
        <div className="flex flex-col gap-2 w-[20%] shrink-0">
          <ImageCell imageIndex={1} className="flex-[2]" />
          {/* Color block below */}
          <div className="flex-[1] rounded-lg flex items-center justify-center p-4" style={{ background: "#dceeb1" }}>
            <div className="text-center">
              <div className="caption-mono text-ink/50 mb-1 text-xs">SERVICES</div>
              <div className="font-bold text-ink text-sm">Websites</div>
            </div>
          </div>
        </div>

        {/* Column 3 — wide, tall single + color block */}
        <div className="flex flex-col gap-2 w-[18%] shrink-0">
          <ImageCell imageIndex={2} className="flex-[3]" />
          <div className="flex-[1] rounded-lg flex items-center justify-center p-4" style={{ background: "#c5b0f4" }}>
            <div className="text-center">
              <div className="caption-mono text-ink/50 mb-1 text-xs">GALLERY</div>
              <div className="font-bold text-ink text-sm">Our Work</div>
            </div>
          </div>
        </div>

        {/* Column 4 — space for floating card (1 tall cell, muted) */}
        <div className="flex flex-col gap-2 w-[22%] shrink-0">
          <ImageCell imageIndex={3} className="flex-1" />
        </div>

        {/* Column 5 — two stacked cells */}
        <div className="flex flex-col gap-2 flex-1 shrink-0">
          <ImageCell imageIndex={4} className="flex-[2]" />
          <div className="flex-[1] rounded-lg flex items-center justify-center p-4" style={{ background: "#1f1d3d" }}>
            <div className="text-center">
              <div className="caption-mono text-white/50 mb-1 text-xs">FULL STACK</div>
              <div className="font-bold text-white text-sm">End-to-End</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      {/* ── Floating card ── */}
      <div className="relative z-10 flex items-center justify-center min-h-[88vh] px-4">
        <div
          className="bg-canvas rounded-2xl p-8 md:p-12 w-full max-w-xl shadow-2xl"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
        >
          <h1
            className="text-ink leading-tight mb-6"
            style={{
              fontSize: "clamp(30px, 4.5vw, 56px)",
              fontWeight: 340,
              lineHeight: 1.05,
              letterSpacing: "-1px",
            }}
          >
            Build anything possible,
            <br />
            <span style={{ fontWeight: 700 }}>zero templates.</span>
          </h1>
          <p
            className="text-ink/70 mb-8 leading-relaxed"
            style={{ fontSize: 17, fontWeight: 320, lineHeight: 1.55 }}
          >
            Custom websites, e-commerce stores, and POS systems — built from scratch with a CMS you control.{" "}
            <span className="text-ink font-medium">1&nbsp;year free hosting included.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="btn-primary-figma text-center">
              Get a Free Quote
            </Link>
            <Link href="/pricing" className="btn-secondary-figma text-center">
              View Pricing
            </Link>
          </div>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="btn-icon-circular-inverse"
          aria-label={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>

      {/* ── Hint label ── */}
      {isPaused && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 caption-mono text-white/60 bg-black/40 px-4 py-1.5 rounded-full">
          Paused
        </div>
      )}
    </section>
  );
}
