import { ServicesGrid } from "@/components/sections/services-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Services — The Scene Co.",
  description: "Custom websites, e-commerce stores, POS systems, and SaaS products — built from scratch with full-stack expertise.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-white mb-6">
            What We Build
          </h1>
          <p className="text-muted-foreground text-lg">
            Full-stack development — frontend, backend, CMS, and deployment. No templates, no compromises.
          </p>
        </div>
        <ServicesGrid />
      </div>

      <CtaBanner
        title="Let's Build Your Project"
        subtitle="Tell us what you need and we'll deliver it — on time, on budget."
        ctaText="Start a Project"
        ctaLink="/contact"
      />
    </div>
  );
}
