import Link from "next/link";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { JsonLd, webPageSchema } from "@/components/json-ld";
import type { Metadata } from "next";
import { Check, ArrowLeft, Search, MapPin, Sparkles } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Healthcare Local SEO & Web Case Study | The Scene Co.",
  description:
    "How we revamped the web presence of a Bangalore clinic, embedding custom schemas, dynamic sitemaps, and landing pages to outrank major healthcare directories.",
  keywords: [
    "healthcare SEO case study",
    "local SEO Bangalore clinic",
    "medical website design Bangalore",
    "Google Search Console setup",
    "outrank Practo directories",
  ],
  alternates: { canonical: "https://www.thescene.co.in/case-studies/healthcare-website-seo-bangalore" },
  openGraph: {
    url: "https://www.thescene.co.in/case-studies/healthcare-website-seo-bangalore",
    title: "Healthcare Local SEO & Web Case Study | The Scene Co.",
    description:
      "+320% increase in appointment leads and #1 local rank. Read how we optimized a multi-specialty clinic in Bangalore, India.",
  },
};

const pageSchema = webPageSchema({
  name: "Healthcare Local SEO & Web Case Study | The Scene Co.",
  description:
    "Local SEO and medical website redesign case study in Bangalore, India. outranking directories, structuring sitemaps, and FAQ schemas.",
  url: "/case-studies/healthcare-website-seo-bangalore",
  breadcrumbs: [
    { name: "Case Studies", url: "https://www.thescene.co.in/case-studies" },
    { name: "Healthcare Local SEO", url: "https://www.thescene.co.in/case-studies/healthcare-website-seo-bangalore" },
  ],
});

export default function HealthcareSeoCaseStudy() {
  const metrics = [
    { value: "+320%", label: "Organic Appointment Leads" },
    { value: "#1 Rank", label: "For 15+ Core Medical Keywords" },
    { value: "0.8s", label: "Mobile Page Load Speed" },
    { value: "92%", label: "Mobile Usability Score" },
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
          <span className="eyebrow-mono text-accent-magenta block mt-4">Case Study: Local SEO & Web</span>
          <h1 className="text-3xl md:text-5xl font-bold text-ink mb-6 mt-2 leading-tight">
            How a Bangalore Clinic Outranked Major Directories and Increased Appointment Leads by 320%
          </h1>
          <p className="body-lg-figma text-ink/75 leading-relaxed max-w-3xl">
            For local services like healthcare, organic search ranking is everything. When a multi-specialty clinic in Bangalore found themselves outranked by large aggregator directories like Practo and Justdial, we conducted a technical SEO overhaul and built a custom React site.
          </p>
        </div>
      </section>

      <MarqueeStrip />

      {/* Metrics */}
      <section className="py-16 bg-canvas border-b border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((m, i) => (
              <div key={i} className="p-6 bg-surface-soft rounded-2xl border border-hairline text-center">
                <span className="font-mono text-ink text-3xl font-bold block mb-1">{m.value}</span>
                <span className="text-xs text-ink/65 uppercase tracking-wider">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-12">
          
          {/* Challenge */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-ink">The Challenge: Aggregator dominance and invisible search listings</h3>
            <p className="body-figma text-ink/75 leading-relaxed">
              Our client was a premium clinic based in Bangalore offering specialized orthopedic and pediatric treatments. However, when local patients searched for keywords like "best pediatrician in Bangalore" or "best orthopedic clinic in Bangalore," their old website was nowhere to be found.
            </p>
            <p className="body-figma text-ink/75 leading-relaxed">
              Instead, the first page of Google was dominated by directory sites. The clinic''s website loaded slowly on mobile screens, lacked metadata structure, had no XML sitemaps, and was not registered in Google Search Console, making them essentially invisible.
            </p>
          </div>

          {/* Strategy */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-ink">The Strategy: Keyword-first design & custom JSON-LD schemas</h3>
            <p className="body-figma text-ink/75 leading-relaxed">
              We did not just redesign their website — we structured the entire codebase around **local search intent**. Here is our technical roadmap:
            </p>
            <ul className="space-y-3 pl-2">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-semantic-success shrink-0 mt-0.5" />
                <span className="text-sm text-ink/80 leading-relaxed">**Technical Speed Audit**: Replaced their slow WordPress build with a lightweight Next.js app, achieving mobile load speeds of **0.8 seconds**.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-semantic-success shrink-0 mt-0.5" />
                <span className="text-sm text-ink/80 leading-relaxed">**LocalBusiness Schema**: Embedded custom JSON-LD schemas detailing the clinic''s exact coordinates, phone numbers, and doctors'' medical credentials.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-semantic-success shrink-0 mt-0.5" />
                <span className="text-sm text-ink/80 leading-relaxed">**FAQ Schema Integration**: Structured frequently asked questions in doctors'' landing pages, earning Google rich snippet results (accordions) directly in search pages.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-semantic-success shrink-0 mt-0.5" />
                <span className="text-sm text-ink/80 leading-relaxed">**Google Search Console Verification**: Set up dynamic sitemaps and indexed all doctor pages immediately upon publish.</span>
              </li>
            </ul>
          </div>

          {/* Tech Block */}
          <div className="p-8 bg-surface-soft rounded-2xl border border-hairline space-y-4">
            <h4 className="font-bold text-lg text-ink">Local SEO Core Achievements:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-1">
                <Search className="h-5 w-5 text-ink/60 mb-2" />
                <h5 className="font-bold text-sm">Keyword Authority</h5>
                <p className="text-xs text-ink/70">Coded keyword-first heading elements (`sr-only` wrappers) to tell Google exactly what services are provided.</p>
              </div>
              <div className="space-y-1">
                <MapPin className="h-5 w-5 text-ink/60 mb-2" />
                <h5 className="font-bold text-sm">Local Search Rank</h5>
                <p className="text-xs text-ink/70">Optimized coordinate schemas to secure top-3 spots in Google Maps Pack queries.</p>
              </div>
              <div className="space-y-1">
                <Sparkles className="h-5 w-5 text-ink/60 mb-2" />
                <h5 className="font-bold text-sm">Conversion Lift</h5>
                <p className="text-xs text-ink/70">Structured checkout-style reservation flows directly in doctor profiles, minimizing booking drop-offs.</p>
              </div>
            </div>
          </div>

          {/* Impact */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-ink">The Impact: Aggregators outranked, +320% leads</h3>
            <p className="body-figma text-ink/75 leading-relaxed">
              Google indexed the clinic''s custom Next.js pages and sitemaps immediately. Thanks to dynamic schema code, the site''s listings appeared with star ratings and FAQ dropdowns on Google Search Results.
            </p>
            <p className="body-figma text-ink/75 leading-relaxed">
              In under 90 days, the clinic outranked Practo directories for **15+ high-volume orthopedic and pediatric search keywords** in their local area, driving a **320% increase in monthly appointment bookings** directly from their site.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title="Ready to dominate local search results?"
        subtitle="Work with the best SEO and web development company in Bangalore. Get a custom technical SEO audit and ranking strategy today."
        ctaText="Request SEO Consultation"
        ctaLink="/contact"
        colorBlock="mint"
      />
    </div>
  );
}
