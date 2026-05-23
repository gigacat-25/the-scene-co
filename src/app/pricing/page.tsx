import { getPublishedPricing, getPricingFeatures, getPublishedFAQs } from "@/lib/db";
import { PricingTable } from "@/components/sections/pricing-table";
import { FAQ } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { JsonLd, webPageSchema, faqSchema } from "@/components/json-ld";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Website Development Pricing in India — Transparent Packages",
  description:
    "Transparent pricing for custom website development, e-commerce stores, and POS systems in India. All packages include 1 year free hosting and 1 year free domain. No hidden fees.",
  keywords: [
    "website development cost India",
    "web development pricing Bangalore",
    "e-commerce website price India",
    "custom website packages India",
    "POS system cost India",
    "website development packages",
    "affordable web development India",
  ],
  alternates: { canonical: "https://thescene.co.in/pricing" },
  openGraph: {
    url: "https://thescene.co.in/pricing",
    title: "Website Development Pricing | The Scene Co.",
    description:
      "Transparent pricing for custom websites, e-commerce stores, and POS systems. 1 year free hosting included.",
  },
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

  const pricingPageSchema = webPageSchema({
    name: "Website Development Pricing — Transparent Packages | The Scene Co.",
    description:
      "Transparent pricing for custom websites, e-commerce stores, and POS systems. 1 year free hosting + domain included.",
    url: "/pricing",
    breadcrumbs: [{ name: "Pricing", url: "https://thescene.co.in/pricing" }],
  });

  const pricingFaqSchema =
    faqs.length > 0
      ? faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })))
      : null;

  return (
    <div className="flex flex-col bg-canvas">
      <JsonLd data={pricingPageSchema} />
      {pricingFaqSchema && <JsonLd data={pricingFaqSchema} />}

      {/* Page hero */}
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

      <div className="container mx-auto px-4 sm:px-6 py-20 max-w-7xl">
        <PricingTable plans={plansWithFeatures} />
      </div>

      <div className="pb-4">
        <FAQ
          faqs={faqs}
          title="Questions about pricing?"
          subtitle="Common questions about our packages, process, and what's included."
        />
      </div>

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
