"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";

// Pool of images — each cell will cycle through these
const imagePool = [
  { src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=600&q=80", alt: "Custom Website Design" },
  { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80", alt: "E-Commerce Store" },
  { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80", alt: "Analytics Dashboard" },
  { src: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=600&q=80", alt: "POS System" },
  { src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80", alt: "Mobile App" },
  { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80", alt: "Business Meeting" },
  { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80", alt: "Web Development" },
  { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80", alt: "Data Analytics" },
  { src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80", alt: "Online Shopping" },
  { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80", alt: "Professional" },
  { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80", alt: "Team Work" },
  { src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80", alt: "Design Process" },
];

function ImageCell({
  imageIndex,
  className,
}: {
  imageIndex: number;
  className?: string;
}) {
  const [current, setCurrent] = useState(imageIndex % imagePool.length);
  const [next, setNext] = useState((imageIndex + 1) % imagePool.length);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const delay = 3000 + Math.random() * 3000;
    const timer = setInterval(() => {
      setFlipping(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % imagePool.length);
        setNext((n) => (n + 1) % imagePool.length);
        setFlipping(false);
      }, 600);
    }, delay);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-lg transition-all duration-700 hover:scale-[1.04] hover:shadow-xl hover:z-20 ${className}`}
      style={{ perspective: "1000px" }}
    >
      {/* Current image */}
      <img
        src={imagePool[current].src}
        alt={imagePool[current].alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: "opacity 0.6s ease, transform 0.6s ease",
          opacity: flipping ? 0 : 1,
          transform: flipping ? "scale(1.06)" : "scale(1)",
        }}
      />
      {/* Next image */}
      <img
        src={imagePool[next].src}
        alt={imagePool[next].alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: "opacity 0.6s ease, transform 0.6s ease",
          opacity: flipping ? 1 : 0,
          transform: flipping ? "scale(1)" : "scale(0.97)",
        }}
      />
    </div>
  );
}

export function Hero({ settings }: { settings?: Record<string, string> }) {
  const [isPaused, setIsPaused] = useState(false);
  const [displayText, setDisplayText] = useState("Build ");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const phrases = [
    "websites, zero templates.",
    "e-commerce stores.",
    "custom POS systems.",
    "anything possible."
  ];

  // Typing effect loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIndex];
    const fullText = "Build " + currentPhrase;

    if (isDeleting) {
      setTypingSpeed(40);
      timer = setTimeout(() => {
        setDisplayText(fullText.substring(0, displayText.length - 1));
      }, typingSpeed);
    } else {
      setTypingSpeed(100);
      timer = setTimeout(() => {
        setDisplayText(fullText.substring(0, displayText.length + 1));
      }, typingSpeed);
    }

    const minLength = "Build ".length;

    if (!isDeleting && displayText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText.length === minLength) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  // Inject blinking cursor keyframes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const styleId = "hero-blink-cursor-style";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = `
          @keyframes blink {
            50% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s step-start infinite;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════
          MOBILE HERO  (hidden on md+)
          Layout: full-bleed image on top,
                  white rounded panel on bottom
      ═══════════════════════════════════════════ */}
      <section className="md:hidden w-full flex flex-col bg-[#0b0a14]">
        {/* Image — takes up top portion, no dark overlay */}
        <div className="relative w-full overflow-hidden" style={{ height: "56vw", minHeight: 220, maxHeight: 380 }}>
          <ImageCell imageIndex={0} className="absolute inset-0 w-full h-full" />
          {/* Soft fade at bottom so white panel blends in */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{ height: 64, background: "linear-gradient(to top, #ffffff, transparent)" }}
          />
        </div>

        {/* White content panel — slides up over image edge */}
        <div
          className="relative w-full bg-white px-6 pt-8 pb-10 flex flex-col gap-5"
          style={{ borderRadius: "24px 24px 0 0", marginTop: -24, boxShadow: "0 -8px 40px rgba(0,0,0,0.12)" }}
        >
          <h1
            className="text-black font-sans leading-[1.08] tracking-[-1.5px] font-semibold text-left select-none"
            style={{ fontSize: "clamp(28px, 8vw, 40px)" }}
          >
            <span className="sr-only">Web Development Company in Bangalore | The Scene Co.</span>
            {displayText}
            <span className="animate-blink font-light text-[#5551ff]">|</span>
          </h1>
          <Link
            href={settings?.hero_cta_link || "/contact"}
            className="block w-full text-center text-white font-semibold active:scale-95 transition-all duration-200"
            style={{
              background: "#5551ff",
              fontSize: 17,
              fontWeight: 600,
              padding: "15px 24px",
              borderRadius: 16,
              boxShadow: "0 4px 16px rgba(85,81,255,0.35)",
            }}
          >
            {settings?.hero_cta_text || "Get started"}
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DESKTOP HERO  (hidden below md)
          Layout: full-bleed mosaic + floating card
      ═══════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden hidden md:block"
        style={{ minHeight: "85vh", background: "#0b0a14" }}
      >
        {/* Ambient glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1] opacity-40 mix-blend-screen">
          <div className="absolute -top-40 left-1/4 w-[50vw] h-[80vh] rounded-full bg-indigo-600/20 blur-[130px] animate-pulse" style={{ animationDuration: "8s" }} />
          <div className="absolute -top-40 right-1/4 w-[50vw] h-[80vh] rounded-full bg-purple-600/20 blur-[130px] animate-pulse" style={{ animationDuration: "12s" }} />
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-65 z-[2]" style={{
          background: "radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.12) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 100%)"
        }} />

        {/* Mosaic grid */}
        <div
          className="absolute inset-0 flex gap-2 p-2 z-[1]"
          style={{ opacity: isPaused ? 0.6 : 0.85, transition: "opacity 0.4s" }}
        >
          <div className="flex flex-col gap-2 w-[13%] shrink-0">
            <ImageCell imageIndex={0} className="flex-[3]" />
            <ImageCell imageIndex={5} className="flex-[2]" />
          </div>
          <div className="flex flex-col gap-2 w-[20%] shrink-0">
            <ImageCell imageIndex={1} className="flex-[2]" />
            <div className="flex-[1] rounded-lg flex items-center justify-center p-4 transition-all duration-500 hover:scale-[1.04] hover:rotate-[0.5deg] hover:shadow-lg cursor-default" style={{ background: "#dceeb1" }}>
              <div className="text-center">
                <div className="caption-mono text-ink/50 mb-1 text-xs">SERVICES</div>
                <div className="font-bold text-ink text-sm">Websites</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-[18%] shrink-0">
            <ImageCell imageIndex={2} className="flex-[3]" />
            <div className="flex-[1] rounded-lg flex items-center justify-center p-4 transition-all duration-500 hover:scale-[1.04] hover:rotate-[-0.5deg] hover:shadow-lg cursor-default" style={{ background: "#c5b0f4" }}>
              <div className="text-center">
                <div className="caption-mono text-ink/50 mb-1 text-xs">GALLERY</div>
                <div className="font-bold text-ink text-sm">Our Work</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-[22%] shrink-0">
            <ImageCell imageIndex={3} className="flex-1 opacity-40 hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="flex flex-col gap-2 flex-1 shrink-0">
            <ImageCell imageIndex={4} className="flex-[2]" />
            <div className="flex-[1] rounded-lg flex items-center justify-center p-4 transition-all duration-500 hover:scale-[1.04] hover:rotate-[0.5deg] hover:shadow-lg cursor-default" style={{ background: "#1f1d3d" }}>
              <div className="text-center">
                <div className="caption-mono text-white/50 mb-1 text-xs">FULL STACK</div>
                <div className="font-bold text-white text-sm">End-to-End</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55 pointer-events-none z-[2]" />

        {/* Floating card */}
        <div className="relative z-10 flex items-center justify-center min-h-[85vh] px-4 py-12">
          <div className="bg-white rounded-[32px] p-8 lg:p-12 w-full max-w-4xl shadow-[0_30px_90px_rgba(0,0,0,0.25)] border border-neutral-100/90 flex flex-row items-end justify-between gap-8 min-h-[220px] transition-all duration-300 hover:scale-[1.01]">
            <div className="flex-1 flex flex-col justify-center min-h-[120px]">
              <h1
                className="text-black font-sans leading-[1.05] tracking-[-1.5px] font-semibold text-left select-none break-words"
                style={{ fontSize: "clamp(32px, 5vw, 60px)" }}
              >
                <span className="sr-only">Web Development Company in Bangalore | The Scene Co.</span>
                {displayText}
                <span className="animate-blink font-light text-[#5551ff]">|</span>
              </h1>
            </div>
            <div className="flex shrink-0 items-end">
              <Link
                href={settings?.hero_cta_link || "/contact"}
                className="bg-[#5551ff] hover:bg-[#403ce6] text-white text-lg font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-[0_4px_14px_rgba(85,81,255,0.3)] hover:shadow-[0_6px_20px_rgba(85,81,255,0.4)] active:scale-95 text-center min-w-[180px]"
              >
                {settings?.hero_cta_text || "Get started"}
              </Link>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
          <button className="w-10 h-10 rounded-full border border-white/20 bg-black/35 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors" aria-label="Previous">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => setIsPaused(!isPaused)} className="w-10 h-10 rounded-full border border-white/20 bg-black/35 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors" aria-label={isPaused ? "Resume" : "Pause"}>
            {isPaused ? <Play className="h-4 w-4 fill-white" /> : <Pause className="h-4 w-4 fill-white" />}
          </button>
          <button className="w-10 h-10 rounded-full border border-white/20 bg-black/35 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors" aria-label="Next">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {isPaused && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 caption-mono text-white/60 bg-black/40 px-4 py-1.5 rounded-full">
            Paused
          </div>
        )}
      </section>
    </>
  );
}
