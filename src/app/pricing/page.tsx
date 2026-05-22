import { getPublishedPricing, getPricingFeatures, getPublishedFAQs } from "@/lib/db";
import { PricingTable } from "@/components/sections/pricing-table";
import { FAQ } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";
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
    <div className="flex flex-col">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-white mb-6">
            Transparent Pricing
          </h1>
          <p className="text-muted-foreground text-lg">
            Custom-built, no templates. Every package includes 1 year free hosting + 1 year free domain.
          </p>
        </div>
        <PricingTable plans={plansWithFeatures} />
      </div>

      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
        </div>
        <FAQ faqs={faqs} />
      </div>

      <CtaBanner
        title="Need a Custom Quote?"
        subtitle="Every project is unique. Tell us what you need and we'll give you a detailed proposal."
        ctaText="Get a Free Quote"
        ctaLink="/contact"
      />
    </div>
  );
}
