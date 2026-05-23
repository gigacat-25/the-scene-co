import { ServicesGrid } from "@/components/sections/services-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { JsonLd, webPageSchema, serviceSchema } from "@/components/json-ld";
import type { Metadata } from "next";

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
  alternates: { canonical: "https://thescene.co.in/services" },
  openGraph: {
    url: "https://thescene.co.in/services",
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
  breadcrumbs: [{ name: "Services", url: "https://thescene.co.in/services" }],
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

      <div className="container mx-auto px-4 sm:px-6 py-20 max-w-7xl">
        <ServicesGrid />
      </div>

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
