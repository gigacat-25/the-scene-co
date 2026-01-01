"use client";

import { MapComponent } from "@/components/map";
import { AnimateOnScroll } from "../animate-on-scroll";

export function MapSection() {
  return (
    <section className="w-full">
      <AnimateOnScroll
        animationClass="animate-fade-in"
        hiddenClass="opacity-0"
        className="container mx-auto mb-8 px-4 text-center"
      >
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Based in the Heart of the City
        </h2>
       
      </AnimateOnScroll>

      <AnimateOnScroll
        animationClass="animate-fade-in"
        hiddenClass="opacity-0"
        delay="0.2s"
      >
        {/* iframe map, no API key needed */}
        <MapComponent />
      </AnimateOnScroll>
    </section>
  );
}
