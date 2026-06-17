import Link from "next/link";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { JsonLd, webPageSchema, serviceSchema } from "@/components/json-ld";
import type { Metadata } from "next";
import { TrendingUp, Target, BarChart2, Search, Mail, Share2, Check, ArrowRight } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Best Digital Marketing Agency in Bangalore | Grow Faster Online",
  description:
    "Partner with the best digital marketing agency in Bangalore to boost online visibility, drive quality leads, and grow your brand with proven ROI-driven strategies. SEO, PPC, social media & more.",
  keywords: [
    "best digital marketing agency in Bangalore",
    "digital marketing agency Bangalore",
    "digital marketing company Bangalore",
    "online marketing agency Bangalore",
    "SEO company Bangalore",
    "PPC agency Bangalore",
    "social media marketing Bangalore",
    "digital marketing services India",
    "lead generation Bangalore",
    "performance marketing India",
  ],
  alternates: { canonical: "https://www.thescene.co.in/services/digital-marketing" },
  openGraph: {
    url: "https://www.thescene.co.in/services/digital-marketing",
    title: "Best Digital Marketing Agency in Bangalore | The Scene Co.",
    description:
      "ROI-driven digital marketing services in Bangalore — SEO, Google Ads, social media, email marketing, and content strategy. Grow your brand online with The Scene Co.",
  },
};

const pageSchema = webPageSchema({
  name: "Best Digital Marketing Agency in Bangalore | The Scene Co.",
  description:
    "Full-service digital marketing agency in Bangalore. SEO, Google Ads, social media management, content marketing, and performance analytics.",
  url: "/services/digital-marketing",
  breadcrumbs: [
    { name: "Services", url: "https://www.thescene.co.in/services" },
    { name: "Digital Marketing", url: "https://www.thescene.co.in/services/digital-marketing" },
  ],
});

const serviceJsonLd = serviceSchema({
  name: "Digital Marketing Services",
  description: "Full-service digital marketing agency in Bangalore. SEO, PPC, social media, email marketing, and content strategy to grow your brand online.",
  url: "/services/digital-marketing",
});

export default function DigitalMarketingPage() {
  const services = [
    {
      title: "Search Engine Optimization (SEO)",
      desc: "Rank higher on Google for high-intent keywords. We handle on-page SEO, technical audits, backlink building, and local SEO for Bangalore businesses.",
      icon: Search,
    },
    {
      title: "Google Ads & PPC Campaigns",
      desc: "Get immediate, qualified traffic with precision-targeted Google Search, Display, and Shopping campaigns. Maximum ROI, minimum wasted spend.",
      icon: Target,
    },
    {
      title: "Social Media Marketing",
      desc: "Build brand awareness and community across Instagram, Facebook, LinkedIn, and YouTube. Organic growth + paid social in one strategy.",
      icon: Share2,
    },
    {
      title: "Email Marketing Automation",
      desc: "Nurture leads and retain customers with automated drip sequences, promotional blasts, and personalized newsletters.",
      icon: Mail,
    },
    {
      title: "Content Marketing & Strategy",
      desc: "Publish keyword-rich blog posts, case studies, and landing pages that attract organic traffic and build domain authority over time.",
      icon: TrendingUp,
    },
    {
      title: "Analytics & Performance Reporting",
      desc: "Track every click, lead, and conversion with Google Analytics 4, Meta Pixel, and custom KPI dashboards. Transparent monthly reports.",
      icon: BarChart2,
    },
  ];

  const results = [
    "3x average increase in organic traffic within 6 months",
    "Google Ads ROAS of 4x+ across e-commerce clients",
    "Local SEO rankings in top-3 for Bangalore keyword clusters",
    "40%+ improvement in email open rates with automation",
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
            Best Digital Marketing
            <br />
            <span className="font-bold">Agency in Bangalore.</span>
          </h1>
          <p className="body-lg-figma text-ink/75 max-w-2xl mb-8">
            We craft ROI-driven digital strategies that put your brand in front of the right audience at the right time. SEO, Google Ads, social media, and content — all under one roof.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary-figma">
              Start Growing Today
            </Link>
            <Link href="/portfolio" className="btn-secondary-figma">
              See Our Results
            </Link>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* Services Grid */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="eyebrow-mono text-accent-magenta">Our Digital Marketing Services</span>
            <h2 className="text-ink text-3xl md:text-4xl font-bold mt-2">
              Powering Digital Excellence for Bangalore Businesses
            </h2>
            <p className="text-ink/70 mt-3 max-w-xl mx-auto">
              A full-service digital marketing agency driving measurable growth across every online channel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
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

      {/* Results Section */}
      <section className="py-20 bg-surface-soft border-y border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="eyebrow-mono text-accent-magenta">Track Record</span>
              <h2 className="text-ink text-3xl md:text-4xl font-bold mt-2 mb-4 leading-tight">
                Results our clients actually see
              </h2>
              <p className="body-figma text-ink/75 leading-relaxed mb-6">
                As a digital marketing agency in Bangalore, we measure every campaign by the metrics that matter most to your business — not vanity metrics. Every strategy starts with your growth goals.
              </p>
              <ul className="space-y-3">
                {results.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-semantic-success shrink-0 mt-0.5" />
                    <span className="text-sm text-ink/80 leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "3x", label: "Organic Traffic Growth" },
                { stat: "4x+", label: "Google Ads ROAS" },
                { stat: "Top 3", label: "Local SEO Rankings" },
                { stat: "40%+", label: "Email Open Rate Lift" },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-canvas rounded-2xl border border-hairline text-center">
                  <span className="font-mono text-ink text-3xl font-bold block mb-1">{item.stat}</span>
                  <span className="text-xs text-ink/65 uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-ink">
            Why choose a digital marketing agency in Bangalore?
          </h2>
          <p className="body-figma text-ink/75 leading-relaxed">
            Bangalore is India's most competitive digital market. Whether you're a startup, SME, or established enterprise, being visible on Google Search is non-negotiable. Our digital marketing services in Bangalore combine technical SEO expertise with creative content strategies to help your brand dominate search results, social feeds, and inbox inboxes. Unlike generalist agencies, we specialize in high-growth industries — e-commerce, SaaS, hospitality, and professional services.
          </p>
          <div className="p-8 bg-surface-soft rounded-2xl text-ink space-y-3 text-left">
            <h4 className="font-bold text-lg">What separates us from other digital marketing agencies in Bangalore?</h4>
            <p className="text-sm text-ink/80 leading-relaxed">
              We combine web development expertise with digital marketing strategy. Most agencies only manage ads or SEO — we build your website AND market it, ensuring your landing pages are optimized for conversions before we spend a single rupee on ads. This integrated approach consistently outperforms siloed agency relationships.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to grow your brand online?"
        subtitle="Partner with the best digital marketing agency in Bangalore. Get a free digital audit and custom growth strategy for your business."
        ctaText="Get Free Audit"
        ctaLink="/contact"
        colorBlock="lime"
      />
    </div>
  );
}
