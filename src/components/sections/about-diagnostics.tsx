"use client";

import { motion } from "framer-motion";

export function AboutDiagnostics() {
  return (
    <section className="w-full py-16 bg-[#050505] border-t border-[#7B6A60]/20 relative select-none">
      <div className="absolute inset-0 tech-grid opacity-[0.08] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        
        {/* Section title */}
        <div className="mb-12">
          <span className="font-mono text-xs text-[#7B6A60] tracking-[0.3em] uppercase block mb-2">
            // DOCUMENTATION_CORE
          </span>
          <h2 className="display-title text-[#F5F2EE]">
            MORE THAN A SERVICE PROVIDER
          </h2>
        </div>

        {/* Diagnostics Box (Control Room rack style) */}
        <div className="border border-[#7B6A60]/30 bg-[#080808] p-6 md:p-8 relative">
          
          {/* Corner brackets */}
          <span className="absolute -top-[1px] -left-[1px] w-[8px] h-[8px] border-t-2 border-l-2 border-[#D86B2A]" />
          <span className="absolute -top-[1px] -right-[1px] w-[8px] h-[8px] border-t-2 border-r-2 border-[#D86B2A]" />
          <span className="absolute -bottom-[1px] -left-[1px] w-[8px] h-[8px] border-b-2 border-l-2 border-[#D86B2A]" />
          <span className="absolute -bottom-[1px] -right-[1px] w-[8px] h-[8px] border-b-2 border-r-2 border-[#D86B2A]" />

          {/* Diagnostic Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#7B6A60]/20 pb-4 mb-8 font-mono text-[10px] text-[#7B6A60] gap-4">
            <div className="flex items-center gap-4">
              <span className="text-[#FFB36B] font-bold">MODULE // ABOUT_THE_SCENE</span>
              <span>VER // v2026.01</span>
            </div>
            <div className="flex items-center gap-6">
              <span>EST // 2026</span>
              <span className="flex items-center gap-1.5 text-[#D86B2A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D86B2A] animate-ping" />
                ONLINE_SYS
              </span>
            </div>
          </div>

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Mission (Monospaced HUD style) */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <div>
                <span className="font-mono text-[10px] text-[#7B6A60] tracking-widest block mb-2 uppercase">
                  [OPERATING_QUOTE]
                </span>
                <p className="font-sans text-2xl md:text-3xl font-black text-[#F5F2EE] tracking-wide leading-tight uppercase">
                  &ldquo;WE DON&apos;T JUST BUILD PRODUCTS. WE BUILD BUSINESSES.&rdquo;
                </p>
              </div>

              <div className="h-[1px] bg-[#7B6A60]/20" />

              <div>
                <span className="font-mono text-[10px] text-[#7B6A60] tracking-widest block mb-2 uppercase">
                  [OPERATING_STATEMENT]
                </span>
                <p className="font-mono text-xs text-[#7B6A60] leading-relaxed uppercase">
                  THE SCENE COMBINES DESIGN, TECHNOLOGY, STRATEGY AND PRODUCTION UNDER ONE ROOF. WHETHER YOU&apos;RE LAUNCHING A STARTUP, SCALING AN ESTABLISHED COMPANY OR CREATING UNFORGETTABLE EVENTS, WE DESIGN SOLUTIONS THAT WORK TOGETHER. EVERY WEBSITE. EVERY CAMPAIGN. EVERY APPLICATION. EVERY EXPERIENCE. BUILT WITH PURPOSE.
                </p>
              </div>
            </div>

            {/* Right Column: Values & Core Diagnostics (Patch rack panel style) */}
            <div className="md:col-span-5 flex flex-col gap-4 bg-[#050505] p-5 border border-[#7B6A60]/20">
              <span className="font-mono text-[10px] text-[#FFB36B] tracking-widest block mb-1 uppercase font-bold">
                // SYSTEM_CORES:
              </span>

              {/* Diagnostic Items */}
              <div className="flex flex-col gap-3 font-mono text-xs text-[#7B6A60]">
                
                {/* Core 1 */}
                <div className="flex items-center justify-between border-b border-[#7B6A60]/10 pb-2">
                  <span>01 // CREATIVE TECHNOLOGY</span>
                  <span className="text-[#D86B2A] font-bold">[SYS_OPTIMAL]</span>
                </div>
                
                {/* Core 2 */}
                <div className="flex items-center justify-between border-b border-[#7B6A60]/10 pb-2">
                  <span>02 // SOFTWARE DEVELOPMENT</span>
                  <span className="text-[#D86B2A] font-bold">[SYS_OPTIMAL]</span>
                </div>

                {/* Core 3 */}
                <div className="flex items-center justify-between border-b border-[#7B6A60]/10 pb-2">
                  <span>03 // DIGITAL MARKETING</span>
                  <span className="text-[#D86B2A] font-bold">[SYS_OPTIMAL]</span>
                </div>

                {/* Core 4 */}
                <div className="flex items-center justify-between">
                  <span>04 // EVENT PRODUCTION</span>
                  <span className="text-[#D86B2A] font-bold">[SYS_ACTIVE]</span>
                </div>

              </div>

              {/* Progress bars representing values */}
              <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-[#7B6A60]/20">
                <div>
                  <div className="flex justify-between font-mono text-[9px] text-[#7B6A60] mb-1">
                    <span>CREATIVE_INTEGRITY</span>
                    <span>100%</span>
                  </div>
                  <div className="h-1.5 bg-[#7B6A60]/20">
                    <div className="h-full bg-[#D86B2A] w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-mono text-[9px] text-[#7B6A60] mb-1">
                    <span>TECHNOLOGY_INTEGRATION</span>
                    <span>100%</span>
                  </div>
                  <div className="h-1.5 bg-[#7B6A60]/20">
                    <div className="h-full bg-[#D86B2A] w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-mono text-[9px] text-[#7B6A60] mb-1">
                    <span>PRODUCTION_DURABILITY</span>
                    <span>100%</span>
                  </div>
                  <div className="h-1.5 bg-[#7B6A60]/20">
                    <div className="h-full bg-[#D86B2A] w-full" />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
