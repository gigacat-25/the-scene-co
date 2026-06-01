import Link from "next/link";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { MarqueeStrip } from "@/components/marquee-strip";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd, webPageSchema } from "@/components/json-ld";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "About Us — Web Development Agency in Bangalore, India",
  description:
    "The Scene Co. is a premium web development agency in Bangalore, India. We build custom websites, e-commerce stores, and POS systems — full-stack, zero templates, with 1 year free hosting.",
  keywords: [
    "web development agency Bangalore",
    "website development company India",
    "custom website agency India",
    "full stack developers India",
    "about The Scene Co",
    "web agency Bangalore India",
  ],
  alternates: { canonical: "https://www.thescene.co.in/about" },
  openGraph: {
    url: "https://www.thescene.co.in/about",
    title: "About The Scene Co. | Web Development Agency in Bangalore",
    description:
      "Premium web development agency in Bangalore. Custom websites, e-commerce stores, and POS systems — built from scratch.",
  },
};

const aboutSchema = webPageSchema({
  name: "About The Scene Co. — Web Development Agency in Bangalore, India",
  description:
    "The Scene Co. is a premium digital agency specialising in custom websites, e-commerce stores, and web-based POS systems — built entirely from scratch.",
  url: "/about",
  breadcrumbs: [{ name: "About", url: "https://www.thescene.co.in/about" }],
});

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-canvas">
      <JsonLd data={aboutSchema} />

      {/* Hero */}
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

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 py-20 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: logo */}
          <AnimateOnScroll animationClass="animate-slide-in-up" hiddenClass="opacity-0">
            <div className="bg-surface-soft rounded-lg overflow-hidden aspect-square flex items-center justify-center p-8 sm:p-12">
              <video
                src="/brand-logo-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="rounded-xl w-full h-full object-contain"
              />
            </div>
          </AnimateOnScroll>

          {/* Right: copy */}
          <AnimateOnScroll animationClass="animate-slide-in-up" hiddenClass="opacity-0" delay="0.15s">
            <div className="space-y-8">
              <div>
                <h2 className="text-ink mb-4" style={{ fontSize: 26, fontWeight: 540, lineHeight: 1.35, letterSpacing: "-0.26px" }}>
                  Who we are
                </h2>
                <p className="body-figma text-ink/75 leading-relaxed" style={{ fontSize: "clamp(15px, 2.2vw, 18px)", fontWeight: 320, lineHeight: 1.45 }}>
                  The Scene Co. is a premium digital agency specialising in custom websites, e-commerce stores, and web-based POS systems — built entirely from scratch.
                </p>
              </div>

              <div className="h-px bg-hairline-soft" />

              <div>
                <h2 className="text-ink mb-4" style={{ fontSize: 26, fontWeight: 540, lineHeight: 1.35, letterSpacing: "-0.26px" }}>
                  Our philosophy
                </h2>
                <p className="body-figma text-ink/75 leading-relaxed" style={{ fontSize: "clamp(15px, 2.2vw, 18px)", fontWeight: 320, lineHeight: 1.45 }}>
                  We believe every business deserves a digital presence as unique as they are. That&apos;s why we never use templates — every project is purpose-built, with a CMS you can actually use and hosting that&apos;s free for the first year.
                </p>
              </div>

              <div className="h-px bg-hairline-soft" />

              <div>
                <h2 className="text-ink mb-4" style={{ fontSize: 26, fontWeight: 540, lineHeight: 1.35, letterSpacing: "-0.26px" }}>
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

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
                <Link href="/contact" className="btn-primary-figma text-center">
                  Start a Project
                </Link>
                <Link href="/portfolio" className="btn-secondary-figma text-center">
                  See Our Work
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Co-creation & DNA */}
      <div className="bg-surface-soft border-y border-hairline-soft py-20 mt-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="eyebrow-mono text-accent-magenta mb-2 block">Our Ethos</span>
              <h2 className="text-ink mb-4 text-3xl md:text-4xl font-light tracking-tight">
                CO-CREATION IS OUR DNA
              </h2>
              <p className="body-figma text-ink/75 leading-relaxed">
                We believe that premium digital products are born from close collaboration. We don't hide behind email threads or hand off generic designs. Co-creation is our DNA. We partner with your team through shared workspaces, interactive prototype reviews, and direct Slack/WhatsApp developer communication channels. This ensures your brand value proposition is integrated perfectly into the product.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-canvas rounded-2xl border border-hairline text-center">
                <span className="font-mono text-ink text-3xl font-bold block mb-1">100%</span>
                <span className="text-xs text-ink/65 uppercase tracking-wider">Custom Code Base</span>
              </div>
              <div className="p-6 bg-canvas rounded-2xl border border-hairline text-center">
                <span className="font-mono text-ink text-3xl font-bold block mb-1">24Hr</span>
                <span className="text-xs text-ink/65 uppercase tracking-wider">Support Response</span>
              </div>
              <div className="p-6 bg-canvas rounded-2xl border border-hairline text-center">
                <span className="font-mono text-ink text-3xl font-bold block mb-1">1 Year</span>
                <span className="text-xs text-ink/65 uppercase tracking-wider">Free Cloudflare Host</span>
              </div>
              <div className="p-6 bg-canvas rounded-2xl border border-hairline text-center">
                <span className="font-mono text-ink text-3xl font-bold block mb-1">Zero</span>
                <span className="text-xs text-ink/65 uppercase tracking-wider">Proprietary Lock-in</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial: What makes a good web development company */}
      <div className="container mx-auto px-4 sm:px-6 py-20 max-w-4xl text-center space-y-6">
        <h2 className="text-ink text-2xl md:text-3xl font-bold">
          What makes a good web development company?
        </h2>
        <p className="body-figma text-ink/75 leading-relaxed">
          A successful website is more than just clean pixels. It must serve as a powerful business tool. A good web development company Bangalore integrates robust backend code, secure database connections, and search-optimized semantic HTML from day one. By prioritizing mobile-first responsive screens and passing Core Web Vitals checks, we make sure your online presence is ready to convert traffic into loyal clients.
        </p>
      </div>

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
