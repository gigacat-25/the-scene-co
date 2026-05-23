"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/team", label: "Team" },
  { href: "/clients", label: "Clients" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full h-[80px] border-b border-hairline bg-canvas/90 backdrop-blur-md flex items-center">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Left: logo + brand */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/brand-logo.png"          // file in /public
            alt="The Scene Co. logo"
            width={64}
            height={64}
            className="rounded-md"
            priority
          />
          <span className="text-xl font-bold font-sans text-ink tracking-tight whitespace-nowrap">
            The Scene Co.
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: CTA + mobile menu */}
        <div className="flex items-center gap-3">
          <div className="hidden md:inline-flex items-center gap-3">
            <Link href="/contact" className="btn-secondary-figma text-sm">
              Contact
            </Link>
            <Link href="/contact" className="btn-primary-figma text-sm">
              Get a Quote
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button className="h-9 w-9 rounded-full bg-surface-soft text-ink flex items-center justify-center hover:bg-hairline transition-colors">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-canvas border-l border-hairline"
              >
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Image
                      src="/brand-logo.png"
                      alt="The Scene Co. logo"
                      width={64}
                      height={64}
                      className="rounded-md"
                    />
                    <span className="text-ink font-bold">The Scene Co.</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-10 flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSheetOpen(false)}
                      className="text-lg font-medium text-ink/70 transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="h-px bg-hairline my-2" />
                  <Link
                    href="/contact"
                    onClick={() => setSheetOpen(false)}
                    className="w-full text-center btn-secondary-figma text-sm"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setSheetOpen(false)}
                    className="w-full text-center btn-primary-figma text-sm"
                  >
                    Get a Quote
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
