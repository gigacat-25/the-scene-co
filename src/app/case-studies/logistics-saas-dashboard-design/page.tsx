import Link from "next/link";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { JsonLd, webPageSchema } from "@/components/json-ld";
import type { Metadata } from "next";
import { Check, ArrowLeft, Cpu, ShieldAlert, LineChart } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "SaaS Dashboard & Custom Software Case Study | The Scene Co.",
  description:
    "How we designed a custom fleet tracking dashboard and CRM using Next.js App Router and Cloudflare D1 SQL, reducing database latency to near-zero.",
  keywords: [
    "custom SaaS dashboard design",
    "logistics software case study",
    "Next.js dashboard engineering",
    "Cloudflare D1 database",
    "real-time sales analytics",
  ],
  alternates: { canonical: "https://www.thescene.co.in/case-studies/logistics-saas-dashboard-design" },
  openGraph: {
    url: "https://www.thescene.co.in/case-studies/logistics-saas-dashboard-design",
    title: "SaaS Dashboard & Custom Software Case Study | The Scene Co.",
    description:
      "Near-zero database latency and 35% lift in operational speed. Read how we built a custom logistics dashboard and ERP tool.",
  },
};

const pageSchema = webPageSchema({
  name: "SaaS Dashboard & Custom Software Case Study | The Scene Co.",
  description:
    "Custom fleet tracking dashboard and ERP system case study for a logistics firm, built with React, Cloudflare D1 SQL, and Recharts.",
  url: "/case-studies/logistics-saas-dashboard-design",
  breadcrumbs: [
    { name: "Case Studies", url: "https://www.thescene.co.in/case-studies" },
    { name: "SaaS Fleet Dashboard", url: "https://www.thescene.co.in/case-studies/logistics-saas-dashboard-design" },
  ],
});

export default function LogisticsDashboardCaseStudy() {
  const stats = [
    { value: "0ms", label: "Edge Cache Latency" },
    { value: "+35%", label: "Operator Dispatch Speed" },
    { value: "100%", label: "Real-Time Sync Accuracy" },
    { value: "Zero", label: "Data Conflicts" },
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
          <span className="eyebrow-mono text-accent-magenta block mt-4">Case Study: Custom SaaS</span>
          <h1 className="text-3xl md:text-5xl font-bold text-ink mb-6 mt-2 leading-tight">
            Engineering a High-Performance Fleet Tracking Dashboard with Near-Zero Database Latency
          </h1>
          <p className="body-lg-figma text-ink/75 leading-relaxed max-w-3xl">
            Logistics operators need real-time data to dispatch vehicles and manage warehouses. When a local freight firm experienced sync delays on their legacy ERP portal, we replaced it with a Cloudflare D1-powered Next.js administrative dashboard.
          </p>
        </div>
      </section>

      <MarqueeStrip />

      {/* Stats Grid */}
      <section className="py-16 bg-canvas border-b border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="p-6 bg-surface-soft rounded-2xl border border-hairline text-center">
                <span className="font-mono text-ink text-3xl font-bold block mb-1">{s.value}</span>
                <span className="text-xs text-ink/65 uppercase tracking-wider">{s.label}</span>
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
            <h3 className="text-2xl font-bold text-ink">The Challenge: Slow queries and lost sync events</h3>
            <p className="body-figma text-ink/75 leading-relaxed">
              Our client was managing over 120 freight trucks and 200 warehouse staff through an outdated, server-bound PHP database system. When multiple operators attempted to update delivery statuses simultaneously, the server locked queries, creating **5 to 8-second latencies**.
            </p>
            <p className="body-figma text-ink/75 leading-relaxed">
              This lag caused database conflicts, out-of-sync inventory counts, and dispatch errors. They needed a lightweight CRM and fleet tracking system that works on mobile tablets in warehouses, updating data in real-time.
            </p>
          </div>

          {/* Strategy */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-ink">The Strategy: Edge-hosted Next.js & Cloudflare SQL database</h3>
            <p className="body-figma text-ink/75 leading-relaxed">
              We designed and built a bespoke CRM and administrative portal from scratch. The solution combines:
            </p>
            <ul className="space-y-3 pl-2">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-semantic-success shrink-0 mt-0.5" />
                <span className="text-sm text-ink/80 leading-relaxed">**Cloudflare D1 SQL**: Leveraged Cloudflare''s serverless SQL database binding, allowing instant reads and writes from serverless edge handlers.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-semantic-success shrink-0 mt-0.5" />
                <span className="text-sm text-ink/80 leading-relaxed">**Edge Middleware Authentication**: Secure JSON Web Token (JWT) verification runs at the edge level, verifying logins in under 50ms before loading UI assets.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-semantic-success shrink-0 mt-0.5" />
                <span className="text-sm text-ink/80 leading-relaxed">**Recharts Integration**: Implemented highly responsive visualization libraries to render fleet distribution and hourly sales figures dynamically on the client dashboard.</span>
              </li>
            </ul>
          </div>

          {/* Tech Block */}
          <div className="p-8 bg-surface-soft rounded-2xl border border-hairline space-y-4">
            <h4 className="font-bold text-lg text-ink">SaaS Core Architecture Achievements:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-1">
                <Cpu className="h-5 w-5 text-ink/60 mb-2" />
                <h5 className="font-bold text-sm">Lightweight APIs</h5>
                <p className="text-xs text-ink/70">Edge routing runs serverless API logic in under 15ms, eliminating database locks.</p>
              </div>
              <div className="space-y-1">
                <ShieldAlert className="h-5 w-5 text-ink/60 mb-2" />
                <h5 className="font-bold text-sm">Role-Based Security</h5>
                <p className="text-xs text-ink/70">Secure, encrypted login rules keep dispatch records secure from external attacks.</p>
              </div>
              <div className="space-y-1">
                <LineChart className="h-5 w-5 text-ink/60 mb-2" />
                <h5 className="font-bold text-sm">Dynamic Metrics</h5>
                <p className="text-xs text-ink/70">Interactive statistics render fleet capacity trends dynamically, with instant CSV/PDF downloads.</p>
              </div>
            </div>
          </div>

          {/* Impact */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-ink">The Impact: Zero lost events, 35% faster operations</h3>
            <p className="body-figma text-ink/75 leading-relaxed">
              The redesigned fleet portal achieved **sub-second database read and write cycles** on mobile devices, even during peak operational hours. Dispatch operators can now assign drivers in under 1 minute.
            </p>
            <p className="body-figma text-ink/75 leading-relaxed">
              With 100% database sync accuracy and zero query lockouts, the logistics firm reported a **35% increase in operational dispatch speed** and zero lost tracking events in the first quarter of deployment.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title="Need a custom SaaS dashboard or software system?"
        subtitle="Work with our Bangalore-based full stack developers to design and code a custom SaaS dashboard. Secure, edge-hosted, and fully tailored."
        ctaText="Request SaaS Proposal"
        ctaLink="/contact"
        colorBlock="lilac"
      />
    </div>
  );
}
