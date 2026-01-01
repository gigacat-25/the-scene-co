import { Hero } from "@/components/sections/hero";
import { Packages } from "@/components/sections/packages";
import { Sustainability } from "@/components/sections/sustainability";
import { Contact } from "@/components/sections/contact";
import { MapSection } from "@/components/sections/map-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div id="packages" className="container mx-auto px-4 py-24 sm:py-32">
        <Packages />
      </div>
      <div id="sustainability" className="bg-secondary/20">
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <Sustainability />
        </div>
      </div>
      <div id="contact" className="container mx-auto px-4 py-24 sm:py-32">
        <Contact />
      </div>
       <MapSection />
    </div>
  );
}
