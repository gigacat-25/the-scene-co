import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "../animate-on-scroll";
import { MagneticParticles } from "../magnetic-particles";

export function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center text-center text-white overflow-hidden">
      <MagneticParticles />
      
      {/* Gradient overlays - pointer-events-none ensures mouse reaches particles */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />
      
      <div className="relative z-10 p-4 flex flex-col items-center max-w-6xl mx-auto">
        <AnimateOnScroll
          animationClass="animate-slide-in-up"
          hiddenClass="opacity-0"
        >
          <h1 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-tight">
            Events & Experiences,
            <br />
            <span className="text-primary block">Curated to Perfection.</span>
          </h1>
        </AnimateOnScroll>
        
        <AnimateOnScroll
          animationClass="animate-slide-in-up"
          hiddenClass="opacity-0"
          delay="0.2s"
        >
          <p className="mt-8 max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed">
            We are a premium, experiential, and eco-conscious event company. 
            <br className="hidden sm:block" />
            Inspired by live experiences, we produce events that are unforgettable.
          </p>
        </AnimateOnScroll>
        
        <AnimateOnScroll
          animationClass="animate-fade-in"
          hiddenClass="opacity-0"
          delay="0.4s"
        >
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" className="font-bold bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-7 text-lg shadow-2xl">
              <Link href="/#packages">Explore Packages</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-7 text-lg">
              <Link href="/#contact">Contact Us</Link>
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
      
      {/* Bottom gradient - pointer-events-none */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
