import { ServicesGrid } from "@/components/sections/services-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { JsonLd, webPageSchema, serviceSchema } from "@/components/json-ld";
import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Web Development Services — Custom Websites, E-Commerce & POS Systems",
  description:
    "Full-stack web development services: custom Next.js websites, e-commerce stores with Razorpay & UPI, web-based POS systems, SaaS dashboards, and built-in CMS. No templates. Based in Bangalore, India.",
  keywords: [
    "web development services India",
    "custom website development Bangalore",
    "e-commerce development India",
    "POS system development Bangalore",
    "Next.js development services",
    "SaaS development India",
    "full stack web development India",
    "Razorpay integration India",
  ],
  alternates: { canonical: "https://www.thescene.co.in/services" },
  openGraph: {
    url: "https://www.thescene.co.in/services",
    title: "Web Development Services | The Scene Co.",
    description:
      "Custom websites, e-commerce stores, POS systems, and SaaS products — built from scratch with full-stack expertise.",
  },
};

const servicesPageSchema = webPageSchema({
  name: "Web Development Services — Custom Websites, E-Commerce & POS Systems | The Scene Co.",
  description:
    "Full-stack web development: custom Next.js websites, e-commerce stores, POS systems, and SaaS dashboards. No templates.",
  url: "/services",
  breadcrumbs: [{ name: "Services", url: "https://www.thescene.co.in/services" }],
});

