import { Hero } from "@/components/sections/hero";
import { Packages } from "@/components/sections/packages";
import { Leadership } from "@/components/sections/leadership";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { MapSection } from "@/components/sections/map-section";
import { CtaBanner } from "@/components/sections/cta-banner";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div id="services" className="container mx-auto px-4 py-24 sm:py-32">
        <Packages />
      </div>
      <CtaBanner
        title="See Our Work"
        subtitle="Browse our portfolio of custom websites, e-commerce stores, and POS systems."
        ctaText="View Portfolio"
        ctaLink="/portfolio"
      />
      <div id="team" className="container mx-auto px-4 py-24 sm:py-32">
        <Leadership />
      </div>
      <div id="testimonials" className="w-full bg-secondary/10 border-y border-white/5 py-24 sm:py-32 overflow-hidden">
        <Testimonials />
      </div>
      <div id="faq" className="container mx-auto px-4 py-24 sm:py-32">
        <FAQ />
      </div>
      <div id="contact" className="container mx-auto px-4 py-24 sm:py-32">
        <Contact />
      </div>
      <MapSection />
    </div>
  );
}
