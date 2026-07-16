"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Users, Calendar, Smile, ShieldCheck } from "lucide-react";

interface CounterDigitProps {
  digit: string;
  trigger: boolean;
}

function RollingDigit({ digit, trigger }: CounterDigitProps) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    
    const parsed = parseInt(digit);
    if (isNaN(parsed)) return;

    let current = 0;
    const steps = 10 + Math.floor(Math.random() * 8);
    const intervalTime = 40 + Math.random() * 40;

    const timer = setInterval(() => {
      current++;
      setVal((prev) => (prev + 1) % 10);
      if (current >= steps) {
        clearInterval(timer);
        setVal(parsed);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [digit, trigger]);

  const isNumber = !isNaN(parseInt(digit));

  if (!isNumber) {
    return (
      <span className="font-mono text-xl md:text-2xl font-black text-[#D86B2A]">
        {digit}
      </span>
    );
  }

  return (
    <div className="relative w-5 h-8 overflow-hidden inline-flex items-center justify-center bg-[#0b0a09] border border-[#7B6A60]/30 rounded-sm">
      <span className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#D86B2A]/20 z-10" />
      <motion.div
        className="absolute flex flex-col font-mono text-base md:text-lg font-black text-[#F5F2EE]"
        animate={{ y: -val * 32 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div key={num} className="w-5 h-8 flex items-center justify-center select-none">
            {num}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

interface StatItemProps {
  icon: any;
  value: string;
  label: string;
  register: string;
}

function StatItem({ icon: Icon, value, label, register }: StatItemProps) {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-50px" });
  const digits = value.split("");

  return (
    <div 
      ref={itemRef}
      className="flex items-center gap-4 py-4 px-6 relative flex-1 min-w-[200px] justify-center md:justify-start"
    >
      {/* Icon with glowing orange box */}
      <div className="w-10 h-10 border border-[#7B6A60]/30 flex items-center justify-center bg-[#080808] text-[#D86B2A] shrink-0">
        <Icon className="h-4 w-4" />
      </div>

      {/* Counter & Label */}
      <div className="flex flex-col items-start gap-1">
        {/* Rolling dials inline */}
        <div className="flex items-center gap-0.5 bg-[#050505] p-0.5 border border-[#7B6A60]/10 rounded-sm">
          {digits.map((digit, i) => (
            <RollingDigit key={i} digit={digit} trigger={isInView} />
          ))}
        </div>
        <span className="font-mono text-[9px] text-[#7B6A60] tracking-widest uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}

export function AnalogCounters() {
  return (
    <section className="w-full py-6 bg-[#080808] border-y border-[#7B6A60]/30 relative select-none">
      <div className="absolute inset-0 tech-grid opacity-[0.05] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Horizontal Flex Strip (5 items) */}
        <div className="flex flex-wrap items-center justify-between gap-y-4 divide-y md:divide-y-0 md:divide-x divide-[#7B6A60]/20">
          <StatItem 
            icon={Sparkles} 
            value="250+" 
            label="PROJECTS DELIVERED" 
            register="REG_01" 
          />
          <StatItem 
            icon={Users} 
            value="150+" 
            label="BUSINESSES SERVED" 
            register="REG_02" 
          />
          <StatItem 
            icon={Calendar} 
            value="100+" 
            label="EVENTS MANAGED" 
            register="REG_03" 
          />
          <StatItem 
            icon={Smile} 
            value="98%" 
            label="CLIENT SATISFACTION" 
            register="REG_04" 
          />
          <StatItem 
            icon={ShieldCheck} 
            value="24/7" 
            label="SUPPORT AVAILABILITY" 
            register="REG_05" 
          />
        </div>
      </div>
    </section>
  );
}
