import { Hero } from "@/components/sections/hero";
import { Packages } from "@/components/sections/packages";
import { Leadership } from "@/components/sections/leadership";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { ClientsCarousel } from "@/components/sections/clients-carousel";
import { getPublishedTestimonials, getPublishedFAQs, getPublishedTeamMembers, getPublishedClients, getAllSettings } from "@/lib/db";

export const runtime = "edge";

export default async function Home() {
  const testimonials = await getPublishedTestimonials();
  const faqs = await getPublishedFAQs();
  const teamMembers = await getPublishedTeamMembers();
  const homeTeam = teamMembers.slice(0, 4);
  const clients = await getPublishedClients();
  const settings = await getAllSettings().catch(() => ({}));

  return (
    <div className="flex flex-col bg-canvas">

      {/* 1. Hero — full-bleed portfolio mosaic */}
      <Hero settings={settings} />

      {/* 2. Marquee strip — like Figma's black ribbon of client logos */}
      <MarqueeStrip />

      {/* 3. White canvas — services/packages grid */}
      <div id="services" className="container mx-auto px-4 sm:px-6 py-12 md:py-24 max-w-6xl">
        <Packages />
      </div>

      {/* 3.5 Brands We Have Worked With — Dedicated Logo Carousel */}
      <ClientsCarousel clients={clients} />

      {/* 4. Lime color-block — portfolio CTA */}
      <CtaBanner
        title="See our work in action"
        subtitle="Browse our portfolio of custom websites, e-commerce stores, and POS systems built for real businesses."
        ctaText="View Portfolio"
        ctaLink="/portfolio"
        secondaryText="Our Services"
        secondaryLink="/services"
        colorBlock="lime"
      />

      {/* 5. Navy color-block — testimonials */}
      <div id="testimonials" className="py-4">
        <Testimonials testimonials={testimonials} />
      </div>

      {/* 6. White canvas — team & stats */}
      <div id="team">
        <Leadership teamMembers={homeTeam} showViewAll={teamMembers.length > 4} />
      </div>

      {/* 7. Lime color-block — FAQ */}
      <div id="faq" className="py-4">
        <FAQ faqs={faqs} />
      </div>

      {/* 8. Coral color-block — contact */}
      <div id="contact" className="py-4">
        <Contact settings={settings} />
      </div>

    </div>
  );
}
