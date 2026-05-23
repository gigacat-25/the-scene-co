"use client";

import { useState } from "react";
import { AnimateOnScroll } from "../animate-on-scroll";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  id?: number;
  question: string;
  answer: string;
}

interface FAQProps {
  faqs?: FAQItem[];
  title?: string;
  subtitle?: string;
}

const defaultFaqs: FAQItem[] = [
  {
    question: "How far in advance should we book?",
    answer: "For major projects, we recommend booking at least 2–4 weeks in advance. However, smaller websites can often be delivered within 7–10 days.",
  },
  {
    question: "What does '1 year free hosting' mean?",
    answer: "We host your website on Cloudflare's global edge network for 1 year at no extra cost. After that, hosting continues at ₹500–₹4,000/month depending on your plan.",
  },
  {
    question: "Do I get a free domain too?",
    answer: "Yes! We register your .com or .in domain for free for the first year. Renewal after that is at standard rates (₹800–₹1,500/year).",
  },
  {
    question: "Can I edit the website content myself?",
    answer: "Absolutely. Every website comes with a built-in CMS dashboard where you can edit text, images, blog posts, products, and more — no coding required.",
  },
  {
    question: "Do you work with businesses outside India?",
    answer: "Yes, we work remotely with clients worldwide. All communication and project management is handled digitally, and we accept international payments.",
  },
];

export function FAQ({ faqs, title, subtitle }: FAQProps) {
  const items = faqs && faqs.length > 0 ? faqs : defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="color-block-panel color-block-panel-lime">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <AnimateOnScroll animationClass="animate-slide-in-up" hiddenClass="opacity-0">
              <span className="caption-mono text-ink/50 mb-3 block">FAQ</span>
              <h2
                className="text-ink mb-4"
                style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 340, lineHeight: 1.1, letterSpacing: "-0.96px" }}
              >
                {title || "Frequently asked questions"}
              </h2>
              {subtitle && (
                <p className="body-lg-figma text-ink/75">{subtitle}</p>
              )}
              {!subtitle && (
                <p className="text-ink/75" style={{ fontSize: 20, fontWeight: 330, lineHeight: 1.4 }}>
                  Everything you need to know before getting started.
                </p>
              )}
            </AnimateOnScroll>

            <div className="space-y-0">
              {items.map((faq, i) => (
                <AnimateOnScroll
                  key={faq.id || i}
                  animationClass="animate-slide-in-up"
                  hiddenClass="opacity-0"
                  delay={`${i * 0.07}s`}
                >
                  <div className="border-b border-ink/20 last:border-b-0">
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="w-full flex items-start justify-between gap-4 py-5 text-left"
                    >
                      <span className="text-ink font-[480]" style={{ fontSize: "clamp(15px, 2.2vw, 18px)", lineHeight: 1.45 }}>
                        {faq.question}
                      </span>
                      <span className="shrink-0 mt-0.5">
                        {openIndex === i ? (
                          <Minus className="h-5 w-5 text-ink" />
                        ) : (
                          <Plus className="h-5 w-5 text-ink" />
                        )}
                      </span>
                    </button>
                    {openIndex === i && (
                      <p className="pb-5 text-ink/75" style={{ fontSize: "clamp(14px, 2.2vw, 18px)", fontWeight: 320, lineHeight: 1.45, letterSpacing: "-0.26px" }}>
                        {faq.answer}
                      </p>
                    )}
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
