import Link from "next/link";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { JsonLd, webPageSchema, serviceSchema } from "@/components/json-ld";
import type { Metadata } from "next";
import { Check, ArrowRight, Laptop, Server, Database, Code, Globe, Shield } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Custom Website Development Services Bangalore | The Scene Co.",
  description:
    "Get responsive, SEO-friendly custom websites built with Next.js and Cloudflare. Professional website developers in Bangalore. No templates, free CMS, 1 year free hosting.",
  keywords: [
    "custom website development Bangalore",
    "web development services India",
    "website developers Bangalore",
    "professional web designers Bangalore",
    "Next.js developers Bangalore",
    "static website development Bangalore",
  ],
  alternates: { canonical: "https://www.thescene.co.in/services/web-development" },
  openGraph: {
    url: "https://www.thescene.co.in/services/web-development",
    title: "Custom Website Development Services in Bangalore | The Scene Co.",
    description:
      "Bespoke websites built from scratch. High speed, responsive layout, structured SEO framework, and custom CMS.",
  },
};

const pageSchema = webPageSchema({
  name: "Custom Website Development Services in Bangalore | The Scene Co.",
  description:
    "Bespoke website design and development services. We build lightweight, high-performance Next.js websites for businesses.",
  url: "/services/web-development",
  breadcrumbs: [
    { name: "Services", url: "https://www.thescene.co.in/services" },
    { name: "Web Development", url: "https://www.thescene.co.in/services/web-development" },
  ],
});

const serviceJsonLd = serviceSchema({
  name: "Custom Website Development",
  description: "Next.js-based premium website design & custom coding. Full control CMS, 1 year free hosting.",
  url: "/services/web-development",
});

export default function WebDevelopmentServicePage() {
  const steps = [
    {
      title: "Discovery & Planning",
      text: "We study your business goals, target audience, and competition to establish a clean sitemap and tech architecture.",
    },
    {
      title: "Visual UI/UX Design",
      text: "We design unique interactive interfaces from scratch. No templates. We ensure your brand guidelines are met.",
    },
    {
      title: "Performance Coding",
      text: "Our programmers write optimized Next.js scripts, ensuring clean semantic HTML structures for fast rendering.",
    },
    {
      title: "Deployment & Support",
      text: "We deploy the website on Cloudflare edge servers for 100% uptime and provide ongoing maintenance audits.",
    },
  ];

  const features = [
    {
      title: "1 Year Free hosting",
      desc: "Hosted on Cloudflare's secure edge content delivery network at zero cost.",
      icon: Globe,
    },
    {
      title: "Built-in Custom CMS",
      desc: "Edit text, modify layouts, publish blogs, and update your products with ease.",
      icon: Database,
    },
    {
      title: "Advanced Local SEO",
      desc: "Coded with JSON-LD schema, clean breadcrumbs, and optimized sitemaps.",
      icon: Server,
    },
    {
      title: "Clean React Architecture",
      desc: "Zero bloated scripts. We build with React and Tailwind for high-speed page loads.",
      icon: Code,
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
            Custom Website
            <br />
            <span className="font-bold">Development.</span>
          </h1>
          <p className="body-lg-figma text-ink/75 max-w-2xl mb-8">
            Code your brand's presence, the right way. We design and build professional, mobile-compatible websites from scratch. No slow templates, no generic platforms.
          </p>
          <div className="flex gap-4">
            <Link href="/contact" className="btn-primary-figma">
              Start Your Website
            </Link>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* Key Benefits */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="eyebrow-mono text-accent-magenta">Features</span>
            <h2 className="text-ink text-3xl md:text-4xl font-bold mt-2">
              Why hire us as your website developers?
            </h2>
            <p className="text-ink/70 mt-3 max-w-xl mx-auto">
              We focus on performance-checked, SEO-friendly professional websites that convert visitors into active clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((f, i) => {
              const IconComp = f.icon;
              return (
                <div key={i} className="p-8 bg-surface-soft rounded-2xl border border-hairline flex gap-6 items-start">
                  <div className="p-3 bg-canvas rounded-xl border border-hairline text-ink shrink-0">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink mb-2">{f.title}</h3>
                    <p className="text-sm text-ink/70 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-20 bg-surface-soft border-y border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="eyebrow-mono text-accent-magenta">Our DNA</span>
              <h2 className="text-ink text-3xl md:text-4xl font-bold leading-tight">
                A structured process for premium results
              </h2>
              <p className="body-figma text-ink/75 leading-relaxed">
                Co-creation is our DNA. We don't just dump code and walk away. We work alongside your team to align sitemap structures, target keyword clusters, and user interface preferences.
              </p>
              <div className="pt-2">
                <Link href="/portfolio" className="btn-secondary-figma inline-flex items-center gap-2">
                  <span>See our work in action</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {steps.map((s, i) => (
                <div key={i} className="p-6 bg-canvas rounded-2xl border border-hairline flex gap-4">
                  <span className="font-mono font-bold text-ink/40 text-lg">0{i+1}</span>
                  <div>
                    <h4 className="font-bold text-ink mb-1">{s.title}</h4>
                    <p className="text-sm text-ink/70 leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Expansion for SEO */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center">
            Looking for a local website development company in Bangalore?
          </h2>
          <p className="body-figma text-ink/75 text-center leading-relaxed">
            Hiring the right digital agency makes all the difference. While freelancers might build standard static pages, our professional developers specialize in dynamic, high-speed Next.js setups. We build websites that load in milliseconds, securing higher organic crawl rates from search engine bots.
          </p>
          <div className="p-8 bg-block-cream rounded-2xl text-ink space-y-4">
            <h4 className="font-bold text-lg">Did you know?</h4>
            <p className="text-sm text-ink/80 leading-relaxed">
              Google ranks websites based on Core Web Vitals (Largest Contentful Paint, First Input Delay, and Cumulative Layout Shift). By avoiding slow platforms and page templates, we make sure your website remains fast, highly interactive, and secure.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title="Ready to launch your website?"
        subtitle="Contact our web development experts in Bangalore today. We'll deliver a custom layout, free domain registration, and Cloudflare hosting setup."
        ctaText="Get Started"
        ctaLink="/contact"
        colorBlock="lime"
      />
    </div>
  );
}
