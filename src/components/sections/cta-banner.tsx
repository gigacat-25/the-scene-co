"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Link from "next/link";

interface CtaBannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryText?: string;
  secondaryLink?: string;
  colorBlock?: string;
}

export function CtaBanner({
  title = "READY TO BUILD SOMETHING EXCEPTIONAL?",
  subtitle = "WHETHER YOU NEED A WEBSITE, SOFTWARE, MARKETING STRATEGY OR COMPLETE EVENT PRODUCTION, WE'RE READY TO BRING YOUR VISION TO LIFE.",
  ctaText = "LET'S TALK →",
  ctaLink = "/contact",
  secondaryText = "VIEW PORTFOLIO →",
  secondaryLink = "/portfolio",
  colorBlock
}: CtaBannerProps) {
  return (
    <section className="w-full py-16 bg-[#050505] border-t border-[#7B6A60]/20 relative select-none">
      <div className="absolute inset-0 tech-grid opacity-[0.08] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        {/* Outer Box */}
        <div className="border border-[#D86B2A]/40 bg-[#080808] p-8 relative flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Corner brackets */}
          <span className="absolute -top-[1.5px] -left-[1.5px] w-[6px] h-[6px] bg-[#D86B2A]" />
          <span className="absolute -top-[1.5px] -right-[1.5px] w-[6px] h-[6px] bg-[#D86B2A]" />
          <span className="absolute -bottom-[1.5px] -left-[1.5px] w-[6px] h-[6px] bg-[#D86B2A]" />
          <span className="absolute -bottom-[1.5px] -right-[1.5px] w-[6px] h-[6px] bg-[#D86B2A]" />

          {/* Left: Blinking Paper Plane transmitter node */}
          <div className="flex items-center gap-6 flex-1 max-w-3xl">
            
            {/* Transmitter icon */}
            <div className="w-14 h-14 border-2 border-[#D86B2A] rounded-full flex items-center justify-center bg-[#D86B2A]/10 text-[#D86B2A] relative shrink-0">
              <span className="absolute inset-[-4px] border border-[#D86B2A]/30 rounded-full animate-ping" />
              <Send className="h-6 w-6 -rotate-45" />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1.5 text-left">
              <span className="font-mono text-[9px] text-[#7B6A60] tracking-widest uppercase">
                // SYS_TRIGGER_INITIATED
              </span>
              <h3 className="font-sans text-xl sm:text-2xl md:text-3xl font-black text-[#F5F2EE] tracking-wide leading-none uppercase">
                {title.toUpperCase()}
              </h3>
              <p className="font-mono text-[10px] text-[#7B6A60] leading-relaxed uppercase">
                {subtitle.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Right: TRANSMIT Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto justify-end">
            <Link
              href={ctaLink}
              className="group relative border border-[#D86B2A] bg-[#D86B2A] text-[#050505] hover:bg-transparent hover:text-[#D86B2A] font-mono text-xs tracking-[0.2em] px-8 py-4 uppercase font-bold transition-all duration-300 min-w-[180px] text-center w-full sm:w-auto"
            >
              {/* Corner ticks */}
              <span className="absolute -top-[1.5px] -left-[1.5px] w-[4px] h-[4px] bg-[#050505] group-hover:bg-[#D86B2A]" />
              <span className="absolute -top-[1.5px] -right-[1.5px] w-[4px] h-[4px] bg-[#050505] group-hover:bg-[#D86B2A]" />
              <span className="absolute -bottom-[1.5px] -left-[1.5px] w-[4px] h-[4px] bg-[#050505] group-hover:bg-[#D86B2A]" />
              <span className="absolute -bottom-[1.5px] -right-[1.5px] w-[4px] h-[4px] bg-[#050505] group-hover:bg-[#D86B2A]" />
              {ctaText.toUpperCase()}
            </Link>

            <Link
              href={secondaryLink}
              className="group relative border border-[#7B6A60]/40 text-[#7B6A60] hover:text-[#D86B2A] hover:border-[#D86B2A] font-mono text-xs tracking-[0.2em] px-8 py-4 uppercase font-bold transition-all duration-300 min-w-[180px] text-center w-full sm:w-auto bg-transparent"
            >
              {secondaryText.toUpperCase()}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
