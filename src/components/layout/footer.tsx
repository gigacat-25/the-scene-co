"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Footer({ settings }: { settings?: Record<string, string> }) {
  const pathname = usePathname();
  const email = settings?.contact_email || "hello@thescene.co.in";

  // Suppress public Footer on all /admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  
  // Animate static time/frame codes in footer
  const [frameTime, setFrameTime] = useState("00:00:00:00");
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      const f = String(Math.floor(Math.random() * 25)).padStart(2, "0");
      setFrameTime(`${h}:${m}:${s}:${f}`);
    }, 40); // 25fps update
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-[#050505] border-t border-[#7B6A60]/30 pt-16 pb-12 px-6 overflow-hidden select-none z-10">
      {/* HUD grid line in background */}
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />

      {/* Shutdown Lines decoration */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D86B2A]/40 to-transparent" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Main Monospace Technical Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 border-b border-[#7B6A60]/20 pb-16">
          
          {/* Column 1: Brand & Services 1 */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-base tracking-[0.25em] text-[#F5F2EE] font-black uppercase">
                THE SCENE
              </span>
              <span className="text-[8px] font-mono bg-[#D86B2A]/10 border border-[#D86B2A]/30 text-[#D86B2A] px-1.5 py-0.5 rounded-sm">
                v2026.01
              </span>
            </div>
            
            <ul className="flex flex-col gap-2 font-mono text-xs text-[#7B6A60] uppercase">
              <li className="text-[#F5F2EE] font-bold">CREATIVE TECHNOLOGY</li>
              <li>SOFTWARE DEVELOPMENT</li>
              <li>DIGITAL MARKETING</li>
              <li>EVENT PRODUCTION</li>
            </ul>
          </div>

          {/* Column 2: Services 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs text-[#FFB36B] tracking-[0.2em] font-bold uppercase">
              // SYSTEMS
            </h4>
            <ul className="flex flex-col gap-2 font-mono text-xs text-[#7B6A60] uppercase">
              <li>WEBSITE DEVELOPMENT</li>
              <li>BRANDING</li>
              <li>SEO</li>
              <li>WEB APPLICATIONS</li>
              <li>AI SOLUTIONS</li>
            </ul>
          </div>

          {/* Column 3: Contact details & Location */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs text-[#FFB36B] tracking-[0.2em] font-bold uppercase">
              // COMMS
            </h4>
            <div className="flex flex-col gap-3 font-mono text-xs text-[#7B6A60] uppercase">
              <div>
                <span className="block text-[8px] text-[#7B6A60]/50 mb-0.5">LOCATION</span>
                <span className="text-[#F5F2EE] tracking-wider">BENGALURU, INDIA</span>
              </div>
              <div>
                <span className="block text-[8px] text-[#7B6A60]/50 mb-0.5">SMTP_LINK</span>
                <a href={`mailto:${email}`} className="text-[#F5F2EE] hover:text-[#D86B2A] underline tracking-wider">
                  {email}
                </a>
              </div>
              <div>
                <span className="block text-[8px] text-[#7B6A60]/50 mb-0.5">WEB_LINK</span>
                <a href="https://www.thescene.co.in" target="_blank" rel="noopener noreferrer" className="text-[#F5F2EE] hover:text-[#D86B2A] underline tracking-wider">
                  WWW.THESCENE.CO.IN
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Social arrays */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs text-[#FFB36B] tracking-[0.2em] font-bold uppercase">
              // FOLLOW_US
            </h4>
            <ul className="flex flex-col gap-2 font-mono text-xs text-[#7B6A60] uppercase">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D86B2A] transition-colors">
                  [INSTAGRAM]
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D86B2A] transition-colors">
                  [LINKEDIN]
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D86B2A] transition-colors">
                  [YOUTUBE]
                </a>
              </li>
              <li className="mt-2 text-[8px] tracking-widest text-[#7B6A60]/50">
                TC: {frameTime}
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom (Shutdown specs) */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[10px] text-[#7B6A60] uppercase tracking-widest">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© 2026 THE SCENE. ALL SYSTEMS LOGGED.</span>
            <span className="hidden md:inline">|</span>
            <span>SERVER: <span className="text-[#D86B2A]">ONLINE</span></span>
            <span className="hidden md:inline">|</span>
            <span>NODE: <span className="text-[#FFB36B]">IND_BLR</span></span>
          </div>

          <div className="flex gap-6 shrink-0">
            <Link href="/privacy" className="hover:text-white transition-colors">
              [PRIVACY]
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              [TERMS]
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
