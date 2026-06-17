import Link from "next/link";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { JsonLd, webPageSchema, serviceSchema } from "@/components/json-ld";
import type { Metadata } from "next";
import { Search, Link2, FileText, MapPin, BarChart2, Settings, Check } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Best SEO Company in Bangalore | SEO Services & Packages India",
  description:
    "Top SEO company in Bangalore offering on-page SEO, technical audits, local SEO, and link building to grow your organic traffic. Proven SEO services for businesses across India.",
  keywords: [
    "best SEO company in Bangalore",
    "SEO company Bangalore",
    "SEO services Bangalore",
    "SEO agency Bangalore",
    "local SEO Bangalore",
    "technical SEO services India",
    "on-page SEO Bangalore",
    "link building services India",
    "SEO packages Bangalore",
    "search engine optimization Bangalore",
    "Google ranking services Bangalore",
  ],
  alternates: { canonical: "https://www.thescene.co.in/services/seo" },
  openGraph: {
    url: "https://www.thescene.co.in/services/seo",
    title: "Best SEO Company in Bangalore | SEO Services & Packages | The Scene Co.",
    description:
      "Top SEO company in Bangalore. On-page SEO, technical audits, local SEO, and link building to grow your organic visibility and outrank competitors.",
  },
};

const pageSchema = webPageSchema({
  name: "Best SEO Company in Bangalore | SEO Services & Packages | The Scene Co.",
  description:
    "Full-service SEO company in Bangalore. On-page optimization, technical SEO, local SEO, and link building services.",
  url: "/services/seo",
  breadcrumbs: [
    { name: "Services", url: "https://www.thescene.co.in/services" },
    { name: "SEO Services", url: "https://www.thescene.co.in/services/seo" },
  ],
});

const serviceJsonLd = serviceSchema({
  name: "SEO Services",
  description: "Full-service SEO company in Bangalore offering on-page SEO, technical audits, local SEO, and link building.",
  url: "/services/seo",
});

