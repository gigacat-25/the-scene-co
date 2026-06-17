import Link from "next/link";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { JsonLd, webPageSchema, serviceSchema } from "@/components/json-ld";
import type { Metadata } from "next";
import { Instagram, Facebook, Youtube, Twitter, BarChart2, Calendar, Users, TrendingUp, Check } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Best Social Media Marketing Agency in Bangalore | SMM Services India",
  description:
    "Top social media marketing agency in Bangalore. We grow your brand presence on Instagram, Facebook, LinkedIn, and YouTube with organic content strategy and paid social campaigns.",
  keywords: [
    "best social media marketing agency in Bangalore",
    "social media marketing agency Bangalore",
    "social media marketing company Bangalore",
    "Instagram marketing Bangalore",
    "Facebook marketing Bangalore",
    "LinkedIn marketing Bangalore",
    "social media management Bangalore",
    "SMM services India",
    "social media advertising Bangalore",
    "content creation agency Bangalore",
  ],
  alternates: { canonical: "https://www.thescene.co.in/services/social-media-marketing" },
  openGraph: {
    url: "https://www.thescene.co.in/services/social-media-marketing",
    title: "Best Social Media Marketing Agency in Bangalore | The Scene Co.",
    description:
      "Grow your brand on Instagram, Facebook, LinkedIn, and YouTube with the best social media marketing agency in Bangalore. Organic + paid social under one roof.",
  },
};

const pageSchema = webPageSchema({
  name: "Best Social Media Marketing Agency in Bangalore | The Scene Co.",
  description:
    "Full-service social media marketing agency in Bangalore. Organic content strategy, community management, and paid social campaigns across all major platforms.",
  url: "/services/social-media-marketing",
  breadcrumbs: [
    { name: "Services", url: "https://www.thescene.co.in/services" },
    { name: "Social Media Marketing", url: "https://www.thescene.co.in/services/social-media-marketing" },
  ],
});

const serviceJsonLd = serviceSchema({
  name: "Social Media Marketing Services",
  description: "Full-service social media marketing in Bangalore. Content creation, community management, and paid social campaigns for Instagram, Facebook, LinkedIn, and YouTube.",
  url: "/services/social-media-marketing",
});

