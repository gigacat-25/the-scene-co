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
  getPublicSettings,
} from "@/lib/db";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Best Web Development Company in Bangalore | Custom Websites & E-Commerce",
  description:
    "Looking for the best web development company in Bangalore? The Scene Co. builds custom websites, e-commerce stores, and POS systems in India — full-stack, zero templates, built-in CMS, and 1 year free hosting. Serving businesses across India.",
  keywords: [
    "best web development company in Bangalore",
    "web development company Bangalore",
    "web design company Bangalore",
    "website designers Bangalore",
    "web development agencies Bangalore",
    "leading web development company Bangalore",
    "custom website development Bangalore",
    "best website design services in Bangalore",
    "e-commerce website development Bangalore",
    "POS system development Bangalore",
    "mobile app development Bangalore",
  ],
  alternates: { canonical: "https://www.thescene.co.in" },
  openGraph: {
    url: "https://www.thescene.co.in",
    title: "Best Web Development Company in Bangalore | The Scene Co.",
    description:
      "Custom websites, e-commerce stores, and POS systems — full-stack, zero templates, 1 year free hosting. The best web development company in Bangalore.",
  },
};

export default async function Home() {
  const testimonials = await getPublishedTestimonials();
  const faqs = await getPublishedFAQs();
  const teamMembers = await getPublishedTeamMembers();
  const homeTeam = teamMembers.slice(0, 4);
  const clients = await getPublishedClients();
  const settings = await getPublicSettings().catch(() => ({}));

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
