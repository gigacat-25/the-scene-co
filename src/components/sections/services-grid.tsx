"use client";

import { Code2, ShoppingCart, Monitor, Server, Palette, Wrench } from "lucide-react";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

const services = [
  {
    icon: Code2,
    title: "Custom Websites",
    description: "Pixel-perfect websites built with Next.js. Fast, SEO-friendly, and fully customizable with a built-in CMS.",
    features: ["Next.js + React", "Built-in CMS dashboard", "Edge hosting on Cloudflare", "SEO optimized"],
    colorBlock: "bg-block-lime",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Stores",
    description: "Full online stores with payment gateways, inventory management, and order tracking — built for Indian businesses.",
    features: ["Razorpay / Stripe / UPI", "Inventory dashboard", "Order tracking", "Customer accounts"],
    colorBlock: "bg-block-lilac",
  },
  {
    icon: Monitor,
    title: "POS Systems",
    description: "Custom web-based POS for restaurants, retail, and e-commerce. Billing, inventory, and analytics in one dashboard.",
    features: ["Multi-user access", "Real-time inventory", "Sales analytics", "Cloud-hosted"],
    colorBlock: "bg-block-mint",
  },
  {
    icon: Server,
    title: "SaaS Products",
    description: "Multi-tenant SaaS platforms with user management, subscriptions, and advanced analytics dashboards.",
    features: ["Multi-tenant architecture", "Subscription billing", "User management", "Analytics dashboard"],
    colorBlock: "bg-block-cream",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Custom design systems, wireframes, and prototypes that convert visitors into customers.",
    features: ["Custom design systems", "Wireframing", "Prototyping", "User research"],
    colorBlock: "bg-block-coral",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description: "Ongoing support, bug fixes, security updates, and feature additions to keep your site running smoothly.",
    features: ["Bug fixes", "Security updates", "Content updates", "Performance monitoring"],
    colorBlock: "bg-block-pink",
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
          >
            <div className="h-full bg-canvas border border-hairline rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] group">
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
          </AnimateOnScroll>
        );
      })}
    </div>
  );
}
