import { ServicesGrid } from "@/components/sections/services-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Services — The Scene Co.",
  description: "Custom websites, e-commerce stores, POS systems, and SaaS products — built from scratch with full-stack expertise.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col bg-canvas">

      {/* Page hero — white canvas */}
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

      {/* Services grid — white canvas */}
      <div className="container mx-auto px-4 sm:px-6 py-20 max-w-7xl">
        <ServicesGrid />
      </div>

      {/* CTA — coral color-block */}
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
