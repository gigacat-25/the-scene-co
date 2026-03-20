"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, Leaf, Mic, Briefcase, Megaphone, School, Loader2, Star, Image as ImageIconComponent } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { AnimateOnScroll } from "../animate-on-scroll";

interface Service {
  id: number;
  title: string;
  description: string;
  image_url: string;
  icon_name: string;
  features: string;
  eco_highlights: string;
}

const IconMap: { [key: string]: any } = {
  Mic: Mic,
  Briefcase: Briefcase,
  Megaphone: Megaphone,
  School: School,
  Star: Star,
  Image: ImageIconComponent
};

export function Packages() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => setServices(data.services || []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full relative">
      <AnimateOnScroll
        animationClass="animate-slide-in-up"
        hiddenClass="opacity-0"
        className="text-center mb-16"
      >
        <Badge variant="secondary" className="text-sm">Our Expertise</Badge>
        <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl mt-4">
          Services, Tailored to Your Vision
        </h2>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
          From intimate conferences to large-scale brand activations, we deliver excellence with a commitment to sustainability.
        </p>
      </AnimateOnScroll>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : services.length === 0 ? (
        <p className="text-center text-muted-foreground py-10">No services found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((pkg, index) => {
            const IconComp = IconMap[pkg.icon_name] || Star;
            let featuresArray: string[] = [];
            let ecoArray: string[] = [];
            try {
              featuresArray = JSON.parse(pkg.features);
              ecoArray = JSON.parse(pkg.eco_highlights);
            } catch { }

            return (
              <AnimateOnScroll
                key={pkg.id}
                animationClass="animate-slide-in-up"
                hiddenClass="opacity-0"
                delay={`${index * 0.1}s`}
              >
                <Card className="flex flex-col h-full bg-card/50 backdrop-blur-sm border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-5px] hover:shadow-primary/20 hover:-translate-y-2">
                  <CardHeader className="p-0">
                    {pkg.image_url && (
                      <div className="relative h-56 w-full">
                        <img
                          src={pkg.image_url}
                          alt={pkg.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <IconComp className="h-8 w-8 text-primary" />
                        <CardTitle className="font-headline text-2xl text-white">{pkg.title}</CardTitle>
                      </div>
                      <CardDescription className="text-muted-foreground">{pkg.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-6 px-6">
                    {featuresArray.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-base text-white">What's Included</h4>
                        <ul className="space-y-2.5">
                          {featuresArray.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {ecoArray.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-base text-white flex items-center gap-2">
                          <Leaf className="h-4 w-4" />
                          <span>Eco-Conscious Highlights</span>
                        </h4>
                        <ul className="space-y-2.5">
                          {ecoArray.map((highlight, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                              <Leaf className="h-4 w-4 text-primary/70 shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-6">
                    <Button asChild className="w-full font-bold" variant="secondary">
                      <Link href="/contact">Enquire Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </AnimateOnScroll>
            );
          })}
        </div>
      )}
    </section>
  );
}
