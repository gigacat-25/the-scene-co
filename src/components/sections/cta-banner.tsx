import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CtaBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export function CtaBanner({ title, subtitle, ctaText, ctaLink }: CtaBannerProps) {
  return (
    <section className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-y border-white/5">
      <div className="container mx-auto px-4 py-24 sm:py-32 text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <Button asChild size="lg" className="font-bold text-lg px-8">
          <Link href={ctaLink}>{ctaText}</Link>
        </Button>
      </div>
    </section>
  );
}
