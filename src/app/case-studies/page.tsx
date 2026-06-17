import Link from "next/link";
import { MarqueeStrip } from "@/components/marquee-strip";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd, webPageSchema } from "@/components/json-ld";
import type { Metadata } from "next";
import { ArrowRight, BarChart3, Clock, CheckCircle } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Web Development & SEO Case Studies | The Scene Co.",
  description:
    "Explore our case studies. Learn how The Scene Co. builds high-performance Next.js websites, SaaS dashboards, and SEO strategies that drive traffic and revenue in India.",
  keywords: [
    "web development case studies",
    "SEO case studies India",
    "e-commerce migration cases",
    "SaaS dashboard design examples",
    "local SEO results Bangalore",
  ],
  alternates: { canonical: "https://www.thescene.co.in/case-studies" },
  openGraph: {
    url: "https://www.thescene.co.in/case-studies",
    title: "Web Development & SEO Case Studies | The Scene Co.",
    description:
      "Real business results. Learn how our custom Next.js engineering and SEO audits drive traffic and sales for clients across India.",
  },
};

const pageSchema = webPageSchema({
  name: "Web Development & SEO Case Studies | The Scene Co.",
  description:
    "Real business results. Custom Next.js e-commerce migrations, SaaS dashboard designs, and local SEO campaigns from The Scene Co.",
  url: "/case-studies",
  breadcrumbs: [{ name: "Case Studies", url: "https://www.thescene.co.in/case-studies" }],
});

const caseStudiesList = [
  {
    category: "E-Commerce",
    title: "Seventy-Five Percent Speed Increase for a Fashion Brand Migration",
    slug: "ecommerce-fashion-speed-optimization",
    metric: "+42% Conversion Rate",
    icon: BarChart3,
    excerpt: "How we migrated a fashion retail store from Shopify to Next.js on Cloudflare, cutting load times by 75% and reducing checkout bounce rates.",
    tags: ["Next.js", "Tailwind CSS", "Cloudflare", "Razorpay"],
    colorBlock: "bg-block-lime",
  },
  {
    category: "SaaS & Custom Software",
    title: "Fleet Dashboard and Custom ERP System for a Logistics Firm",
    slug: "logistics-saas-dashboard-design",
    metric: "Near-Zero Latency",
    icon: Clock,
    excerpt: "Designing a high-frequency fleet tracking dashboard and CRM for 200+ active operators using React, Node.js, and Cloudflare D1.",
    tags: ["Next.js App Router", "Cloudflare D1 SQL", "Tailwind CSS", "Recharts"],
    colorBlock: "bg-block-lilac",
  },
  {
    category: "SEO & Local Search",
    title: "Ranking #1 for Regional Healthcare Services in Bangalore",
    slug: "healthcare-website-seo-bangalore",
    metric: "+320% Organic Leads",
    icon: CheckCircle,
    excerpt: "Revamping the web presence of a Bangalore clinic, embedding custom FAQ schemas, technical SEO, and keyword-first pages to outrank directories.",
    tags: ["SEO Audit", "Structured Schema", "Content Strategy", "Speed Optimization"],
    colorBlock: "bg-block-mint",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col bg-canvas text-ink min-h-screen">
      <JsonLd data={pageSchema} />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-surface-soft border-b border-hairline">
        <div className="container mx-auto px-4 sm:px-6 pt-10 pb-8 max-w-6xl">
          <span className="eyebrow-mono text-ink/60 block mb-4">Case Studies</span>
          <h1
            className="text-ink mb-6"
            style={{ fontSize: "clamp(36px, 5vw, 86px)", fontWeight: 340, lineHeight: 1.0, letterSpacing: "-1.72px" }}
          >
            Real results for
            <br />
            <span style={{ fontWeight: 700 }}>real businesses.</span>
          </h1>
          <p className="body-lg-figma text-ink/70 max-w-2xl">
            Read how our custom coding, web application architectures, and technical SEO strategies drive traffic and revenue. No templates, no shortcuts.
          </p>
        </div>
      </section>

      <MarqueeStrip />

      {/* List */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-12">
          {caseStudiesList.map((cs, i) => {
            const Icon = cs.icon;
            return (
              <div
                key={i}
                className="bg-canvas border border-hairline rounded-2xl overflow-hidden hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 grid grid-cols-1 md:grid-cols-12 group"
              >
                {/* Visual Block Left */}
                <div className={`${cs.colorBlock} p-8 md:col-span-4 flex flex-col justify-between items-center text-center min-h-[220px] md:min-h-0`}>
                  <span className="text-xs font-bold font-mono tracking-widest uppercase text-ink/60">
                    {cs.category}
                  </span>
                  <div className="p-4 bg-ink/10 rounded-full my-4">
                    <Icon className="h-10 w-10 text-ink" />
                  </div>
                  <span className="text-lg font-bold font-mono text-ink leading-tight">
                    {cs.metric}
                  </span>
                </div>

                {/* Content Block Right */}
                <div className="p-8 md:col-span-8 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-ink leading-tight group-hover:underline">
                      <Link href={`/case-studies/${cs.slug}`}>
                        {cs.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-ink/75 leading-relaxed">
                      {cs.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {cs.tags.map((tag) => (
                        <span key={tag} className="caption-mono text-ink/60 bg-surface-soft px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="text-sm font-bold text-ink/70 group-hover:text-ink inline-flex items-center gap-1.5"
                    >
                      Read the full story
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBanner
        title="Want similar results for your business?"
        subtitle="Schedule a free technical consultation. We'll audit your current site speed and SEO and outline a custom roadmap."
        ctaText="Get Free Consultation"
        ctaLink="/contact"
        colorBlock="coral"
      />
    </div>
  );
}
