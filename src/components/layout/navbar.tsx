"use client";

import Link from "next/link";
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

const LogoIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6 text-primary"
    >
      <path d="M12 1.5a10.5 10.5 0 100 21 10.5 10.5 0 000-21zM4 12a8 8 0 014.2-7.1l-.8 1.2a6.5 6.5 0 00-2.3 5.9 6.5 6.5 0 006.4 6.5 6.5 6.5 0 006.4-6.5 6.5 6.5 0 00-2.3-5.9l-.8-1.2A8 8 0 114 12z" />
    </svg>
  );

const navLinks = [
  { href: "/#packages", label: "Packages" },
  { href: "/about", label: "About Us" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon />
          <span className="text-xl font-bold font-headline text-white">The Scene Co.</span>
        </Link>

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

        <div className="flex items-center gap-2">
           <Button asChild variant="ghost" className="hidden md:inline-flex">
              <Link href="/#contact">Book a Consultation</Link>
            </Button>
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background border-l-border">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                       <LogoIcon />
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
