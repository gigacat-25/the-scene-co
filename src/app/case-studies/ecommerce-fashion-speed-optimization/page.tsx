import Link from "next/link";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { JsonLd, webPageSchema } from "@/components/json-ld";
import type { Metadata } from "next";
import { Check, ArrowLeft, ArrowUpRight, BarChart, Server, Zap } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Next.js E-Commerce Migration Case Study | The Scene Co.",
  description:
    "Read how we migrated a fashion e-commerce brand from Shopify to Next.js on Cloudflare, resulting in 75% faster page loads and a 42% lift in sales conversion rate.",
  keywords: [
    "e-commerce speed optimization",
    "Shopify to Next.js migration",
    "Next.js e-commerce case study",
    "page speed conversion rates",
    "Cloudflare edge commerce",
  ],
  alternates: { canonical: "https://www.thescene.co.in/case-studies/ecommerce-fashion-speed-optimization" },
  openGraph: {
    url: "https://www.thescene.co.in/case-studies/ecommerce-fashion-speed-optimization",
    title: "Next.js E-Commerce Migration Case Study | The Scene Co.",
    description:
      "75% faster page loads and 42% lift in conversion rate. Explore our detailed e-commerce case study on Shopify-to-React migration.",
  },
};

const pageSchema = webPageSchema({
  name: "Next.js E-Commerce Migration Case Study | The Scene Co.",
  description:
    "How we optimized a fashion brand store by migrating it to Next.js on Cloudflare. 75% speed increase and 42% conversion rate increase.",
  url: "/case-studies/ecommerce-fashion-speed-optimization",
  breadcrumbs: [
    { name: "Case Studies", url: "https://www.thescene.co.in/case-studies" },
    { name: "E-Commerce Migration", url: "https://www.thescene.co.in/case-studies/ecommerce-fashion-speed-optimization" },
  ],
});

