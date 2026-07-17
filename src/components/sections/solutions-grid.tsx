"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const solutions = [
  "01 Discover — Understanding your business goals.",
  "02 Design — Creating intuitive experiences.",
  "03 Develop — Building scalable technology.",
  "04 Launch — Deploying with confidence.",
  "05 Grow — Continuous optimization and support."
];

const mockScreens = [
  {
    id: 1,
    tag: "FEED_01 // DISCOVER_DESIGN",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    className: "absolute w-[70%] aspect-[1.3] border-2 border-[#7B6A60]/40 bg-[#050505] top-0 left-0 z-10 shadow-2xl group-hover:translate-x-2 transition-transform duration-300",
  },
  {
    id: 2,
    tag: "FEED_02 // DEVELOP_STAGE",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
    className: "absolute w-[70%] aspect-[1.3] border-2 border-[#D86B2A]/50 bg-[#050505] top-[20%] right-0 z-20 shadow-2xl group-hover:scale-105 transition-transform duration-300",
  },
  {
    id: 3,
    tag: "FEED_03 // LAUNCH_OPTIMIZE",
    img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=600&q=80",
    className: "absolute w-[70%] aspect-[1.3] border-2 border-[#FFB36B]/50 bg-[#050505] bottom-0 left-[15%] z-30 shadow-2xl group-hover:-translate-x-2 transition-transform duration-300",
  }
];

export function SolutionsGrid() {
  return (
    <section className="w-full py-20 bg-[#050505] border-t border-[#7B6A60]/20 relative overflow-hidden select-none">
      <div className="absolute inset-0 tech-grid opacity-[0.08] pointer-events-none" />

      {/* Moving slow orange light glow */}
      <motion.div
        className="absolute w-[50vw] h-[50vw] rounded-full bg-[#D86B2A]/5 blur-[100px] pointer-events-none z-[1] left-1/3 bottom-10"
        animate={{
          x: ["-20%", "20%", "-10%", "10%", "-20%"],
          y: ["-10%", "10%", "20%", "-20%", "-10%"],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* LEFT COLUMN: PITCH & CHECKBOXES */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-[#7B6A60] tracking-[0.3em] uppercase block mb-1">
              // PRODUCTION_PIPELINE
            </span>
            <h2 className="display-title text-[#F5F2EE]">
              HOW WE BUILD SUCCESS
            </h2>
            <p className="font-mono text-xs text-[#7B6A60] leading-relaxed uppercase max-w-md mt-2">
              OUR INTENTIONAL DEPLOYMENT ROADMAP IS BUILT TO ENGAGE AUDIENCES AND DEPLOY CLEAN ARCHITECTURE RACKS FROM SCRATCH.
            </p>
          </div>

          {/* Checklist */}
          <ul className="flex flex-col gap-4 w-full">
            {solutions.map((sol, i) => (
              <motion.li 
                key={i} 
                className="flex items-center gap-4 font-mono text-xs text-[#F5F2EE] uppercase"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="w-5 h-5 border border-[#D86B2A] flex items-center justify-center bg-[#D86B2A]/10 text-[#D86B2A] shrink-0">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </div>
                <span className="tracking-wide">{sol}</span>
              </motion.li>
            ))}
          </ul>

          {/* Button CTA */}
          <div className="mt-4">
            <Link
              href="/portfolio"
              className="group relative border border-[#D86B2A] bg-transparent text-[#D86B2A] hover:bg-[#D86B2A] hover:text-[#050505] font-mono text-[10px] tracking-[0.25em] px-6 py-3.5 uppercase font-bold transition-all duration-300 flex items-center gap-2"
            >
              {/* Corner ticks */}
              <span className="absolute -top-[1.5px] -left-[1.5px] w-[4px] h-[4px] bg-[#D86B2A] group-hover:bg-[#050505]" />
              <span className="absolute -top-[1.5px] -right-[1.5px] w-[4px] h-[4px] bg-[#D86B2A] group-hover:bg-[#050505]" />
              <span className="absolute -bottom-[1.5px] -left-[1.5px] w-[4px] h-[4px] bg-[#D86B2A] group-hover:bg-[#050505]" />
              <span className="absolute -bottom-[1.5px] -right-[1.5px] w-[4px] h-[4px] bg-[#D86B2A] group-hover:bg-[#050505]" />
              VIEW OUR WORK →
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: OVERLAPPING CRT SCREENS */}
        <div className="lg:col-span-6 flex items-center justify-center relative min-h-[350px] sm:min-h-[460px] group w-full">
          {mockScreens.map((scr) => (
            <div key={scr.id} className={scr.className}>
              {/* Screen outer border and ticks */}
              <div className="relative w-full h-full p-1 bg-[#080808] flex flex-col justify-between overflow-hidden group/screen">
                
                {/* CRT Glass curvature overlay */}
                <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20 z-20" />
                <div className="absolute inset-0 bg-[#050505]/40 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

                {/* Screen Header */}
                <div className="flex justify-between items-center font-mono text-[6px] sm:text-[8px] text-[#7B6A60] border-b border-[#7B6A60]/10 pb-1 mb-1 relative z-10 px-1 uppercase">
                  <span>{scr.tag}</span>
                  <span className="text-[#FFB36B]">[PIPELINE_OK]</span>
                </div>

                {/* Image panel */}
                <div className="flex-grow w-full relative overflow-hidden bg-[#050505]">
                  <img
                    src={scr.img}
                    alt="Mock Screen"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale opacity-60 group-hover/screen:grayscale-0 group-hover/screen:opacity-100 transition-all duration-500 scale-100 group-hover/screen:scale-105"
                  />
                  {/* VHS static overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover/screen:opacity-[0.08] transition-opacity duration-300 z-20"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                  />
                </div>

                {/* Screen footer */}
                <div className="flex justify-between items-center font-mono text-[6px] sm:text-[8px] text-[#7B6A60] border-t border-[#7B6A60]/10 pt-1 mt-1 relative z-10 px-1 uppercase">
                  <span>STAGE: ACTIVE</span>
                  <span className="text-[#D86B2A]">[ENGAGED]</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