export default function SEOServicesPage() {
  const seoServices = [
    {
      title: "On-Page SEO Optimization",
      desc: "We optimize every page — title tags, meta descriptions, H1-H3 structure, keyword density, internal linking, and image alt text — to maximize Google ranking potential.",
      icon: FileText,
    },
    {
      title: "Technical SEO Audit",
      desc: "We audit your site's crawlability, indexing, Core Web Vitals, schema markup, canonical tags, sitemap, and robots.txt to fix any issues blocking Google.",
      icon: Settings,
    },
    {
      title: "Local SEO for Bangalore Businesses",
      desc: "Rank in Google's 'near me' search results and Google Maps for Bangalore-specific keywords. GMB optimization, local citations, and review management.",
      icon: MapPin,
    },
    {
      title: "Link Building & Authority",
      desc: "Earn high-quality backlinks from relevant Indian and global websites to boost your domain authority and keyword rankings on Google Search.",
      icon: Link2,
    },
    {
      title: "Keyword Research & Strategy",
      desc: "We identify the exact search terms your target customers use — high intent, low competition — and build a content calendar around them.",
      icon: Search,
    },
    {
      title: "SEO Reporting & Analytics",
      desc: "Monthly ranking reports, traffic analytics, and competitor tracking. You'll always know exactly where your keywords stand and what we're doing about it.",
      icon: BarChart2,
    },
  ];

  const seoResults = [
    "Top-3 Google rankings for 'web development company Bangalore'",
    "150% increase in organic sessions within 4 months",
    "Core Web Vitals passing scores (LCP, CLS, FID) on all pages",
    "Featured snippet captures for 15+ target keywords",
  ];

  const packages = [
    {
      name: "Starter",
      price: "₹15,000/mo",
      features: ["10 target keywords", "On-page SEO", "Monthly reporting", "GMB optimization"],
    },
    {
      name: "Growth",
      price: "₹30,000/mo",
      features: ["25 target keywords", "Technical SEO audit", "Link building (5/mo)", "Content creation (4 blogs)", "Bi-weekly reporting"],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Unlimited keywords", "Full technical overhaul", "Aggressive link building", "Weekly reporting", "Dedicated SEO manager"],
    },
  ];

  return (
    <div className="flex flex-col bg-canvas text-ink overflow-hidden">
      <JsonLd data={pageSchema} />
      <JsonLd data={serviceJsonLd} />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-surface-soft border-b border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <Link href="/services" className="eyebrow-mono text-ink/50 hover:text-ink transition-colors mb-4 inline-flex items-center gap-2">
            &larr; All Services
          </Link>
          <h1 className="display-lg text-ink mb-6 mt-2">
            Best SEO Company
            <br />
            <span className="font-bold">in Bangalore.</span>
          </h1>
          <p className="body-lg-figma text-ink/75 max-w-2xl mb-8">
            Grow your online visibility and generate consistent organic traffic with proven SEO strategies. We help Bangalore businesses rank higher on Google — and stay there.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary-figma">
              Get Free SEO Audit
            </Link>
            <Link href="#packages" className="btn-secondary-figma">
              View SEO Packages
            </Link>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* Services */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="eyebrow-mono text-accent-magenta">Our SEO Services</span>
            <h2 className="text-ink text-3xl md:text-4xl font-bold mt-2">
              Full-Service SEO That Gets You on Page 1
            </h2>
            <p className="text-ink/70 mt-3 max-w-xl mx-auto">
              We handle every SEO layer — on-page, technical, local, and off-page — so your site ranks for the keywords your customers actually search.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seoServices.map((s, i) => {
              const IconComp = s.icon;
              return (
                <div key={i} className="p-8 bg-surface-soft rounded-2xl border border-hairline flex flex-col gap-4">
                  <div className="p-3 bg-canvas rounded-xl border border-hairline text-ink w-fit">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink mb-2">{s.title}</h3>
                    <p className="text-sm text-ink/70 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why we're different */}
      <section className="py-20 bg-surface-soft border-y border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="eyebrow-mono text-accent-magenta">Our Advantage</span>
              <h2 className="text-ink text-3xl md:text-4xl font-bold mt-2 mb-4 leading-tight">
                SEO built on code, not shortcuts
              </h2>
              <p className="body-figma text-ink/75 leading-relaxed mb-6">
                Unlike pure-SEO agencies that make surface-level changes, we implement SEO at the code level. We fix your Core Web Vitals in the actual codebase, implement proper JSON-LD schema markup, correct canonical tags, and build clean sitemap structures — all things that most agencies can't do because they don't have in-house developers.
              </p>
              <ul className="space-y-3">
                {seoResults.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-semantic-success shrink-0 mt-0.5" />
                    <span className="text-sm text-ink/80 leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "Page 1", label: "Google Rankings Delivered" },
                { stat: "150%", label: "Avg Organic Traffic Boost" },
                { stat: "4mo", label: "Average Time to Rank" },
                { stat: "100%", label: "Transparent Reporting" },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-canvas rounded-2xl border border-hairline text-center">
                  <span className="font-mono text-ink text-2xl font-bold block mb-1">{item.stat}</span>
                  <span className="text-xs text-ink/65 uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="eyebrow-mono text-accent-magenta">SEO Packages</span>
            <h2 className="text-ink text-3xl md:text-4xl font-bold mt-2">
              SEO Pricing Plans for Every Business
            </h2>
            <p className="text-ink/70 mt-3 max-w-xl mx-auto">
              Choose the right SEO plan to grow your online visibility and generate consistent organic traffic in Bangalore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div key={i} className={`p-8 rounded-2xl border flex flex-col gap-6 ${pkg.highlight ? "bg-ink text-canvas border-ink" : "bg-surface-soft border-hairline"}`}>
                <div>
                  <h3 className={`text-xl font-bold mb-1 ${pkg.highlight ? "text-canvas" : "text-ink"}`}>{pkg.name}</h3>
                  <span className={`text-3xl font-mono font-bold ${pkg.highlight ? "text-canvas" : "text-ink"}`}>{pkg.price}</span>
                </div>
                <ul className="space-y-2 flex-1">
                  {pkg.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2">
                      <Check className={`h-4 w-4 shrink-0 ${pkg.highlight ? "text-canvas/70" : "text-semantic-success"}`} />
                      <span className={`text-sm ${pkg.highlight ? "text-canvas/80" : "text-ink/75"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all ${pkg.highlight ? "bg-canvas text-ink hover:bg-canvas/90" : "bg-ink text-canvas hover:bg-ink/90"}`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to rank #1 on Google?"
        subtitle="Get a free SEO audit from the best SEO company in Bangalore. We'll identify exactly why your site isn't ranking and what it'll take to fix it."
        ctaText="Get Free SEO Audit"
        ctaLink="/contact"
        colorBlock="navy"
      />
    </div>
  );
}
