import Link from "next/link";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { JsonLd, webPageSchema, serviceSchema } from "@/components/json-ld";
import type { Metadata } from "next";
import { Layers, Database, Shield, Cpu, Activity, LayoutGrid } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Best Web App Development Company in Bangalore, India | SaaS & Custom Dashboards",
  description:
    "Top web app development company in Bangalore. We design and build custom SaaS platforms, dashboards, and database portals with full-stack Next.js, Node.js, and Cloudflare. Serving businesses across India.",
  keywords: [
    "best web app development company Bangalore",
    "web app development company Bangalore",
    "SaaS app developers Bangalore",
    "custom dashboard development Bangalore",
    "Next.js web application agency",
    "software development company Bangalore",
    "full stack web application Bangalore",
    "SaaS development company India",
  ],
  alternates: { canonical: "https://www.thescene.co.in/services/web-app-development" },
  openGraph: {
    url: "https://www.thescene.co.in/services/web-app-development",
    title: "Best Web App Development Company in Bangalore, India | The Scene Co.",
    description:
      "Top SaaS products, customer portals, and web application dashboards in Bangalore. Built with robust, modern technology stacks.",
  },
};

const pageSchema = webPageSchema({
  name: "Web App Development Services in Bangalore, India | The Scene Co.",
  description:
    "Custom web application and software development services. We build high-speed Next.js dashboards, SaaS platforms, and APIs.",
  url: "/services/web-app-development",
  breadcrumbs: [
    { name: "Services", url: "https://www.thescene.co.in/services" },
    { name: "Web App Development", url: "https://www.thescene.co.in/services/web-app-development" },
  ],
});

const serviceJsonLd = serviceSchema({
  name: "Web App Development",
  description: "Bespoke SaaS products, custom client portals, and administrative web application dashboards built using Next.js and secure APIs.",
  url: "/services/web-app-development",
});

export default function WebAppDevelopmentServicePage() {
  const capabilities = [
    {
      title: "SaaS Dashboard Systems",
      desc: "Implement role-based access, automated billing, subscriber settings, and multi-tenant database infrastructure.",
      icon: LayoutGrid,
    },
    {
      title: "Secure Backends & APIs",
      desc: "Build lightweight Node.js handlers and REST/GraphQL APIs, integrated with SQL/NoSQL cloud databases.",
      icon: Cpu,
    },
    {
      title: "Data Visualization & Reports",
      desc: "Present business insights dynamically with responsive dashboards, interactive charts, and PDF exports.",
      icon: Activity,
    },
    {
      title: "Enterprise Grade Security",
      desc: "Configure HTTPS encryption, CSRF protection, secure JSON Web Tokens, and database access limits.",
      icon: Shield,
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
            Best Web App
            <br />
            <span className="font-bold">Development in Bangalore, India.</span>
          </h1>
          <p className="body-lg-figma text-ink/75 max-w-2xl mb-8">
            Code your brand's presence, the right way. We engineer custom-built SaaS platforms, customer dashboards, and web database portals with Next.js and serverless cloud architectures.
          </p>
          <div className="flex gap-4">
            <Link href="/contact" className="btn-primary-figma">
              Start Your App
            </Link>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* Capabilities */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="eyebrow-mono text-accent-magenta">Engineering</span>
            <h2 className="text-ink text-3xl md:text-4xl font-bold mt-2">
              Bespoke software solutions built to scale
            </h2>
            <p className="text-ink/70 mt-3 max-w-xl mx-auto">
              Our Bangalore-based software engineers build secure, performant web applications using clean component architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((c, i) => {
              const IconComp = c.icon;
              return (
                <div key={i} className="p-8 bg-surface-soft rounded-2xl border border-hairline flex gap-6 items-start">
                  <div className="p-3 bg-canvas rounded-xl border border-hairline text-ink shrink-0">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink mb-2">{c.title}</h3>
                    <p className="text-sm text-ink/70 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Web Vitals for Web Apps */}
      <section className="py-20 bg-surface-soft border-y border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-8 text-center">
          <span className="eyebrow-mono text-accent-magenta">Performance Check</span>
          <h3 className="text-2xl md:text-3xl font-bold text-ink">
            Fast apps keep users active and engaged
          </h3>
          <p className="body-figma text-ink/75 leading-relaxed">
            Slow web applications cause user frustration and churn. By building with Next.js App Router and deploying on Cloudflare edge servers, we achieve near-zero server latency. This means dashboard data loads instantly, operations execute without delay, and your SaaS product feels premium.
          </p>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title="Ready to build your web application?"
        subtitle="Contact our web app development company in Bangalore. Get a detailed technical proposal and database diagram for your product."
        ctaText="Get Started"
        ctaLink="/contact"
        colorBlock="lilac"
      />
    </div>
  );
}
