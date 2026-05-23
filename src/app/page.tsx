import { Hero } from "@/components/sections/hero";
import { Packages } from "@/components/sections/packages";
import { Leadership } from "@/components/sections/leadership";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { ClientsCarousel } from "@/components/sections/clients-carousel";
import { JsonLd, webPageSchema, faqSchema } from "@/components/json-ld";
import {
  getPublishedTestimonials,
  getPublishedFAQs,
  getPublishedTeamMembers,
  getPublishedClients,
  getAllSettings,
} from "@/lib/db";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Custom Website, E-Commerce & POS Development in India | The Scene Co.",
  description:
    "The Scene Co. builds premium custom websites, e-commerce stores, and POS systems in India — full-stack, zero templates, with built-in CMS and 1 year free hosting. Based in Bangalore.",
  alternates: { canonical: "https://thescene.co.in" },
  openGraph: {
    url: "https://thescene.co.in",
    title: "Custom Website, E-Commerce & POS Development in India | The Scene Co.",
    description:
      "Premium custom websites, e-commerce stores, and POS systems — full-stack, zero templates, 1 year free hosting.",
  },
};

export default async function Home() {
  const testimonials = await getPublishedTestimonials();
  const faqs = await getPublishedFAQs();
  const teamMembers = await getPublishedTeamMembers();
  const homeTeam = teamMembers.slice(0, 4);
  const clients = await getPublishedClients();
  const settings = await getAllSettings().catch(() => ({}));

  const homePageSchema = webPageSchema({
    name: "The Scene Co. — Custom Websites, E-Commerce & POS Systems in India",
    description:
      "Premium custom websites, e-commerce stores, and POS systems built from scratch. No templates. 1 year free hosting included.",
    url: "/",
  });

  const homeFaqSchema =
    faqs.length > 0
      ? faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })))
      : null;

  return (
    <div className="flex flex-col bg-canvas">
      <JsonLd data={homePageSchema} />
      {homeFaqSchema && <JsonLd data={homeFaqSchema} />}

      {/* 1. Hero */}
      <Hero settings={settings} />

      {/* 2. Marquee strip */}
      <MarqueeStrip />

      {/* 3. Services/packages grid */}
      <div id="services" className="container mx-auto px-4 sm:px-6 py-12 md:py-24 max-w-6xl">
        <Packages />
      </div>

      {/* 3.5 Clients carousel */}
      <ClientsCarousel clients={clients} />

      {/* 4. Portfolio CTA */}
      <CtaBanner
        title="See our work in action"
        subtitle="Browse our portfolio of custom websites, e-commerce stores, and POS systems built for real businesses."
        ctaText="View Portfolio"
        ctaLink="/portfolio"
        secondaryText="Our Services"
        secondaryLink="/services"
        colorBlock="lime"
      />

      {/* 5. Testimonials */}
      <div id="testimonials" className="py-4">
        <Testimonials testimonials={testimonials} />
      </div>

      {/* 6. Team */}
      <div id="team">
        <Leadership teamMembers={homeTeam} showViewAll={teamMembers.length > 4} />
      </div>

      {/* 7. FAQ */}
      <div id="faq" className="py-4">
        <FAQ faqs={faqs} />
      </div>

      {/* 8. Contact */}
      <div id="contact" className="py-4">
        <Contact settings={settings} />
      </div>
    </div>
  );
}
