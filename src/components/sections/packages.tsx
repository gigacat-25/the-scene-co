"use client";

import Image from "next/image";
import { CheckCircle2, Leaf, Mic, Briefcase, Megaphone, School, Star, Image as ImageIconComponent, Code2, ShoppingCart, Monitor } from "lucide-react";
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
    image_url: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80",
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
    <section className="w-full relative py-12">
      <AnimateOnScroll
        animationClass="animate-slide-in-up"
        hiddenClass="opacity-0"
        className="text-center mb-16"
      >
        <span className="eyebrow-mono text-ink/60">Our Services</span>
        <h2 className="text-[36px] sm:text-[48px] md:text-[64px] font-[340] tracking-[-0.96px] leading-[1.10] text-ink mt-3 max-w-4xl mx-auto">
          We Build Digital Experiences
        </h2>
        <p className="mt-6 max-w-3xl mx-auto body-lg-figma text-ink/75">
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
              <div className="flex flex-col h-full bg-canvas border border-hairline rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                {pkg.image_url && (
                  <div className="relative h-56 w-full overflow-hidden bg-surface-soft">
                    <img
                      src={pkg.image_url}
                      alt={pkg.title}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-surface-soft rounded-md text-ink flex items-center justify-center">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <h3 className="card-title-figma text-ink font-bold">{pkg.title}</h3>
                  </div>
                  
                  <p className="body-sm-figma text-ink/70 mb-6 leading-relaxed flex-grow">
                    {pkg.description}
                  </p>

                  <div className="h-px bg-hairline-soft mb-6" />

                  <div className="space-y-6 flex-grow">
                    {pkg.features.length > 0 && (
                      <div>
                        <h4 className="eyebrow-mono text-xs text-ink/50 mb-3 font-bold">What&apos;s Included</h4>
                        <ul className="space-y-2.5">
                          {pkg.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-ink/75">
                              <CheckCircle2 className="h-4 w-4 text-ink shrink-0 mt-0.5" />
                              <span className="body-sm-figma">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {pkg.eco_highlights.length > 0 && (
                      <div>
                        <h4 className="eyebrow-mono text-xs text-ink/50 mb-3 font-bold flex items-center gap-1.5">
                          <Leaf className="h-3.5 w-3.5" />
                          <span>Why It&apos;s Better</span>
                        </h4>
                        <ul className="space-y-2.5">
                          {pkg.eco_highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-ink/75">
                              <Leaf className="h-4 w-4 text-ink/60 shrink-0 mt-0.5" />
                              <span className="body-sm-figma">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="h-px bg-hairline-soft my-6" />

                  <div>
                    <Link href="/contact" className="w-full text-center inline-block btn-secondary-figma text-sm">
                      Get a Quote
                    </Link>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          );
        })}
      </div>
    </section>
  );
}
