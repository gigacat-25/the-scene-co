"use client";

import { Instagram, Linkedin, Twitter, Mail, BotMessageSquare, Facebook, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer({ settings }: { settings?: Record<string, string> }) {
  const email = settings?.contact_email || "hello@thescene.co.in";
  const instagram = settings?.social_instagram || "https://www.instagram.com/thescene.co.in/";
  const twitter = settings?.social_twitter || "#";
  const linkedin = settings?.social_linkedin || "#";
  
  const rawWa = settings?.whatsapp_number || "9845714699";
  const waClean = rawWa.replace(/\D/g, "");
  // Prefix with 91 if it's a 10-digit Indian number without country code
  const waLink = waClean.length === 10 ? `91${waClean}` : waClean;
  const whatsappUrl = `https://wa.me/${waLink}`;

  return (
    <footer className="bg-canvas border-t border-hairline-soft pt-16 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
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
              <span className="text-2xl font-bold font-sans text-ink tracking-tight">
                The Scene Co.
              </span>
            </Link>
            <p className="max-w-md body-sm-figma text-ink/70">
              We build premium custom websites, e-commerce stores, and POS systems — 
              full-stack, with built-in CMS and 1 year free hosting. Zero templates.
            </p>
          </div>

          {/* Navigation + contact */}
          <div className="md:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h3 className="mb-4 caption-mono text-ink/50 font-bold">
                Navigate
              </h3>
              <ul className="space-y-3 caption-mono">
                <li>
                  <Link
                    href="/"
                    className="text-ink/80 transition-colors hover:text-ink hover:underline"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-ink/80 transition-colors hover:text-ink hover:underline"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-ink/80 transition-colors hover:text-ink hover:underline"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="text-ink/80 transition-colors hover:text-ink hover:underline"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-ink/80 transition-colors hover:text-ink hover:underline"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 caption-mono text-ink/50 font-bold">
                Connect
              </h3>

              <div className="mb-4 flex space-x-2">
                <a href={linkedin} className="btn-icon-circular" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="btn-icon-circular" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href={twitter} className="btn-icon-circular" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="btn-icon-circular" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              </div>

              <div className="space-y-2 caption-mono">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-ink/80 transition-colors hover:text-ink hover:underline"
                >
                  <Mail className="h-4 w-4 text-ink/65" />
                  <span>{email}</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-ink/80 transition-colors hover:text-ink hover:underline"
                >
                  <BotMessageSquare className="h-4 w-4 text-ink/65" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-hairline-soft pt-6 caption-mono text-ink/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} The Scene Co. All rights reserved. <br className="sm:hidden" />
            Designed &amp; Developed by <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors underline">Developer</a>
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="transition-colors hover:text-ink hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-ink hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
