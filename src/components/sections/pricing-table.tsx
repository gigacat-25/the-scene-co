"use client";

import Link from "next/link";
import { CheckCircle2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

interface PricingFeature {
  id: number;
  plan_id: number;
  feature: string;
  order_index: number;
}

interface PricingPlan {
  id: number;
  name: string;
  slug: string;
  price_min: number;
  price_max: number;
  currency: string;
  description: string;
  delivery_time: string;
  is_popular: number;
  features: PricingFeature[];
}

interface PricingTableProps {
  plans: PricingPlan[];
}

function formatPrice(price: number, currency: string): string {
  if (price >= 100000) return `${currency}${(price / 100000).toFixed(price % 100000 === 0 ? 0 : 1)}L`;
  if (price >= 1000) return `${currency}${(price / 1000).toFixed(0)}K`;
  return `${currency}${price}`;
}

export function PricingTable({ plans }: PricingTableProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
      {plans.map((plan, index) => (
        <AnimateOnScroll
          key={plan.id}
          animationClass="animate-slide-in-up"
          hiddenClass="opacity-0"
          delay={`${index * 0.1}s`}
        >
          <div className={`relative flex flex-col h-full bg-secondary/20 border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${plan.is_popular ? "border-primary shadow-lg shadow-primary/20" : "border-white/10 hover:border-primary/50"}`}>
            {plan.is_popular === 1 && (
              <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center text-sm font-semibold py-1.5">
                <Star className="h-3.5 w-3.5 inline mr-1" /> Most Popular
              </div>
            )}

            <div className={`p-6 ${plan.is_popular ? "pt-10" : ""}`}>
              <h3 className="font-headline text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>

              <div className="mb-4">
                <span className="text-3xl font-bold text-white">
                  {formatPrice(plan.price_min, plan.currency)}
                </span>
                {plan.price_max !== plan.price_min && (
                  <span className="text-muted-foreground text-lg"> – {formatPrice(plan.price_max, plan.currency)}</span>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-4">Delivery: {plan.delivery_time}</p>

              <Button asChild className="w-full font-bold" variant={plan.is_popular ? "default" : "outline"}>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>

            <div className="px-6 pb-6 flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.id} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature.feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimateOnScroll>
      ))}
    </div>
  );
}
