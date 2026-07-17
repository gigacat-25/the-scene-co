"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/services", label: "SERVICES" },
  { href: "/portfolio", label: "PORTFOLIO" },
  { href: "/case-studies", label: "CASE STUDIES" },
  { href: "/blog", label: "BLOG" },
  { href: "/team", label: "TEAM" },
  { href: "/about", label: "ABOUT" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Suppress public Navbar on all /admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (

    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full h-[60px] border-b border-[#7B6A60]/20 bg-background/80 backdrop-blur-md flex items-center transition-all duration-300">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative w-8 h-8 border border-[#D86B2A]/50 p-[2px] flex items-center justify-center bg-[#D86B2A]/5">
              {/* Corner crosshairs to fit HUD aesthetic */}
              <span className="absolute -top-[1px] -left-[1px] w-[5px] h-[5px] border-t border-l border-[#D86B2A]" />
              <span className="absolute -top-[1px] -right-[1px] w-[5px] h-[5px] border-t border-r border-[#D86B2A]" />
              <span className="absolute -bottom-[1px] -left-[1px] w-[5px] h-[5px] border-b border-l border-[#D86B2A]" />
              <span className="absolute -bottom-[1px] -right-[1px] w-[5px] h-[5px] border-b border-r border-[#D86B2A]" />
              <Image
                src="/brand-logo.png"
                alt="The Scene logo"
                width={24}
                height={24}
                className="brightness-90 object-contain"
                priority
              />
            </div>
            <span className="font-mono text-sm tracking-[0.25em] text-[#F5F2EE] font-black uppercase">
              THE SCENE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs tracking-[0.18em] text-[#7B6A60] hover:text-[#D86B2A] transition-colors duration-200 nav-underline-anim py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: TRANSMIT CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/contact" 
              className="relative border border-[#D86B2A] bg-transparent text-[#D86B2A] hover:bg-[#D86B2A] hover:text-[#050505] font-mono text-[10px] tracking-[0.2em] px-4 py-2 uppercase transition-all duration-300 font-bold"
            >
              {/* Corner brackets */}
              <span className="absolute -top-[2px] -left-[2px] w-[4px] h-[4px] bg-[#D86B2A]" />
              <span className="absolute -top-[2px] -right-[2px] w-[4px] h-[4px] bg-[#D86B2A]" />
              <span className="absolute -bottom-[2px] -left-[2px] w-[4px] h-[4px] bg-[#D86B2A]" />
              <span className="absolute -bottom-[2px] -right-[2px] w-[4px] h-[4px] bg-[#D86B2A]" />
              CONNECT
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 border border-[#7B6A60]/30 text-[#F5F2EE] bg-background/50"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background flex flex-col justify-center items-center px-6 pt-[60px]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* HUD grid line in background */}
            <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
            
            <nav className="flex flex-col items-center gap-8 z-10">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-sans text-4xl font-black tracking-widest text-[#F5F2EE] hover:text-[#D86B2A] transition-colors duration-200 uppercase"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.4 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="border-2 border-[#D86B2A] bg-transparent text-[#D86B2A] hover:bg-[#D86B2A] hover:text-[#050505] font-mono text-sm tracking-widest px-8 py-3 uppercase transition-all duration-300 font-bold"
                >
                  TRANSMIT
                </Link>
              </motion.div>
            </nav>
            
            <div className="absolute bottom-10 font-mono text-[10px] text-[#7B6A60] tracking-widest uppercase">
              THE SCENE v2026.01 // SYSTEM STABLE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
