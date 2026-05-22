"use client";

import Link from "next/link";
import { CheckCircle2, Star } from "lucide-react";
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {plans.map((plan, index) => (
        <AnimateOnScroll
          key={plan.id}
          animationClass="animate-slide-in-up"
          hiddenClass="opacity-0"
          delay={`${index * 0.1}s`}
        >
          <div
            className={`relative flex flex-col h-full bg-canvas border rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] ${
              plan.is_popular
                ? "border-ink shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
                : "border-hairline"
            }`}
          >
            {plan.is_popular === 1 && (
              <div className="bg-ink text-canvas text-center caption-mono py-2 flex items-center justify-center gap-1.5">
                <Star className="h-3 w-3 fill-canvas" />
                Most Popular
              </div>
            )}

            <div className={`p-6 ${plan.is_popular ? "" : ""}`}>
              <span className="eyebrow-mono text-ink/50 text-xs block mb-3">{plan.name}</span>

              <div className="mb-3">
                <span className="text-ink" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1 }}>
                  {formatPrice(plan.price_min, plan.currency)}
                </span>
                {plan.price_max !== plan.price_min && (
                  <span className="text-ink/50 ml-1" style={{ fontSize: 18 }}>
                    – {formatPrice(plan.price_max, plan.currency)}
                  </span>
                )}
              </div>

              <p className="body-sm-figma text-ink/65 mb-4 leading-relaxed">{plan.description}</p>

              <div className="caption-mono text-ink/40 mb-5">
                Delivery: {plan.delivery_time}
              </div>

              <Link
                href="/contact"
                className={`w-full text-center block ${plan.is_popular ? "btn-primary-figma" : "btn-secondary-figma"} text-sm`}
              >
                Get Started
              </Link>
            </div>

            <div className="h-px bg-hairline-soft mx-6" />

            <div className="px-6 py-5 flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.id} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-ink shrink-0 mt-0.5" />
                    <span className="body-sm-figma text-ink/75">{feature.feature}</span>
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
