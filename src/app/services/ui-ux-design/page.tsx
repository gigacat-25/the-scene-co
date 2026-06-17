import Link from "next/link";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { JsonLd, webPageSchema, serviceSchema } from "@/components/json-ld";
import type { Metadata } from "next";
import { Palette, Layout, Layers, UserCheck, MonitorSmartphone, Eye, Check } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Best UI UX Design Company in Bangalore, India | User Experience Design Agency",
  description:
    "Partner with the best UI UX design company in Bangalore, India. We design high-fidelity interactive wireframes, custom design systems, and premium SaaS dashboards that convert visitors. No templates.",
  keywords: [
    "best UI UX design company in Bangalore",
    "UI UX design agency Bangalore",
    "user experience design company Bangalore",
    "user interface design Bangalore",
    "Figma designers Bangalore",
    "custom design system Bangalore",
    "UX research Bangalore",
    "SaaS dashboard UI design India",
    "experience design agency India",
  ],
  alternates: { canonical: "https://www.thescene.co.in/services/ui-ux-design" },
  openGraph: {
    url: "https://www.thescene.co.in/services/ui-ux-design",
    title: "Best UI UX Design Company in Bangalore, India | The Scene Co.",
    description:
      "Interactive wireframes, custom design systems, and responsive layouts. Top UI UX design company in Bangalore, India.",
  },
};

const pageSchema = webPageSchema({
  name: "Best UI UX Design Company in Bangalore, India | The Scene Co.",
  description:
    "Professional user interface (UI) and user experience (UX) design services in Bangalore. Figma prototypes, design systems, and user research.",
  url: "/services/ui-ux-design",
  breadcrumbs: [
    { name: "Services", url: "https://www.thescene.co.in/services" },
    { name: "UI/UX Design", url: "https://www.thescene.co.in/services/ui-ux-design" },
  ],
});

const serviceJsonLd = serviceSchema({
  name: "UI/UX Design Services",
  description: "User research, wireframing, high-fidelity prototypes, and custom design system building for mobile apps, SaaS dashboards, and web designs.",
  url: "/services/ui-ux-design",
});

export default function UiUxDesignPage() {
  const services = [
    {
      title: "User Research & Strategy",
      desc: "We analyze customer behaviors, build detailed user personas, and map out complete user flows to align visual design with business goals.",
      icon: UserCheck,
    },
    {
      title: "Wireframing & Prototyping",
      desc: "We construct low-fidelity structural blueprints and interactive high-fidelity Figma prototypes to test usability before developer coding.",
      icon: Layout,
    },
    {
      title: "Custom Design Systems",
      desc: "We build centralized typography hierarchies, harmonious color palettes, reusable components, and spacing tokens for product consistency.",
      icon: Layers,
    },
    {
      title: "SaaS Dashboard UI Design",
      desc: "Data-heavy layouts made clear and intuitive. We structure grids, filters, navigation bars, and data tables for high efficiency.",
      icon: Palette,
    },
    {
      title: "Mobile App Layouts",
      desc: "Optimized mobile screen configurations for iOS and Android, focusing on thumb zone access and smooth, gesture-friendly structures.",
      icon: MonitorSmartphone,
    },
    {
      title: "Usability Testing & Audit",
      desc: "We analyze drop-off points, check accessibility standards (WCAG), and perform heuristic reviews to maximize checkout conversion rates.",
      icon: Eye,
    },
  ];

  const designProcess = [
    {
      step: "01",
      title: "Discovery & User Flows",
      text: "We study target user habits, project requirements, and industry standards to draft logical site maps and navigation architectures.",
    },
    {
      step: "02",
      title: "Wireframe Blueprints",
      text: "We design structural layouts for all critical screens, defining content hierarchy and call-to-actions before styling details.",
    },
    {
      step: "03",
      title: "High-Fidelity UI Styling",
      text: "We apply custom visual styles, premium typography, micro-interactions, and color schemes, creating interactive Figma mockups.",
    },
    {
      step: "04",
      title: "Developer Handoff",
      text: "We hand over fully documented design systems, auto-layout files, and vector assets directly to full-stack engineers.",
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
            Best UI UX Design
            <br />
            <span className="font-bold">Company in Bangalore, India.</span>
          </h1>
          <p className="body-lg-figma text-ink/75 max-w-2xl mb-8">
            We craft intuitive digital interfaces that convert visitors into active customers. We build customized design systems, mockups, and interactive prototypes tailored for high-growth SaaS, mobile, and web products.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary-figma">
              Start Designing
            </Link>
            <Link href="/portfolio" className="btn-secondary-figma">
              See Design Portfolio
            </Link>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* Services Grid */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="eyebrow-mono text-accent-magenta">Experience Design</span>
            <h2 className="text-ink text-3xl md:text-4xl font-bold mt-2">
              Bespoke Interfaces Tailored for Conversion & Usability
            </h2>
            <p className="text-ink/70 mt-3 max-w-xl mx-auto">
              Our Bangalore design company creates interactive layouts that balance brand identity with smooth user interfaces.
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

      {/* Process */}
      <section className="py-20 bg-surface-soft border-y border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="eyebrow-mono text-accent-magenta">Design Process</span>
              <h2 className="text-ink text-3xl md:text-4xl font-bold leading-tight">
                Our approach to modern product styling
              </h2>
              <p className="body-figma text-ink/75 leading-relaxed">
                We follow a user-centric design loop. By creating structural wireframes and validating flows early, we minimize developer rewrite costs and deliver pixel-perfect digital experiences.
              </p>
            </div>
            <div className="lg:col-span-8 space-y-4">
              {designProcess.map((s, i) => (
                <div key={i} className="p-6 bg-canvas rounded-2xl border border-hairline flex gap-4">
                  <span className="font-mono font-bold text-ink/30 text-xl shrink-0">{s.step}</span>
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

      {/* SEO Content */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-ink">
            Why choose a custom UI UX design company over presets?
          </h2>
          <p className="body-figma text-ink/75 leading-relaxed">
            Most software failures are caused by bad user experience. Generic templates or UI kits make your product look exactly like your competitors and fail to accommodate specific user flows. By partnering with a top-rated experience design company like The Scene Co., you get custom interactive wireframes and visual styles designed around user behaviors. This increases customer lifetime value (LTV) and cuts support overhead.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {[
              { stat: "400%", label: "Average ROI on UX design investments" },
              { stat: "88%", label: "Shoppers less likely to return after a bad UX" },
              { stat: "2x", label: "Increase in customer retention with clean UI" },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-surface-soft rounded-xl border border-hairline text-center">
                <span className="font-mono text-ink text-2xl font-bold block mb-1">{item.stat}</span>
                <span className="text-xs text-ink/65">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to elevate your product UI?"
        subtitle="Consult our expert design team in Bangalore today. We'll set up interactive wireframes and a detailed user flow proposal."
        ctaText="Get Started"
        ctaLink="/contact"
        colorBlock="coral"
      />
    </div>
  );
}
