"use client";

const items = [
  "EXPERIENCE PRODUCTION",
  "CINEMATOGRAPHIC WEBSITES",
  "E-COMMERCE ENGINE RACKS",
  "BROADCAST POS STACKS",
  "ZERO-TEMPLATE CODE",
  "ANALOG SWITCHER TRANSITIONS",
  "VHS NOISE GENERATORS",
  "CRT OVERLAYS ACTIVE",
  "STUDIO CAM 01 ONLINE",
  "BENGALURU NODE LIVE",
];

export function MarqueeStrip() {
  return (
    <div
      className="w-full overflow-hidden bg-[#050505] border-y border-[#7B6A60]/30 flex items-center"
      style={{ height: 38 }}
      aria-hidden="true"
    >
      <div
        className="flex items-center h-full gap-0 whitespace-nowrap"
        style={{
          animation: "marquee 35s linear infinite",
          width: "max-content",
        }}
      >
        {/* Doubled for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-mono text-[10px] tracking-[0.2em] text-[#D86B2A] px-8 inline-flex items-center gap-3"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[#D86B2A] animate-ping"
              aria-hidden="true"
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