export default function EcommerceFashionCaseStudy() {
  const metrics = [
    { label: "Page Load Time", before: "4.8s", after: "1.2s", change: "-75% Speed" },
    { label: "Conversion Rate", before: "1.8%", after: "2.56%", change: "+42% Conversion" },
    { label: "Mobile Bounce Rate", before: "62%", after: "38%", change: "-24% Bounces" },
    { label: "Search Indexing", before: "Page 3", after: "Page 1", change: "Top 3 Rank" },
  ];

  return (
    <div className="flex flex-col bg-canvas text-ink overflow-hidden">
      <JsonLd data={pageSchema} />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-surface-soft border-b border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <Link href="/case-studies" className="eyebrow-mono text-ink/50 hover:text-ink transition-colors mb-4 inline-flex items-center gap-2">
            &larr; All Case Studies
          </Link>
          <span className="eyebrow-mono text-accent-magenta block mt-4">Case Study: E-Commerce</span>
          <h1 className="text-3xl md:text-5xl font-bold text-ink mb-6 mt-2 leading-tight">
            How a Fashion Brand Boosted Sales Conversions by Forty-Two Percent with Next.js Edge Rendering
          </h1>
          <p className="body-lg-figma text-ink/75 leading-relaxed max-w-3xl">
            When online boutique **Urban Threads** saw cart abandonment rising on their template-based shop, they discovered page latency was costing them customers. We replaced their database-heavy builder with a custom Next.js checkout system, routing payments via API.
          </p>
        </div>
      </section>

      <MarqueeStrip />

      {/* Metric Cards */}
      <section className="py-16 bg-canvas border-b border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="caption-mono text-ink/50 font-bold mb-8 uppercase tracking-widest text-center">Key Performance Improvements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((m, i) => (
              <div key={i} className="p-6 bg-surface-soft rounded-2xl border border-hairline text-center">
                <span className="text-xs text-ink/65 uppercase tracking-wider block mb-2">{m.label}</span>
                <span className="text-sm line-through text-ink/40 block mb-1">Before: {m.before}</span>
                <span className="text-xl font-bold font-mono block text-ink">{m.after}</span>
                <span className="text-xs font-semibold text-semantic-success block mt-2">{m.change}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Details */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-12">
          
          {/* Section 1: The Challenge */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-ink">The Challenge: Slow checkouts and mobile drop-offs</h3>
            <p className="body-figma text-ink/75 leading-relaxed">
              Urban Threads was hosting their store on a traditional platform with a heavy template theme. As they added more product categories and images, the site load times stretched past **4.8 seconds on mobile devices**.
            </p>
            <p className="body-figma text-ink/75 leading-relaxed">
              Google analytics showed a **62% bounce rate** on landing pages, and half of all checkout attempts were abandoned at the payment step. Because search engine crawlers struggle to index pages with heavy JavaScript bundles and slow responses, the brand was slipping onto page 3 of Google search results for core keywords.
            </p>
          </div>

          {/* Section 2: The Strategy */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-ink">The Strategy: Custom Next.js codebase & Cloudflare edge integration</h3>
            <p className="body-figma text-ink/75 leading-relaxed">
              We migrated the entire catalog from the template builder into a custom-coded **Next.js App Router** architecture. Here is what we did:
            </p>
            <ul className="space-y-3 pl-2">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-semantic-success shrink-0 mt-0.5" />
                <span className="text-sm text-ink/80 leading-relaxed">**Static Site Generation (SSG)**: Product listings were pre-rendered into static HTML at build time, ensuring immediate response.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-semantic-success shrink-0 mt-0.5" />
                <span className="text-sm text-ink/80 leading-relaxed">**Cloudflare Pages Edge Routing**: Static assets and product HTML are cached in 300+ datacenters globally, serving users directly from the closest node.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-semantic-success shrink-0 mt-0.5" />
                <span className="text-sm text-ink/80 leading-relaxed">**API Payment Gateway Integration**: Replaced heavy hosted checkouts with direct, lightweight integrations with **Razorpay and UPI** via serverless endpoints.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-semantic-success shrink-0 mt-0.5" />
                <span className="text-sm text-ink/80 leading-relaxed">**Structured Metadata & Schema**: Custom JSON-LD Product Schemas tell Googlebot the pricing, availability, and description of every item automatically.</span>
              </li>
            </ul>
          </div>

          {/* Section 3: The Technical Infrastructure */}
          <div className="p-8 bg-surface-soft rounded-2xl border border-hairline space-y-4">
            <h4 className="font-bold text-lg text-ink">Why Next.js Outperforms Template Builders:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-1">
                <Zap className="h-5 w-5 text-ink/60 mb-2" />
                <h5 className="font-bold text-sm">Sub-second Speed</h5>
                <p className="text-xs text-ink/70">Edge caching serves pre-rendered code directly, bypassing database delays.</p>
              </div>
              <div className="space-y-1">
                <Server className="h-5 w-5 text-ink/60 mb-2" />
                <h5 className="font-bold text-sm">Zero Server Latency</h5>
                <p className="text-xs text-ink/70">Edge networks maintain 100% availability even during viral marketing spikes.</p>
              </div>
              <div className="space-y-1">
                <BarChart className="h-5 w-5 text-ink/60 mb-2" />
                <h5 className="font-bold text-sm">Schema Richness</h5>
                <p className="text-xs text-ink/70">Embedded schemas generate rich listings directly on Search Results pages.</p>
              </div>
            </div>
          </div>

          {/* Section 4: The Business Impact */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-ink">The Impact: Lower bounce rates and search dominance</h3>
            <p className="body-figma text-ink/75 leading-relaxed">
              Within 30 days of deploying the custom Next.js store, Urban Threads saw visual load speeds improve by **75%**. The mobile checkout bounce rate dropped from 62% to 38%.
            </p>
            <p className="body-figma text-ink/75 leading-relaxed">
              With a Lighthouse score of 99/100, Google quickly prioritized their product pages over template-based competitors. Their primary category search ranked in the **Top-3 local search results**, leading to a **42% lift in sales conversions** and a record month of revenue.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title="Ready to optimize your online store?"
        subtitle="Migrate to a premium Next.js custom e-commerce solution. Get a free speed audit and platform consultation today."
        ctaText="Request E-Commerce Consultation"
        ctaLink="/contact"
        colorBlock="lime"
      />
    </div>
  );
}
