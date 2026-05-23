"use client";

import { Instagram, Linkedin, Twitter, Mail, BotMessageSquare, Facebook } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CopyableEmail } from "../copyable-email";

export function Footer({ settings }: { settings?: Record<string, string> }) {
  const email = settings?.contact_email || "hello@thescene.co.in";
  const instagram = settings?.social_instagram || "https://www.instagram.com/thescene.co.in/";
  const twitter = settings?.social_twitter || "#";
  const linkedin = settings?.social_linkedin || "#";

  const rawWa = settings?.whatsapp_number || "9845714699";
  const waClean = rawWa.replace(/\D/g, "");
  const waLink = waClean.length === 10 ? `91${waClean}` : waClean;
  const whatsappUrl = `https://wa.me/${waLink}`;

  const socials = [
    { href: linkedin,  label: "LinkedIn",   Icon: Linkedin  },
    { href: instagram, label: "Instagram",  Icon: Instagram, external: true },
    { href: twitter,   label: "Twitter",    Icon: Twitter   },
    { href: "#",       label: "Facebook",   Icon: Facebook  },
  ];

  const navLinks = [
    { href: "/",          label: "Home"      },
    { href: "/services",  label: "Services"  },
    { href: "/pricing",   label: "Pricing"   },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/team",      label: "Team"      },
    { href: "/about",     label: "About"     },
    { href: "/contact",   label: "Contact"   },
  ];

  return (
    <footer className="bg-canvas border-t border-hairline-soft pt-14 pb-10 px-5 sm:px-6">
      <div className="container mx-auto max-w-6xl">

        {/*
         * LAYOUT
         * Mobile  : single column — brand → nav → connect
         * Tablet+ : 2 col  (brand | links+connect)
         * Desktop : 4 col grid
         */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

          {/* ── Brand + tagline ── */}
          <div className="md:col-span-2 flex flex-col items-start">
            <Link href="/" className="mb-4 flex items-center gap-3 min-h-0">
              <Image
                src="/brand-logo.png"
                alt="The Scene Co. logo"
                width={38}
                height={38}
                className="rounded-md shrink-0"
              />
              <span className="text-xl font-bold font-sans text-ink tracking-tight whitespace-nowrap">
                The Scene Co.
              </span>
            </Link>
            <p className="body-sm-figma text-ink/65 leading-relaxed max-w-sm">
              We build premium custom websites, e-commerce stores, and POS systems —
              full-stack, with built-in CMS and 1 year free hosting. Zero templates.
            </p>
          </div>

          {/* ── Navigate ── */}
          <div>
            <h3 className="mb-4 caption-mono text-ink/50 font-bold tracking-widest">
              Navigate
            </h3>
            <ul className="space-y-3 caption-mono">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-ink/75 transition-colors hover:text-ink hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Connect ── */}
          <div>
            <h3 className="mb-4 caption-mono text-ink/50 font-bold tracking-widest">
              Connect
            </h3>

            {/* Social icons — flex-wrap so they never overflow */}
            <div className="mb-5 flex flex-wrap gap-2">
              {socials.map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  className="btn-icon-circular"
                  aria-label={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Email + WhatsApp */}
            <div className="space-y-3 caption-mono">
              <CopyableEmail email={email} variant="footer" />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-ink/75 transition-colors hover:text-ink hover:underline"
              >
                <BotMessageSquare className="h-4 w-4 text-ink/50 shrink-0" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-6 border-t border-hairline-soft caption-mono text-ink/45">
          {/* Mobile: stack vertically; Desktop: single row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="leading-relaxed">
              © {new Date().getFullYear()} The Scene Co. All rights reserved.
              <span className="hidden sm:inline"> · </span>
              <br className="sm:hidden" />
              Designed &amp; Developed by{" "}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink transition-colors underline"
              >
                Developer
              </a>
            </p>
            <div className="flex gap-5 shrink-0">
              <Link href="/privacy" className="transition-colors hover:text-ink hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-ink hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
