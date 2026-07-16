"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, SkipBack, SkipForward } from "lucide-react";

interface TestimonialItem {
  id?: number;
  name: string;
  role?: string;
  company?: string;
  quote?: string;
  review?: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials?: TestimonialItem[];
}

const defaultTestimonials: TestimonialItem[] = [
  {
    name: "ARJUN MEHTA",
    role: "FOUNDER",
    company: "VERTEX APPAREL",
    review: "THE SCENE DEPLOYED A COMPLETE BUSINESS ECOSYSTEM FOR OUR STORE AND INVENTORY SYSTEM. THE RELIABILITY OF THEIR SOFTWARE AND THE ATTENTION TO CORE DESIGN PRINCIPLES HELPED US SCALE SALES 3X WITHIN THE FIRST QUARTER.",
    rating: 5,
  },
  {
    name: "PRIYA SHARMA",
    role: "DIRECTOR",
    company: "APEX MEDICAL CENTER",
    review: "THEIR PROFESSIONALISM AND LONG-TERM MAINTENANCE SUPPORT ARE OUTSTANDING. THEY BUILT A SECURE WEB EXPERIENCE FOR OUR DOCTORS AND PATIENTS, ENSURING TOTAL SYSTEM UPTIME AND ZERO LATENCY.",
    rating: 5,
  },
  {
    name: "ROHAN VERMA",
    role: "HEAD OF EVENTS",
    company: "ELEVATE GLOBAL",
    review: "FROM MASSIVE WEB PLATFORMS TO FLUID EVENT TECHNICAL PRODUCTION, THE SCENE HANDLED EVERYTHING UNDER ONE ROOF. EXPERT EXECUTION, BOLD DESIGN, AND MEASURABLE ORGANIC GROWTH.",
    rating: 5,
  },
];

export function Testimonials({ testimonials }: TestimonialsProps) {
  const items = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const current = items[activeIndex];

  return (
    <section className="w-full py-16 bg-[#050505] border-t border-[#7B6A60]/20 relative select-none">
      <div className="absolute inset-0 tech-grid opacity-[0.08] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <span className="font-mono text-xs text-[#7B6A60] tracking-[0.3em] uppercase block mb-2">
            // TELEMETRY_FEEDBACK
          </span>
          <h2 className="display-title text-[#F5F2EE]">
            WHAT OUR CLIENTS SAY
          </h2>
        </div>

        {/* Mock CRT Monitor Frame */}
        <div className="relative border-4 border-[#7B6A60]/50 bg-[#080808] p-4 md:p-8 aspect-[16/9] flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          
          {/* CRT Screen curvature overlay reflection */}
          <div className="absolute inset-0 bg-radial-spotlight pointer-events-none z-20 opacity-30 mix-blend-overlay" />
          
          {/* Top screen indicators */}
          <div className="flex justify-between items-center font-mono text-[10px] text-[#7B6A60] border-b border-[#7B6A60]/20 pb-3 z-10">
            <div className="flex items-center gap-4">
              <span className="text-[#D86B2A] font-bold flex items-center gap-1.5">
                <Play className="h-3 w-3 fill-[#D86B2A] text-[#D86B2A]" />
                PLAY ⏵
              </span>
              <span>INDEX // 0{activeIndex + 1}</span>
            </div>
            <div>
              <span>TAPE CH_0{activeIndex + 1}</span>
            </div>
          </div>

          {/* Video Noise lines */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.08] z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Center Space: Large Orange Quotes & Subtitle text */}
          <div className="flex-grow flex flex-col items-center justify-center text-center px-4 md:px-16 py-6 z-10 relative">
            
            {/* Animated Subtitle box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col items-center gap-4"
              >
                {/* Large Orange Quote Mark */}
                <span className="text-5xl md:text-7xl font-sans text-[#D86B2A] leading-none select-none font-bold">
                  “
                </span>

                {/* Subtitle text: White with transparent black outline effect */}
                <p className="font-sans text-lg md:text-2xl font-bold text-[#F5F2EE] leading-relaxed uppercase max-w-3xl tracking-wide select-none">
                  {current.quote || current.review}
                </p>

                {/* Meta details resembling technical caption logs */}
                <div className="mt-4 font-mono text-[10px] text-[#7B6A60] tracking-widest uppercase flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                  <span className="text-[#FFB36B] font-bold">{current.name}</span>
                  <span className="hidden sm:inline">//</span>
                  <span>{current.role} @ {current.company}</span>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Bottom Screen Deck Controls (Forward / Rewind switcher buttons) */}
          <div className="flex justify-between items-center border-t border-[#7B6A60]/20 pt-4 z-10">
            <div className="font-mono text-[9px] text-[#7B6A60] uppercase">
              DECK_MODEL: SCENE_VTR_2026
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={prevTestimonial}
                className="w-8 h-8 border border-[#7B6A60]/40 flex items-center justify-center text-[#7B6A60] hover:text-[#D86B2A] hover:border-[#D86B2A] transition-colors"
                aria-label="Rewind"
              >
                <SkipBack className="h-4 w-4" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-8 h-8 border border-[#7B6A60]/40 flex items-center justify-center text-[#7B6A60] hover:text-[#D86B2A] hover:border-[#D86B2A] transition-colors"
                aria-label="Fast Forward"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
