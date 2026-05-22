"use client";

import { Code2, ShoppingCart, Monitor, Server, Palette, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

const services = [
  {
    icon: Code2,
    title: "Custom Websites",
    description: "Pixel-perfect websites built with Next.js. Fast, SEO-friendly, and fully customizable with a built-in CMS.",
    features: ["Next.js + React", "Built-in CMS", "Edge hosting", "SEO optimized"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Stores",
    description: "Full online stores with payment gateways, inventory management, and order tracking — built for Indian businesses.",
    features: ["Razorpay / Stripe / UPI", "Inventory dashboard", "Order tracking", "Customer accounts"],
  },
  {
    icon: Monitor,
    title: "POS Systems",
    description: "Custom web-based POS for restaurants, retail, and e-commerce. Billing, inventory, and analytics in one dashboard.",
    features: ["Multi-user access", "Real-time inventory", "Sales analytics", "Cloud-hosted"],
  },
  {
    icon: Server,
    title: "SaaS Products",
    description: "Multi-tenant SaaS platforms with user management, subscriptions, and advanced analytics.",
    features: ["Multi-tenant architecture", "Subscription billing", "User management", "Analytics dashboard"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Custom design systems, wireframes, and prototypes that convert visitors into customers.",
    features: ["Custom design systems", "Wireframing", "Prototyping", "User research"],
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description: "Ongoing support, bug fixes, security updates, and feature additions to keep your site running smoothly.",
    features: ["Bug fixes", "Security updates", "Content updates", "Performance monitoring"],
  },
];

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <AnimateOnScroll
            key={service.title}
            animationClass="animate-slide-in-up"
            hiddenClass="opacity-0"
            delay={`${index * 0.1}s`}
          >
            <Card className="h-full bg-secondary/20 border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl text-white">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        );
      })}
    </div>
  );
}
