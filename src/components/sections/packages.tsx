"use client";

import Image from "next/image";
import { CheckCircle2, Leaf, Mic, Briefcase, Megaphone, School, Star, Image as ImageIconComponent, Code2, ShoppingCart, Monitor } from "lucide-react";
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

const services = [
  {
    id: 1,
    title: "Custom Websites",
    description: "Pixel-perfect, fast-loading websites built with Next.js. Full frontend + backend with a built-in CMS you control.",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    icon_name: "Code2",
    features: ["Custom design (no templates)", "Built-in CMS dashboard", "1 year free hosting", "1 year free domain", "Mobile optimized", "SEO ready"],
    eco_highlights: ["Green hosting via Cloudflare edge", "Optimized assets = less energy", "Paperless CMS workflows"],
  },
  {
    id: 2,
    title: "E-Commerce Stores",
    description: "Full online stores with payment gateways, inventory management, and order tracking — built for Indian businesses.",
    image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    icon_name: "ShoppingCart",
    features: ["Razorpay / Stripe / UPI", "Inventory dashboard", "Order tracking", "Customer accounts", "Email notifications", "Analytics"],
    eco_highlights: ["Digital receipts & invoices", "Cloud-native = zero hardware waste", "Energy-efficient edge delivery"],
  },
  {
    id: 3,
    title: "POS Systems",
    description: "Custom web-based POS for restaurants, retail, and e-commerce. Billing, inventory, and analytics in one dashboard.",
    image_url: "https://images.unsplash.com/photo-1556740758-90de940de450?auto=format&fit=crop&w=800&q=80",
    icon_name: "Monitor",
    features: ["Multi-user access", "Real-time inventory", "Sales analytics", "Billing & invoicing", "Integrated website", "Cloud-hosted"],
    eco_highlights: ["No physical POS hardware needed", "Works on any tablet/browser", "Zero paper receipts option"],
  },
];

const IconMap: { [key: string]: any } = {
  Mic,
  Briefcase,
  Megaphone,
  School,
  Star,
  Image: ImageIconComponent,
  Code2,
  ShoppingCart,
  Monitor,
};

export function Packages() {
  return (
    <section className="w-full relative">
      <AnimateOnScroll
        animationClass="animate-slide-in-up"
        hiddenClass="opacity-0"
        className="text-center mb-16"
      >
        <Badge variant="secondary" className="text-sm">Our Services</Badge>
        <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl mt-4">
          We Build Digital Experiences
        </h2>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
          From stunning websites to full POS systems — custom-built, CMS-powered, with 1 year free hosting included.
        </p>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {services.map((pkg, index) => {
          const IconComp = IconMap[pkg.icon_name] || Star;

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
                  {pkg.features.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 text-base text-white">What&apos;s Included</h4>
                      <ul className="space-y-2.5">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pkg.eco_highlights.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 text-base text-white flex items-center gap-2">
                        <Leaf className="h-4 w-4" />
                        <span>Why It&apos;s Better</span>
                      </h4>
                      <ul className="space-y-2.5">
                        {pkg.eco_highlights.map((highlight, i) => (
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
                    <Link href="/contact">Get a Quote</Link>
                  </Button>
                </CardFooter>
              </Card>
            </AnimateOnScroll>
          );
        })}
      </div>
    </section>
  );
}
