import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AnimateOnScroll } from "../animate-on-scroll";

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center text-center text-white overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 p-4 flex flex-col items-center">
        <AnimateOnScroll
          animationClass="animate-slide-in-up"
          hiddenClass="opacity-0"
        >
          <h1 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Events & Experiences,
            <br />
            <span className="text-primary">Curated to Perfection.</span>
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll
          animationClass="animate-slide-in-up"
          hiddenClass="opacity-0"
          delay="0.2s"
        >
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
            We are a premium, experiential, and eco-conscious event company. Inspired by live experiences, we produce events that are unforgettable.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll
          animationClass="animate-fade-in"
          hiddenClass="opacity-0"
          delay="0.4s"
        >
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="font-bold bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/#packages">Explore Packages</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="/#contact">Contact Us</Link>
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
       <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
