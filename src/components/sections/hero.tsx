"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero({ settings }: { settings?: Record<string, string> }) {
  const [timecode, setTimecode] = useState("00:00:00:00");

  // Timecode generator
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      const f = String(Math.floor(Math.random() * 25)).padStart(2, "0");
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 40); // 25fps timecode
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[#050505] flex items-center pt-24 pb-16 px-4 md:px-8 overflow-hidden select-none border-b border-[#7B6A60]/20">
      
      {/* HUD grid lines */}
      <div className="absolute inset-0 tech-grid opacity-[0.12] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-spotlight opacity-[0.25] pointer-events-none" />

      {/* Moving slow orange light glow */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] rounded-full bg-[#D86B2A]/10 blur-[130px] pointer-events-none z-[1] right-0 top-1/4"
        animate={{
          x: ["10%", "-10%", "5%", "-5%", "10%"],
          y: ["-5%", "5%", "10%", "-10%", "-5%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: BRAND TEXT & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          
          {/* Tagline / Top Tag */}
          <div className="flex items-center gap-2 border border-[#7B6A60]/30 px-3 py-1 bg-[#080808]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D86B2A] animate-pulse" />
            <span className="font-mono text-[9px] text-[#FFB36B] tracking-[0.15em] uppercase font-bold">
              CREATIVE TECHNOLOGY • SOFTWARE • DIGITAL MARKETING • EVENTS
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl font-black text-[#F5F2EE] tracking-[0.05em] leading-[0.95] uppercase">
            BUILDING
            <br />
            DIGITAL
            <br />
            EXPERIENCES
            <br />
            THAT GROW
            <br />
            <span className="text-[#D86B2A]">BUSINESSES.</span>
          </h1>

          {/* Description / Sub Heading */}
          <p className="max-w-xl font-mono text-xs md:text-sm text-[#7B6A60] tracking-wide leading-relaxed uppercase">
            FROM BEAUTIFUL WEBSITES AND POWERFUL SOFTWARE TO DIGITAL MARKETING, AI AUTOMATION AND UNFORGETTABLE EVENTS. WE CREATE COMPLETE BUSINESS ECOSYSTEMS DESIGNED FOR GROWTH.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              href="/contact"
              className="group relative border border-[#D86B2A] bg-[#D86B2A] text-[#050505] hover:bg-transparent hover:text-[#D86B2A] font-mono text-[11px] tracking-[0.2em] px-6 py-4 uppercase font-bold transition-all duration-300 min-w-[180px] text-center"
            >
              {/* Corner ticks */}
              <span className="absolute -top-[1.5px] -left-[1.5px] w-[4px] h-[4px] bg-[#050505] group-hover:bg-[#D86B2A]" />
              <span className="absolute -top-[1.5px] -right-[1.5px] w-[4px] h-[4px] bg-[#050505] group-hover:bg-[#D86B2A]" />
              <span className="absolute -bottom-[1.5px] -left-[1.5px] w-[4px] h-[4px] bg-[#050505] group-hover:bg-[#D86B2A]" />
              <span className="absolute -bottom-[1.5px] -right-[1.5px] w-[4px] h-[4px] bg-[#050505] group-hover:bg-[#D86B2A]" />
              START YOUR PROJECT →
            </Link>

            <Link
              href="/portfolio"
              className="group relative border border-[#7B6A60]/40 text-[#7B6A60] hover:text-[#D86B2A] hover:border-[#D86B2A] font-mono text-[11px] tracking-[0.2em] px-6 py-4 uppercase font-bold transition-all duration-300 min-w-[180px] text-center"
            >
              VIEW OUR WORK →
            </Link>
          </div>

          {/* Happy clients indicator */}
          <div className="flex items-center gap-4 mt-6 border-t border-[#7B6A60]/10 pt-6 w-full">
            {/* Visual patch indicator */}
            <div className="flex -space-x-2.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border border-[#050505] bg-[#7B6A60]/30 flex items-center justify-center font-mono text-[9px] text-[#F5F2EE] font-bold">
                  U0{i}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border border-[#050505] bg-[#D86B2A]/20 flex items-center justify-center font-mono text-[10px] text-[#D86B2A] font-black">
                +
              </div>
            </div>

            <div>
              <span className="block font-mono text-xs text-[#F5F2EE] font-bold tracking-wider">
                200+ HAPPY BRAND CLIENTS
              </span>
              <span className="font-mono text-[9px] text-[#7B6A60] tracking-widest uppercase">
                SIGNAL RATINGS: ★★★★★ [4.9/5]
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CSS 3D LAPTOP WITH CRT SCREEN */}
        <div className="lg:col-span-5 flex items-center justify-center relative mt-8 lg:mt-0">
          
          {/* Laptop 3D Glow ambient */}
          <div className="absolute w-[110%] h-[110%] bg-[#D86B2A]/5 blur-[60px] rounded-full pointer-events-none" />

          {/* Interactive Laptop device */}
          <div className="relative w-full max-w-[460px] aspect-[1.6] bg-[#111111] border border-[#7B6A60]/40 p-2 shadow-2xl flex flex-col justify-between">
            {/* Corner HUD markers on laptop screen border */}
            <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#7B6A60]/50" />
            <span className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#7B6A60]/50" />

            {/* Screen bezel */}
            <div className="w-full h-[93%] bg-[#080808] border border-[#7B6A60]/20 p-2 relative overflow-hidden flex flex-col justify-between">
              
              {/* Screen overlay lines */}
              <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-20 z-20" />
              <div className="absolute inset-0 bg-[#050505] opacity-5 z-10 pointer-events-none" />

              {/* CRT monitor dashboard content */}
              <div className="relative z-10 w-full h-full flex flex-col justify-between font-mono text-[8px] text-[#7B6A60] uppercase p-1">
                
                {/* Screen Header */}
                <div className="flex justify-between items-center border-b border-[#7B6A60]/20 pb-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#D86B2A] rounded-full animate-ping" />
                    <span className="text-[#D86B2A] font-bold">MON_01 // SYSTEM_DASHBOARD</span>
                  </div>
                  <span>TC {timecode}</span>
                </div>

                {/* Main Screen graphic feed */}
                <div className="flex-grow grid grid-cols-3 gap-2 py-1 items-stretch">
                  
                  {/* Left panel: Signal specs */}
                  <div className="border border-[#7B6A60]/20 bg-[#050505] p-1.5 flex flex-col justify-between text-[7px] leading-relaxed">
                    <div>
                      <span className="text-[#FFB36B] font-bold block mb-0.5">[SYS_INGEST]</span>
                      <span>SRC: SCENE_MAIN<br />RESL: 1080P<br />RATE: 60FPS</span>
                    </div>
                    <div>
                      <span className="text-[#D86B2A] font-bold block mb-0.5">[SYS_RACK]</span>
                      <span>NODE: ACTIVE<br />DB_CONN: SECURE</span>
                    </div>
                  </div>

                  {/* Center panel: System status dashboard list */}
                  <div className="col-span-2 border border-[#7B6A60]/20 bg-[#050505] p-2 flex flex-col items-stretch justify-center relative overflow-hidden text-[7px] leading-normal font-bold">
                    <div className="absolute inset-0 tech-grid opacity-5" />
                    
                    <div className="z-10 w-full flex flex-col font-mono text-[#D86B2A]">
                      <div className="flex justify-between"><span>WEBSITE</span><span className="text-[#FFB36B]">........ ONLINE</span></div>
                      <div className="flex justify-between"><span>SOFTWARE</span><span className="text-[#FFB36B]">....... ACTIVE</span></div>
                      <div className="flex justify-between"><span>MARKETING</span><span className="text-[#FFB36B]">...... RUNNING</span></div>
                      <div className="flex justify-between"><span>SEO</span><span className="text-[#FFB36B]">............ OPTIMIZED</span></div>
                      <div className="flex justify-between"><span>EVENTS</span><span className="text-[#FFB36B]">......... LIVE</span></div>
                      <div className="flex justify-between"><span>HOSTING</span><span className="text-[#FFB36B]">........ SECURE</span></div>
                      <div className="flex justify-between"><span>AI</span><span className="text-[#FFB36B]">............. CONNECTED</span></div>
                    </div>
                  </div>
                </div>

                {/* Screen Footer */}
                <div className="flex justify-between items-center border-t border-[#7B6A60]/20 pt-1.5 mt-1.5 text-[7px]">
                  <span>VTR_MODEL // VHS_SYS_2026</span>
                  <span className="text-[#D86B2A] font-bold">[ONLINE]</span>
                </div>
              </div>

            </div>

            {/* Keyboard base tray */}
            <div className="absolute -bottom-3.5 left-[-4%] right-[-4%] h-3.5 bg-[#0a0a0a] border border-[#7B6A60]/40 border-t-[#222] shadow-2xl flex flex-col justify-between">
              {/* Keyboard backlit strip */}
              <div className="w-full h-[1px] bg-[#D86B2A]/40" />
              {/* Trackpad */}
              <div className="w-12 h-1.5 bg-[#151515] border border-[#7B6A60]/30 mx-auto rounded-sm mb-0.5" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
