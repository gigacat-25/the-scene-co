"use client";

import { motion } from "framer-motion";
import { Monitor, Zap, ShieldAlert, BarChart3 } from "lucide-react";

const features = [
  {
    id: 1,
    tag: "SYS_CUSTOM",
    title: "CUSTOM SOLUTIONS",
    description: "EVERY PROJECT STARTS FROM SCRATCH. NO TEMPLATES. NO SHORTCUTS.",
    icon: Monitor,
    stats: "TEMPLATE_REJECT: TRUE"
  },
  {
    id: 2,
    tag: "SYS_SPEED",
    title: "PERFORMANCE",
    description: "FAST. SECURE. BUILT FOR SCALE.",
    icon: Zap,
    stats: "CORE_SPEED: MAX"
  },
  {
    id: 3,
    tag: "SYS_GROWTH",
    title: "GROWTH",
    description: "SEO. MARKETING. OPTIMIZATION. BUILT TO GENERATE RESULTS.",
    icon: BarChart3,
    stats: "OUT_ROI: STABLE"
  },
  {
    id: 4,
    tag: "SYS_SUPPORT",
    title: "SUPPORT",
    description: "LONG-TERM PARTNERSHIP. RELIABLE MAINTENANCE. ALWAYS AVAILABLE.",
    icon: ShieldAlert,
    stats: "UPTIME: 24/7"
  }
];

export function FeatureStatusGrid() {
  return (
    <section className="w-full py-16 bg-[#050505] border-t border-[#7B6A60]/20 relative select-none">
      <div className="absolute inset-0 tech-grid opacity-[0.08] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 text-left max-w-xl">
          <span className="font-mono text-xs text-[#7B6A60] tracking-[0.3em] uppercase block mb-3">
            // INTEGRATION_BENCHMARK
          </span>
          <h2 className="font-sans text-4xl sm:text-5xl font-black text-[#F5F2EE] tracking-[0.05em] leading-none uppercase mb-4">
            WHY
            <br />
            BUSINESSES
            <br />
            CHOOSE
            <br />
            <span className="text-[#D86B2A]">THE SCENE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.id}
              className="group bg-[#080808] border border-[#7B6A60]/30 p-6 flex flex-col justify-between relative hover:border-[#D86B2A] transition-mechanical min-h-[220px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Corner brackets */}
              <span className="absolute -top-[1px] -left-[1px] w-[5px] h-[5px] border-t border-l border-[#7B6A60]/40 group-hover:border-[#D86B2A] transition-colors" />
              <span className="absolute -top-[1px] -right-[1px] w-[5px] h-[5px] border-t border-r border-[#7B6A60]/40 group-hover:border-[#D86B2A] transition-colors" />
              <span className="absolute -bottom-[1px] -left-[1px] w-[5px] h-[5px] border-b border-l border-[#7B6A60]/40 group-hover:border-[#D86B2A] transition-colors" />
              <span className="absolute -bottom-[1px] -right-[1px] w-[5px] h-[5px] border-b border-r border-[#7B6A60]/40 group-hover:border-[#D86B2A] transition-colors" />

              <div>
                {/* Header indicators */}
                <div className="flex justify-between items-center border-b border-[#7B6A60]/10 pb-3 mb-4 font-mono text-[9px] text-[#7B6A60]">
                  <span>[{feat.tag}]</span>
                  <span className="text-[#FFB36B] group-hover:text-[#D86B2A] transition-colors font-bold">// OK</span>
                </div>

                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-4">
                  <feat.icon className="h-5 w-5 text-[#D86B2A] shrink-0" />
                  <h3 className="font-mono text-xs tracking-[0.15em] font-black text-[#F5F2EE] uppercase">
                    {feat.title}
                  </h3>
                </div>

                <p className="font-mono text-[10px] text-[#7B6A60] leading-relaxed uppercase">
                  {feat.description}
                </p>
              </div>

              {/* Status parameters */}
              <div className="mt-6 pt-4 border-t border-[#7B6A60]/10 font-mono text-[9px] text-[#7B6A60] uppercase flex justify-between">
                <span>BENCHMARK_RACK</span>
                <span className="text-[#FFB36B] font-bold">{feat.stats}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
