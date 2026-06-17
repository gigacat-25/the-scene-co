"use client";

import { Code2, ShoppingCart, Smartphone, Server, Palette, Search, Share2, TrendingUp } from "lucide-react";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import Link from "next/link";

const services = [
  {
    icon: Code2,
    title: "Custom Websites",
    description: "Pixel-perfect websites built with Next.js. Fast, SEO-friendly, and fully customizable with a built-in CMS.",
    features: ["Next.js + React", "Built-in CMS dashboard", "Edge hosting on Cloudflare", "SEO optimized"],
    colorBlock: "bg-block-lime",
    href: "/services/web-development",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Stores",
    description: "Full online stores with payment gateways, inventory management, and order tracking — built for Indian businesses.",
    features: ["Razorpay / Stripe / UPI", "Inventory dashboard", "Order tracking", "Customer accounts"],
    colorBlock: "bg-block-lilac",
    href: "/services/ecommerce-development",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "High-performance native iOS and Android apps built with React Native. Smooth animations and offline support.",
    features: ["React Native", "iOS & Android", "App Store deployment", "Push notifications"],
    colorBlock: "bg-block-pink",
    href: "/services/mobile-app-development",
  },
  {
    icon: Server,
    title: "SaaS & Web Apps",
    description: "Multi-tenant SaaS platforms and custom web dashboards with user management, subscriptions, and database integration.",
    features: ["Multi-tenant architecture", "Subscription billing", "User management", "Cloudflare D1 / SQL"],
    colorBlock: "bg-block-cream",
    href: "/services/web-app-development",
  },
  {
    icon: Palette,
    title: "Branding & Design",
    description: "Premium design systems, interactive wireframes, custom typography, and visual brand identity packages.",
    features: ["Design system creation", "Wireframes & prototypes", "Brand identity & guidelines", "Modern typography & layouts"],
    colorBlock: "bg-block-coral",
    href: "/services/branding-design",
  },
  {
    icon: Search,
    title: "SEO Services",
    description: "Technical SEO audits, schema markup, content optimization, and link building to rank #1 on Google.",
    features: ["Keyword-first metadata", "Custom JSON-LD schema", "Competitor analysis", "Google Search Console setup"],
    colorBlock: "bg-block-mint",
    href: "/services/seo",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description: "Organic content creation, brand positioning, audience growth, and community management across platforms.",
    features: ["Content calendars", "Instagram & LinkedIn focus", "Growth analytics", "Community engagement"],
    colorBlock: "bg-block-lilac",
    href: "/services/social-media-marketing",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Full-funnel digital marketing strategies: paid search ads, lead generation, and performance analytics.",
    features: ["Google Ads & PPC", "Lead generation funnels", "Conversion rate optimization", "Custom KPI dashboards"],
    colorBlock: "bg-block-lime",
    href: "/services/digital-marketing",
  },
];

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <AnimateOnScroll
            key={service.title}
            animationClass="animate-slide-in-up"
            hiddenClass="opacity-0"
            delay={`${index * 0.08}s`}
            className="h-full"
          >
            <Link href={service.href} className="block h-full group">
              <div className="h-full bg-canvas border border-hairline rounded-lg overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col justify-between">
                <div>
                  {/* Colorful header strip */}
                  <div className={`${service.colorBlock} p-6 flex items-center gap-3`}>
                    <div className="p-2.5 bg-ink/10 rounded-md">
                      <Icon className="h-5 w-5 text-ink" />
                    </div>
                    <h3 className="text-ink font-bold" style={{ fontSize: 20, fontWeight: 540 }}>
                      {service.title}
                    </h3>
                  </div>

                  <div className="p-6">
                    <p className="body-sm-figma text-ink/70 mb-5 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="h-px bg-hairline-soft mb-5" />
                    <ul className="space-y-2.5">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-ink shrink-0" />
                          <span className="body-sm-figma text-ink/75">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 text-sm font-semibold text-ink/60 group-hover:text-ink flex items-center gap-1.5 transition-colors">
                  Learn More 
                  <span className="transition-transform duration-300 group-hover:translate-x-1 font-sans">&rarr;</span>
                </div>
              </div>
            </Link>
          </AnimateOnScroll>
        );
      })}
    </div>
  );
}
