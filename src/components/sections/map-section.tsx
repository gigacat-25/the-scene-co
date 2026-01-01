"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import { MapComponent } from "@/components/map";
import { AnimateOnScroll } from "../animate-on-scroll";

export function MapSection() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="bg-muted py-16 text-center">
        <p className="text-muted-foreground">Google Maps API Key is missing. Map cannot be displayed.</p>
        <p className="text-sm text-muted-foreground/80 mt-2">Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.</p>
      </div>
    )
  }

  return (
    <section className="w-full">
      <AnimateOnScroll
        animationClass="animate-fade-in"
        hiddenClass="opacity-0"
        className="container mx-auto px-4 text-center mb-8"
      >
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Based in the Heart of the City
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          While we operate globally, our roots are in Los Angeles, a hub of creativity and innovation.
        </p>
      </AnimateOnScroll>
      <AnimateOnScroll
        animationClass="animate-fade-in"
        hiddenClass="opacity-0"
        delay="0.2s"
      >
        <APIProvider apiKey={apiKey}>
          <MapComponent />
        </APIProvider>
      </AnimateOnScroll>
    </section>
  );
}
