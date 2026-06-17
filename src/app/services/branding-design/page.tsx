import Link from "next/link";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { JsonLd, webPageSchema, serviceSchema } from "@/components/json-ld";
import type { Metadata } from "next";
import { Palette, PenTool, Layout, Layers, Star, Package, Check } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Best Branding Agency in Bangalore | Logo & Graphic Design Company",
  description:
    "Top branding agency in Bangalore offering creative identity design, logo design, brand strategy, and graphic design. Partner with our design company to build impactful, memorable brands today.",
  keywords: [
    "best branding agency in Bangalore",
    "branding agency Bangalore",
    "graphic design company Bangalore",
    "logo design Bangalore",
    "brand identity design Bangalore",
    "creative agency Bangalore",
    "brand strategy Bangalore",
    "visual identity design India",
    "brand design company Bangalore",
    "logo designer Bangalore",
  ],
  alternates: { canonical: "https://www.thescene.co.in/services/branding-design" },
  openGraph: {
    url: "https://www.thescene.co.in/services/branding-design",
    title: "Best Branding Agency in Bangalore | Logo & Graphic Design | The Scene Co.",
    description:
      "Creative identity design, logo design, and brand strategy from Bangalore's top branding agency. Build a brand that inspires trust and drives recognition.",
  },
};

const pageSchema = webPageSchema({
  name: "Best Branding Agency in Bangalore | Graphic Design Company | The Scene Co.",
  description:
    "Creative brand identity design, logo design, visual systems, and brand strategy services in Bangalore. Build impactful brands that last.",
  url: "/services/branding-design",
  breadcrumbs: [
    { name: "Services", url: "https://www.thescene.co.in/services" },
    { name: "Branding & Design", url: "https://www.thescene.co.in/services/branding-design" },
  ],
});

const serviceJsonLd = serviceSchema({
  name: "Branding & Graphic Design Services",
  description: "Creative brand identity design, logo design, and visual systems for businesses in Bangalore and across India.",
  url: "/services/branding-design",
});

export default function BrandingDesignPage() {
  const services = [
    {
      title: "Logo Design & Brand Identity",
      desc: "We craft unique, scalable logos that capture your brand's personality and communicate trust instantly — from concept to final vector files.",
      icon: PenTool,
    },
    {
      title: "Brand Strategy & Positioning",
      desc: "Define your brand voice, core values, target audience, and competitive positioning with a documented brand strategy playbook.",
      icon: Star,
    },
    {
      title: "Visual Identity Systems",
      desc: "Complete brand guidelines covering typography, colour palettes, icon sets, photography style, and usage rules for digital and print.",
      icon: Layers,
    },
    {
      title: "Graphic Design & Creatives",
      desc: "Social media templates, presentation decks, brochures, banners, and marketing collateral that stay on-brand across every channel.",
      icon: Palette,
    },
    {
      title: "UI/UX & Web Design",
      desc: "Premium website and app interface design grounded in your brand identity. Every screen designed with conversion and usability in mind.",
      icon: Layout,
    },
    {
      title: "Packaging & Print Design",
      desc: "Physical brand touchpoints — product packaging, business cards, letterheads, and promotional materials — designed to impress.",
      icon: Package,
    },
  ];

  const brandingProcess = [
    {
      step: "01",
      title: "Brand Discovery",
      text: "We research your industry, competitors, and target audience to understand what makes your brand unique and what it needs to communicate.",
    },
    {
      step: "02",
      title: "Creative Direction",
      text: "We present mood boards, style directions, and initial logo concepts. You pick a direction; we refine it until it's perfect.",
    },
    {
      step: "03",
      title: "Brand System Build",
      text: "We expand your approved identity into a full visual system — typography, colour palette, icons, photography guidelines, and templates.",
    },
    {
      step: "04",
      title: "Delivery & Brand Book",
      text: "You receive all master files (AI, SVG, PNG, PDF) plus a comprehensive brand guidelines document for consistent use across all media.",
    },
  ];

  return (
    <div className="flex flex-col bg-canvas text-ink overflow-hidden">
      <JsonLd data={pageSchema} />
      <JsonLd data={serviceJsonLd} />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-surface-soft border-b border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <Link href="/services" className="eyebrow-mono text-ink/50 hover:text-ink transition-colors mb-4 inline-flex items-center gap-2">
            &larr; All Services
          </Link>
          <h1 className="display-lg text-ink mb-6 mt-2">
            Best Branding Agency
            <br />
            <span className="font-bold">in Bangalore.</span>
          </h1>
          <p className="body-lg-figma text-ink/75 max-w-2xl mb-8">
            Crafting brands that inspire trust and drive recognition. We build complete brand identities — from logo and visual system to strategy and print — that make your business unforgettable.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary-figma">
              Start Your Brand Project
            </Link>
            <Link href="/portfolio" className="btn-secondary-figma">
              View Brand Work
            </Link>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* Services Grid */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="eyebrow-mono text-accent-magenta">Branding Services</span>
            <h2 className="text-ink text-3xl md:text-4xl font-bold mt-2">
              Crafting Brands That Inspire Trust and Drive Recognition
            </h2>
            <p className="text-ink/70 mt-3 max-w-xl mx-auto">
              From logo design to complete visual identity systems — everything your brand needs to stand out in Bangalore's competitive market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const IconComp = s.icon;
              return (
                <div key={i} className="p-8 bg-surface-soft rounded-2xl border border-hairline flex flex-col gap-4">
                  <div className="p-3 bg-canvas rounded-xl border border-hairline text-ink w-fit">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink mb-2">{s.title}</h3>
                    <p className="text-sm text-ink/70 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-surface-soft border-y border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="eyebrow-mono text-accent-magenta">Our Process</span>
              <h2 className="text-ink text-3xl md:text-4xl font-bold leading-tight">
                How we build your brand from scratch
              </h2>
              <p className="body-figma text-ink/75 leading-relaxed">
                Every brand we build goes through a rigorous discovery and design process. We don't use templates — every brand identity is created specifically for you.
              </p>
            </div>
            <div className="lg:col-span-8 space-y-4">
              {brandingProcess.map((s, i) => (
                <div key={i} className="p-6 bg-canvas rounded-2xl border border-hairline flex gap-4">
                  <span className="font-mono font-bold text-ink/30 text-xl shrink-0">{s.step}</span>
                  <div>
                    <h4 className="font-bold text-ink mb-1">{s.title}</h4>
                    <p className="text-sm text-ink/70 leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-ink">
            Why invest in professional branding in Bangalore?
          </h2>
          <p className="body-figma text-ink/75 leading-relaxed">
            In Bangalore's fast-growing market, brand perception is everything. A professionally designed brand identity builds instant credibility with customers, investors, and partners. Studies show that consistent branding increases revenue by up to 23%. As a leading graphic design company and branding agency in Bangalore, we ensure your brand communicates quality, trust, and professionalism at every touchpoint — from your website to your business card to your Instagram feed.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {[
              { stat: "23%", label: "Revenue increase from consistent branding" },
              { stat: "7 sec", label: "Time to form a brand impression" },
              { stat: "90%", label: "Buying decisions influenced by visual identity" },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-surface-soft rounded-xl border border-hairline text-center">
                <span className="font-mono text-ink text-2xl font-bold block mb-1">{item.stat}</span>
                <span className="text-xs text-ink/65">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to build your brand?"
        subtitle="Work with the best branding agency in Bangalore. Get a free brand consultation and logo concept within 48 hours."
        ctaText="Get Free Consultation"
        ctaLink="/contact"
        colorBlock="coral"
      />
    </div>
  );
}
