"use client";

import { Instagram, Linkedin, Twitter, Mail, BotMessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/70">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand + tagline */}
          <div className="col-span-1 flex flex-col items-start md:col-span-2">
            <Link href="/" className="mb-5 flex items-center gap-3">
              <Image
                src="/logo.jpeg"
                alt="The Scene Co. logo"
                width={40}
                height={40}
                className="rounded-md"
              />
              <span className="font-headline text-2xl font-bold text-white">
                The Scene Co.
              </span>
            </Link>
            <p className="max-w-md text-base text-muted-foreground">
              Events &amp; Experiences, Curated to Perfection. We are your partners
              in creating unforgettable, sustainable, and impactful events.
            </p>
          </div>

          {/* Navigation + contact */}
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Navigate
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/#packages"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Packages
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sustainability"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contact"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Connect
              </h3>

              <div className="mb-4 flex space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://www.instagram.com/thescene.co.in?igsh=cGxpbmFtb2plZGcy" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </a>
                </Button>
              </div>

              <div className="space-y-2 text-sm">
                <a
                  href="mailto:hello@thescene.co"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  <span>hello@thescene.co</span>
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <BotMessageSquare className="h-4 w-4" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} The Scene Co. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="transition-colors hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
