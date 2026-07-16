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
    const steps = 12 + Math.floor(Math.random() * 8);
    const intervalTime = 35 + Math.random() * 30;

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
      <span className="font-mono text-xl md:text-2xl font-black text-[#7A4DFF]">
        {digit}
      </span>
    );
  }

  return (
    <div
      className="relative overflow-hidden inline-flex items-center justify-center rounded"
      style={{ width: 22, height: 32, background: "#13143A", border: "1px solid rgba(122,77,255,0.25)" }}
    >
      <span
        className="absolute left-0 right-0 top-1/2 z-10 pointer-events-none"
        style={{ height: 1, background: "rgba(122,77,255,0.18)" }}
      />
      <motion.div
        className="absolute flex flex-col font-mono font-black"
        style={{ color: "#F7F7FB", fontSize: 15, lineHeight: "32px", top: 0 }}
        animate={{ y: -val * 32 }}
        transition={{ type: "spring", stiffness: 130, damping: 16 }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div
            key={num}
            style={{ width: 22, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
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
}

function StatItem({ icon: Icon, value, label }: StatItemProps) {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-40px" });
  const digits = value.split("");

  return (
    <div
      ref={itemRef}
      className="flex items-center gap-4 py-5 px-6 relative flex-1 min-w-[180px] justify-center md:justify-start"
    >
      {/* Icon box */}
      <div
        className="w-10 h-10 flex items-center justify-center shrink-0 rounded"
        style={{
          background: "rgba(101,66,218,0.12)",
          border: "1px solid rgba(122,77,255,0.30)",
          color: "#7A4DFF",
        }}
      >
        <Icon className="h-4 w-4" />
      </div>

      {/* Counter & Label */}
      <div className="flex flex-col items-start gap-1.5">
        {/* Rolling dials */}
        <div
          className="flex items-center gap-0.5 p-0.5 rounded"
          style={{ background: "rgba(19,20,58,0.8)", border: "1px solid rgba(122,77,255,0.12)" }}
        >
          {digits.map((digit, i) => (
            <RollingDigit key={i} digit={digit} trigger={isInView} />
          ))}
        </div>
        <span
          className="font-mono tracking-widest uppercase"
          style={{ fontSize: 9, color: "#ADA0C8", letterSpacing: "0.12em" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

export function AnalogCounters() {
  return (
    <section
      className="w-full py-4 relative select-none"
      style={{
        background: "#13143A",
        borderTop: "1px solid rgba(122,77,255,0.20)",
        borderBottom: "1px solid rgba(122,77,255,0.20)",
      }}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div
          className="flex flex-wrap items-center justify-between gap-y-2"
          style={{ borderColor: "rgba(122,77,255,0.15)" }}
        >
          {/* Dividers between items */}
          <div className="flex flex-wrap items-center justify-between w-full divide-y md:divide-y-0 md:divide-x"
            style={{ "--tw-divide-opacity": 1, borderColor: "rgba(122,77,255,0.15)" } as any}
          >
            <StatItem icon={Sparkles} value="50+"  label="PROJECTS DELIVERED"  />
            <StatItem icon={Users}    value="25+"  label="CLIENTS SERVED"       />
            <StatItem icon={Calendar} value="3+"   label="YEARS EXPERIENCE"     />
            <StatItem icon={Smile}    value="98%"  label="CLIENT SATISFACTION"  />
            <StatItem icon={ShieldCheck} value="24/7" label="SUPPORT AVAILABLE" />
          </div>
        </div>
      </div>
    </section>
  );
}