export default function SocialMediaMarketingPage() {
  const smServices = [
    {
      title: "Instagram Marketing",
      desc: "Grow followers, drive engagement, and convert through Instagram Reels, Stories, and Shopping. Custom content calendars tailored to your brand.",
      icon: Instagram,
    },
    {
      title: "Facebook Marketing & Ads",
      desc: "Reach precisely targeted audiences with Meta Ads. Lead generation campaigns, retargeting, and lookalike audiences that drive real results.",
      icon: Facebook,
    },
    {
      title: "YouTube Content Strategy",
      desc: "Build a YouTube presence with SEO-optimized video content, channel management, subscriber growth, and YouTube Ads campaigns.",
      icon: Youtube,
    },
    {
      title: "LinkedIn B2B Marketing",
      desc: "Position your business as an industry authority on LinkedIn. Thought leadership content, LinkedIn Ads, and B2B lead generation.",
      icon: Twitter,
    },
    {
      title: "Content Creation & Design",
      desc: "Professional graphic design, Reel scripting, photo editing, and caption writing — all content produced in-house and on-brand.",
      icon: Calendar,
    },
    {
      title: "Community Management",
      desc: "We respond to comments, DMs, and reviews across all platforms. Active community management builds loyalty and brand trust.",
      icon: Users,
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: "₹12,000/mo",
      platforms: "1 Platform",
      features: ["12 posts/month", "Basic graphics", "Caption writing", "Monthly analytics"],
    },
    {
      name: "Growth",
      price: "₹25,000/mo",
      platforms: "2–3 Platforms",
      features: ["20 posts/month", "Premium graphics + Reels", "Community management", "Paid social (₹10k ad budget)", "Bi-weekly reporting"],
      highlight: true,
    },
    {
      name: "Brand",
      price: "₹50,000/mo",
      platforms: "All Platforms",
      features: ["30+ posts/month", "Video production", "Full community mgmt", "Paid social (₹25k ad budget)", "Weekly strategy calls"],
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
            Best Social Media Marketing
            <br />
            <span className="font-bold">Agency in Bangalore.</span>
          </h1>
          <p className="body-lg-figma text-ink/75 max-w-2xl mb-8">
            Build a powerful brand presence and engage your audience consistently across Instagram, Facebook, LinkedIn, and YouTube. Organic strategy + paid social, all managed by one expert team.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary-figma">
              Start Growing Your Audience
            </Link>
            <Link href="#plans" className="btn-secondary-figma">
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* Services */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="eyebrow-mono text-accent-magenta">Social Media Services</span>
            <h2 className="text-ink text-3xl md:text-4xl font-bold mt-2">
              Grow Your Brand Presence Across Every Platform
            </h2>
            <p className="text-ink/70 mt-3 max-w-xl mx-auto">
              Consistent, high-quality social media content that builds your audience and converts followers into customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {smServices.map((s, i) => {
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

      {/* Results */}
      <section className="py-20 bg-surface-soft border-y border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "10x", label: "Avg Follower Growth in 3 Months" },
                { stat: "5%+", label: "Engagement Rate (vs 1% industry avg)" },
                { stat: "3.5x", label: "Meta Ads ROAS" },
                { stat: "50+", label: "Brands Managed Across India" },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-canvas rounded-2xl border border-hairline text-center">
                  <span className="font-mono text-ink text-2xl font-bold block mb-1">{item.stat}</span>
                  <span className="text-xs text-ink/65 uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>
            <div>
              <span className="eyebrow-mono text-accent-magenta">Why It Matters</span>
              <h2 className="text-ink text-3xl md:text-4xl font-bold mt-2 mb-4 leading-tight">
                Social media is the new storefront
              </h2>
              <p className="body-figma text-ink/75 leading-relaxed mb-4">
                Over 450 million Indians use social media daily. For Bangalore businesses, Instagram and LinkedIn are not optional — they are where your customers discover, evaluate, and decide to hire you. Our social media marketing team in Bangalore creates content that stops the scroll, builds brand loyalty, and turns followers into paying customers.
              </p>
              <ul className="space-y-2">
                {[
                  "In-house designers and content writers",
                  "Platform-specific strategies (not copy-paste content)",
                  "Monthly content calendar with approval workflow",
                  "Performance-linked reporting — real metrics, not vanity stats",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-semantic-success shrink-0" />
                    <span className="text-sm text-ink/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="plans" className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="eyebrow-mono text-accent-magenta">Pricing Plans</span>
            <h2 className="text-ink text-3xl md:text-4xl font-bold mt-2">
              Social Media Marketing Pricing Plans
            </h2>
            <p className="text-ink/70 mt-3 max-w-xl mx-auto">
              Choose the right social media plan to grow your brand presence and engage with your audience consistently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div key={i} className={`p-8 rounded-2xl border flex flex-col gap-6 ${plan.highlight ? "bg-ink text-canvas border-ink" : "bg-surface-soft border-hairline"}`}>
                <div>
                  <p className={`text-xs uppercase tracking-wider mb-1 ${plan.highlight ? "text-canvas/60" : "text-ink/50"}`}>{plan.platforms}</p>
                  <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? "text-canvas" : "text-ink"}`}>{plan.name}</h3>
                  <span className={`text-3xl font-mono font-bold ${plan.highlight ? "text-canvas" : "text-ink"}`}>{plan.price}</span>
                </div>
                <ul className="space-y-2 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2">
                      <Check className={`h-4 w-4 shrink-0 ${plan.highlight ? "text-canvas/70" : "text-semantic-success"}`} />
                      <span className={`text-sm ${plan.highlight ? "text-canvas/80" : "text-ink/75"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all ${plan.highlight ? "bg-canvas text-ink hover:bg-canvas/90" : "bg-ink text-canvas hover:bg-ink/90"}`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to grow on social media?"
        subtitle="Partner with the best social media marketing agency in Bangalore. Get a free social media audit and content strategy for your brand."
        ctaText="Get Free Audit"
        ctaLink="/contact"
        colorBlock="lilac"
      />
    </div>
  );
}
