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
  { href: "/#packages", label: "Packages" },
  { href: "/team", label: "Our Team" },
  { href: "/about", label: "About Us" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/past-events", label: "Past Events" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Left: logo + brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.jpeg"          // file in /public
            alt="The Scene Co. logo"
            width={32}
            height={32}
            className="rounded-md"    // remove if logo already has shape
            priority
          />
          <span className="text-xl font-bold font-headline text-white">
            The Scene Co.
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: CTA + mobile menu */}
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link href="/#contact">Book a Consultation</Link>
          </Button>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-background border-l-border"
              >
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Image
                      src="/logo.jpeg"
                      alt="The Scene Co. logo"
                      width={28}
                      height={28}
                      className="rounded-md"
                    />
                    <span className="text-white">The Scene Co.</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-10 flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSheetOpen(false)}
                      className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
