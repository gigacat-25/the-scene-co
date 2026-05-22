import Image from "next/image";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { MarqueeStrip } from "@/components/marquee-strip";
import { CtaBanner } from "@/components/sections/cta-banner";

export const runtime = "edge";

export const metadata = {
  title: "About — The Scene Co.",
  description: "We build premium websites, e-commerce stores, and POS systems — custom-designed, full-stack, with 1 year free hosting.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-canvas">

      {/* Hero — white canvas */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-16 max-w-6xl">
        <span className="eyebrow-mono text-ink/60 block mb-4">About</span>
        <h1
          className="text-ink mb-8"
          style={{ fontSize: "clamp(36px, 5vw, 86px)", fontWeight: 340, lineHeight: 1.0, letterSpacing: "-1.72px" }}
        >
          We are The
          <br />
          <span style={{ fontWeight: 700 }}>Scene Co.</span>
        </h1>
      </div>

      <MarqueeStrip />

      {/* Main content — white canvas */}
      <div className="container mx-auto px-4 sm:px-6 py-20 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: logo + image */}
          <AnimateOnScroll animationClass="animate-slide-in-up" hiddenClass="opacity-0">
            <div className="bg-surface-soft rounded-lg overflow-hidden aspect-square flex items-center justify-center p-16">
              <Image
                src="/logo.jpeg"
                alt="The Scene Co. Logo"
                width={240}
                height={240}
                className="rounded-xl"
              />
            </div>
          </AnimateOnScroll>

          {/* Right: copy */}
          <AnimateOnScroll animationClass="animate-slide-in-up" hiddenClass="opacity-0" delay="0.15s">
            <div className="space-y-8">
              <div>
                <h2
                  className="text-ink mb-4"
                  style={{ fontSize: 26, fontWeight: 540, lineHeight: 1.35, letterSpacing: "-0.26px" }}
                >
                  Who we are
                </h2>
                <p className="body-figma text-ink/75 leading-relaxed" style={{ fontSize: 18, fontWeight: 320, lineHeight: 1.45 }}>
                  The Scene Co. is a premium digital agency specialising in custom websites, e-commerce stores, and web-based POS systems — built entirely from scratch.
                </p>
              </div>

              <div className="h-px bg-hairline-soft" />

              <div>
                <h2
                  className="text-ink mb-4"
                  style={{ fontSize: 26, fontWeight: 540, lineHeight: 1.35, letterSpacing: "-0.26px" }}
                >
                  Our philosophy
                </h2>
                <p className="body-figma text-ink/75 leading-relaxed" style={{ fontSize: 18, fontWeight: 320, lineHeight: 1.45 }}>
                  We believe every business deserves a digital presence as unique as they are. That's why we never use templates — every project is purpose-built, with a CMS you can actually use and hosting that&apos;s free for the first year.
                </p>
              </div>

              <div className="h-px bg-hairline-soft" />

              <div>
                <h2
                  className="text-ink mb-4"
                  style={{ fontSize: 26, fontWeight: 540, lineHeight: 1.35, letterSpacing: "-0.26px" }}
                >
                  What we deliver
                </h2>
                <ul className="space-y-3">
                  {[
                    "Custom Next.js websites, no page builders",
                    "Full e-commerce stores with Razorpay & UPI",
                    "Web-based POS systems for restaurants & retail",
                    "Built-in CMS dashboard on every project",
                    "1 year free hosting + domain on Cloudflare",
                    "24-hour support response, always",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-ink shrink-0" />
                      <span className="body-sm-figma text-ink/75">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Link href="/contact" className="btn-primary-figma">
                  Start a Project
                </Link>
                <Link href="/portfolio" className="btn-secondary-figma">
                  See Our Work
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* CTA — navy block */}
      <CtaBanner
        title="Ready to build something great?"
        subtitle="Get a free quote today. We'll get back to you within 24 hours with a detailed proposal."
        ctaText="Get a Free Quote"
        ctaLink="/contact"
        secondaryText="View Portfolio"
        secondaryLink="/portfolio"
        colorBlock="navy"
      />
    </div>
  );
}
