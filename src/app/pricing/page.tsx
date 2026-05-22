import { getPublishedPricing, getPricingFeatures, getPublishedFAQs } from "@/lib/db";
import { PricingTable } from "@/components/sections/pricing-table";
import { FAQ } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Pricing — The Scene Co.",
  description: "Transparent pricing for custom websites, e-commerce stores, and POS systems. 1 year free hosting included.",
};

export default async function PricingPage() {
  const plans = await getPublishedPricing();
  const plansWithFeatures = await Promise.all(
    plans.map(async (plan) => {
      const features = await getPricingFeatures(plan.id);
      return { ...plan, features };
    })
  );
  const faqs = await getPublishedFAQs();

  return (
    <div className="flex flex-col bg-canvas">

      {/* Page hero — white canvas */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-16 max-w-6xl">
        <span className="eyebrow-mono text-ink/60 block mb-4">Pricing</span>
        <h1
          className="text-ink mb-6"
          style={{ fontSize: "clamp(36px, 5vw, 86px)", fontWeight: 340, lineHeight: 1.0, letterSpacing: "-1.72px" }}
        >
          Transparent pricing.
          <br />
          <span style={{ fontWeight: 700 }}>No surprises.</span>
        </h1>
        <p className="body-lg-figma text-ink/70 max-w-2xl">
          Custom-built, no templates. Every package includes 1 year free hosting and 1 year free domain.
        </p>
      </div>

      <MarqueeStrip />

      {/* Pricing cards — white canvas */}
      <div className="container mx-auto px-4 sm:px-6 py-20 max-w-7xl">
        <PricingTable plans={plansWithFeatures} />
      </div>

      {/* FAQ — lime color-block */}
      <div className="pb-4">
        <FAQ
          faqs={faqs}
          title="Questions about pricing?"
          subtitle="Common questions about our packages, process, and what's included."
        />
      </div>

      {/* CTA — lilac color-block */}
      <CtaBanner
        title="Need a custom quote?"
        subtitle="Every project is unique. Tell us what you need and we'll give you a detailed proposal with no obligation."
        ctaText="Get a Free Quote"
        ctaLink="/contact"
        colorBlock="lilac"
      />
    </div>
  );
}
