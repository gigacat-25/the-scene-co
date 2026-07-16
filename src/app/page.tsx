import { Hero } from "@/components/sections/hero";
import { FeatureStatusGrid } from "@/components/sections/feature-status-grid";
import { SolutionsGrid } from "@/components/sections/solutions-grid";
import { Packages } from "@/components/sections/packages";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { MarqueeStrip } from "@/components/marquee-strip";
import { AboutDiagnostics } from "@/components/sections/about-diagnostics";
import { AnalogCounters } from "@/components/sections/analog-counters";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ClientsCarousel } from "@/components/sections/clients-carousel";
import { FAQ } from "@/components/sections/faq";
import { JsonLd, webPageSchema, faqSchema } from "@/components/json-ld";
import {
  getPublishedTestimonials,
  getPublishedFAQs,
  getPublicSettings,
  getPublishedClients,
} from "@/lib/db";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "The Scene | Creative Technology & Production",
  description:
    "The Scene combines design, technology, strategy and production to build premium websites, software, digital marketing campaigns, and unforgettable events.",
  keywords: [
    "creative technology company",
    "software development",
    "event production company",
    "digital marketing agency",
    "branding and creative design",
    "custom websites bangalore",
  ],
  alternates: { canonical: "https://www.thescene.co.in" },
  openGraph: {
    url: "https://www.thescene.co.in",
    title: "The Scene | Creative Technology & Production",
    description:
      "Design, technology, strategy and production under one roof. Premium websites, software, digital marketing, and unforgettable events.",
  },
};

export default async function Home() {
  const testimonials = await getPublishedTestimonials();
  const faqs = await getPublishedFAQs();
  const settings = await getPublicSettings().catch(() => ({}));
  const clients = await getPublishedClients().catch(() => []);

  const homePageSchema = webPageSchema({
    name: "The Scene — Cinematic Web & Experience Production",
    description:
      "We don't organize events. We produce experiences. Premium custom websites, e-commerce stores, and POS systems built from scratch.",
    url: "/",
  });

  const homeFaqSchema =
    faqs.length > 0
      ? faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })))
      : null;

  return (
    <div className="flex flex-col bg-[#050505] text-[#F5F2EE]">
      <JsonLd data={homePageSchema} />
      {homeFaqSchema && <JsonLd data={homeFaqSchema} />}

      {/* 1. Hero Section (Split Layout) */}
      <Hero settings={settings} />

      {/* 2. Marquee tech strip */}
      <MarqueeStrip />

      {/* 3. Feature status grid (Responsive, Fast, Secure, SEO) */}
      <FeatureStatusGrid />

      {/* 4. Complete solutions overlapping screen grid */}
      <SolutionsGrid />

      {/* 5. Numbers Section (Analog Counters strip) */}
      <AnalogCounters />

      {/* 6. Brands We Have Worked With carousel */}
      <ClientsCarousel clients={clients} />

      {/* 7. Stats highlight cards: 50+ Projects, 1yr Hosting, 100% Custom, 24hr Support */}
      <section className="w-full py-16 bg-[#080808]">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: "50+", label: "Projects Delivered" },
              { number: "1yr", label: "Free Hosting Included" },
              { number: "100%", label: "Custom — No Templates" },
              { number: "24hr", label: "Support Response" },
            ].map((stat, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center justify-center text-center p-8 border border-[#7B6A60]/20 bg-[#0b0a09] rounded-sm overflow-hidden group hover:border-[#D86B2A]/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#D86B2A]/0 to-[#D86B2A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="font-mono text-3xl md:text-4xl font-black text-[#D86B2A] mb-2 relative z-10">
                  {stat.number}
                </span>
                <span className="font-mono text-[10px] md:text-xs text-[#7B6A60] tracking-widest uppercase relative z-10">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Detailed services with What You Get deliverables */}
      <div id="services" className="py-4">
        <Packages />
      </div>

      {/* 9. About Section (System Diagnostics) */}
      <div id="about" className="py-4">
        <AboutDiagnostics />
      </div>

      {/* 10. Testimonials (VHS Subtitles) */}
      <div id="testimonials" className="py-4">
        <Testimonials testimonials={testimonials} />
      </div>

      {/* 11. FAQ Accordion */}
      <div id="faq" className="py-4">
        <FAQ faqs={faqs} />
      </div>

      {/* 12. Interactive CTA Banner */}
      <CtaBanner />

      {/* 13. Contact Section (Production Control Panel) */}
      <div id="contact" className="py-4">
        <Contact settings={settings} />
      </div>
    </div>
  );
}
