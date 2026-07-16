"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CrtPowerOn() {
  const [stage, setStage] = useState<"hidden" | "black" | "line" | "expand" | "flicker" | "complete">("hidden");
  
  useEffect(() => {
    // Only run on client side and check session storage
    if (typeof window !== "undefined") {
      const played = sessionStorage.getItem("crt_power_played");
      if (played === "true") {
        setStage("complete");
        return;
      }
      
      // Start sequence
      setStage("black");
      
      // Stage timeline
      const t1 = setTimeout(() => setStage("line"), 200);      // Horizontal line appears
      const t2 = setTimeout(() => setStage("expand"), 500);    // Line expands vertically
      const t3 = setTimeout(() => setStage("flicker"), 800);   // Static noise and logo flicker
      const t4 = setTimeout(() => {
        setStage("complete");
        sessionStorage.setItem("crt_power_played", "true");
      }, 2300);                                                // Power-on finished, reveal site

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, []);

  if (stage === "complete") return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-[#050505] z-[99999] flex items-center justify-center overflow-hidden select-none pointer-events-auto"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
        }}
      >
        {/* Stage 1: Line */}
        {stage === "line" && (
          <motion.div 
            className="w-full bg-white h-[2px] shadow-[0_0_12px_rgba(255,255,255,1)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        )}

        {/* Stage 2 & 3: Expand and Flicker */}
        {(stage === "expand" || stage === "flicker") && (
          <motion.div
            className="relative w-full h-full flex flex-col items-center justify-center"
            initial={{ scaleY: 0.005, opacity: 0.8 }}
            animate={{ 
              scaleY: 1, 
              opacity: 1 
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Moving scanlines inside the screen */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D86B2A]/5 to-transparent h-[40px] w-full pointer-events-none animate-scanline-wipe z-20" 
                 style={{ animationDuration: "1.5s" }} />

            {/* Static Noise Overlay */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Diagnostic Logs (bottom left) */}
            <div className="absolute bottom-10 left-10 text-left z-20 hidden md:block">
              <p className="font-mono text-xs text-[#7B6A60] tracking-wider uppercase leading-relaxed">
                [SYS] BOOTING BROADCAST MODULE v2026.01<br />
                [SYS] SYNCING VHS VIDEO PATH... OK<br />
                [SYS] VOLTAGE CONTROL STABLE [100V]<br />
                [SYS] CRT SIGNAL INTERCEPTED [SYS_OK]
              </p>
            </div>

            {/* Center Logo/Visuals with flickering motion */}
            <motion.div
              className="flex flex-col items-center gap-4 z-20 text-center px-6"
              initial={{ opacity: 0 }}
              animate={stage === "flicker" ? {
                opacity: [0, 1, 0.4, 1, 0.8, 1],
                scale: [0.98, 1.02, 0.99, 1.01, 1],
              } : { opacity: 0 }}
              transition={{ duration: 0.8, times: [0, 0.2, 0.3, 0.5, 0.7, 1] }}
            >
              <div className="border-2 border-[#D86B2A] px-6 py-2 mb-2 font-mono text-[#D86B2A] text-sm tracking-[0.25em] bg-[#D86B2A]/5 font-bold">
                SIGNAL ACQUIRED
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-[#F5F2EE] tracking-[0.15em] uppercase font-sans select-none">
                THE SCENE
              </h1>
              
              <div className="font-mono text-[#7B6A60] text-xs tracking-[0.5em] uppercase mt-2">
                ESTABLISHED 2026
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
