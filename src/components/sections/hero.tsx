import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AnimateOnScroll } from "../animate-on-scroll";

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center text-center text-white">
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
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-4">
        <AnimateOnScroll
          animationClass="animate-slide-in-up"
          hiddenClass="opacity-0"
        >
          <h1 className="font-headline text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Crafting unforgettable moments,
            <br />
            <span className="text-primary-foreground/80">consciously.</span>
          </h1>
        </AnimateOnScroll>
        <AnimateOnScroll
          animationClass="animate-slide-in-up"
          hiddenClass="opacity-0"
          delay="0.2s"
        >
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90 md:text-xl">
            Sustainable event planning for a memorable and meaningful experience.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll
          animationClass="animate-fade-in"
          hiddenClass="opacity-0"
          delay="0.4s"
        >
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="font-bold">
              <Link href="/#packages">Explore Packages</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-bold bg-transparent text-white hover:bg-white hover:text-black">
              <Link href="/#contact">Contact Us</Link>
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