const servicesJsonLd = [
  serviceSchema({
    name: "Custom Website Development",
    description:
      "Fully custom Next.js websites built from scratch — no templates, no page builders. Includes built-in CMS and 1 year free hosting.",
    url: "/services",
  }),
  serviceSchema({
    name: "E-Commerce Store Development",
    description:
      "Full e-commerce stores with Razorpay, Stripe, and UPI integration. Inventory management, order tracking, and built-in CMS.",
    url: "/services",
  }),
  serviceSchema({
    name: "POS System Development",
    description:
      "Web-based POS systems for restaurants, cafes, and retail. Works on any device, real-time reports, no app install needed.",
    url: "/services",
  }),
  serviceSchema({
    name: "SaaS Dashboard Development",
    description:
      "Custom SaaS products and web application dashboards — full-stack, with auth, billing, and role-based access control.",
    url: "/services",
  }),
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col bg-canvas">
      <JsonLd data={servicesPageSchema} />
      {servicesJsonLd.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}

      {/* Page hero */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-16 max-w-6xl">
        <span className="eyebrow-mono text-ink/60 block mb-4">Services</span>
        <h1
          className="text-ink mb-6"
          style={{ fontSize: "clamp(36px, 5vw, 86px)", fontWeight: 340, lineHeight: 1.0, letterSpacing: "-1.72px" }}
        >
          What we build
          <br />
          <span style={{ fontWeight: 700 }}>from scratch.</span>
        </h1>
        <p className="body-lg-figma text-ink/70 max-w-2xl">
          Full-stack development — frontend, backend, CMS, and deployment. No templates, no compromises.
        </p>
      </div>

      <MarqueeStrip />

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-7xl">
        <ServicesGrid />
      </div>

      {/* Structured Process Section */}
      <section className="py-20 bg-surface-soft border-y border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="eyebrow-mono text-accent-magenta">Roadmap</span>
            <h2 className="text-ink text-3xl md:text-5xl font-light tracking-tight mt-2">
              WEBSITE DEVELOPMENT, A STRUCTURED PROCESS
            </h2>
            <p className="text-ink/70 mt-3 max-w-xl mx-auto">
              How we transform ideas into high-performance digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-canvas rounded-2xl border border-hairline space-y-4">
              <span className="font-mono text-xl font-bold text-ink/30 block">01 / DISCOVERY</span>
              <h3 className="text-xl font-bold text-ink">Research & Architecture</h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                Before writing any code, we study your business goals, brand incentive, and target client behaviors. We establish a clean sitemap and outline system requirements to prevent unnecessary rework.
              </p>
            </div>
            <div className="p-8 bg-canvas rounded-2xl border border-hairline space-y-4">
              <span className="font-mono text-xl font-bold text-ink/30 block">02 / UI/UX DESIGN</span>
              <h3 className="text-xl font-bold text-ink">Custom Visual Mockups</h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                Our design system incorporates modern typography, smooth gradients, and micro-animations. We build fully responsive interactive wireframes optimized for both desktop and mobile screens.
              </p>
            </div>
            <div className="p-8 bg-canvas rounded-2xl border border-hairline space-y-4">
              <span className="font-mono text-xl font-bold text-ink/30 block">03 / DEVELOPMENT</span>
              <h3 className="text-xl font-bold text-ink">Next-Gen Full Stack Coding</h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                We engineer performance-checked Next.js codebases, serverless database handlers, and custom CMS tools simultaneously. We optimize speed, security, and schema integrations dynamically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agency vs Freelancers & Tech Stacks */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Column 1: Agency vs Freelancers */}
            <div className="space-y-6">
              <span className="eyebrow-mono text-accent-magenta">Value Proposition</span>
              <h2 className="text-ink text-2xl md:text-3xl font-bold">
                Why choose a professional web development company over freelancers?
              </h2>
              <p className="body-figma text-ink/75 leading-relaxed">
                Managing multiple freelancers can be highly complex and often results in communication gaps, delays, or mismatched code integrations. With a professional web design agency like The Scene Co., you partner with an integrated team of custom designers, full-stack programmers, database architects, and local SEO experts.
              </p>
              <p className="body-figma text-ink/75 leading-relaxed">
                We take care of every phase of the project: from interactive wireframes to deployment server configuration, custom CMS onboarding, and ongoing software support. Your design is secure, scalable, and fully owned by you.
              </p>
            </div>

            {/* Column 2: Tech Stacks */}
            <div className="space-y-6">
              <span className="eyebrow-mono text-accent-magenta">Technology Stack</span>
              <h2 className="text-ink text-2xl md:text-3xl font-bold">
                What technologies do modern web development companies use?
              </h2>
              <p className="body-figma text-ink/75 leading-relaxed">
                While traditional agencies in Bangalore rely on heavy, slow page templates or outdated CMS applications (which create bloated code structures and hurt SEO rankings), we choose cutting-edge, high-speed technologies.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface-soft rounded-xl border border-hairline">
                  <h4 className="font-bold text-sm text-ink mb-1">Frontend</h4>
                  <span className="text-xs text-ink/60">React, Next.js, Tailwind CSS</span>
                </div>
                <div className="p-4 bg-surface-soft rounded-xl border border-hairline">
                  <h4 className="font-bold text-sm text-ink mb-1">Backend & Serverless</h4>
                  <span className="text-xs text-ink/60">Node.js, Edge Handlers, APIs</span>
                </div>
                <div className="p-4 bg-surface-soft rounded-xl border border-hairline">
                  <h4 className="font-bold text-sm text-ink mb-1">Database</h4>
                  <span className="text-xs text-ink/60">Cloudflare D1, PostgreSQL</span>
                </div>
                <div className="p-4 bg-surface-soft rounded-xl border border-hairline">
                  <h4 className="font-bold text-sm text-ink mb-1">Hosting</h4>
                  <span className="text-xs text-ink/60">Cloudflare Edge Network</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEO Friendly Section */}
      <section className="py-20 bg-block-cream text-ink">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center space-y-6">
          <span className="eyebrow-mono text-ink/60">SEO & Mobile Compatibility</span>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            HOSTING SEO-FRIENDLY PROFESSIONAL WEBSITES
          </h2>
          <p className="body-figma text-ink/80 max-w-3xl mx-auto leading-relaxed">
            Our developers focus heavily on mobile compatibility and speed metrics. Every project is built using a mobile-first responsive strategy, ensuring user interfaces adjust smoothly on all mobile devices and tablets. We implement clean, custom JSON-LD schemas, breadcrumb systems, sitemaps, and direct robots files so search engines index your brand's presence instantly.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/contact" className="btn-primary-figma">
              Start Your Project
            </Link>
            <Link href="/portfolio" className="btn-secondary-figma">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Let's build your project"
        subtitle="Tell us what you need and we'll deliver it — on time, on budget, with full support for the first year."
        ctaText="Start a Project"
        ctaLink="/contact"
        secondaryText="View Pricing"
        secondaryLink="/pricing"
        colorBlock="coral"
      />
    </div>
  );
}
