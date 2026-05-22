"use client";

import { AnimateOnScroll } from "../animate-on-scroll";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

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
        answer: "For major projects, we recommend booking at least 2-4 weeks in advance. However, smaller websites can often be delivered within 7-10 days.",
    },
    {
        question: "What does '1 year free hosting' mean?",
        answer: "We host your website on Cloudflare's edge network for 1 year at no extra cost. After that, hosting continues at ₹500–₹4,000/month depending on your plan.",
    },
    {
        question: "Do I get a free domain too?",
        answer: "Yes! We register your .com or .in domain for free for the first year. Renewal after that is at standard rates (₹800–₹1,500/year).",
    },
    {
        question: "Can I edit the website content myself?",
        answer: "Absolutely. Every website comes with a built-in CMS dashboard where you can edit text, images, blog posts, products, and more — no coding needed.",
    },
];

export function FAQ({ faqs, title, subtitle }: FAQProps) {
    const items = faqs && faqs.length > 0 ? faqs : defaultFaqs;

    return (
        <section className="w-full">
            <AnimateOnScroll
                animationClass="animate-slide-in-up"
                hiddenClass="opacity-0"
                className="text-center mb-12"
            >
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-white">
                    {title || "Frequently Asked Questions"}
                </h2>
                {subtitle && (
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        {subtitle}
                    </p>
                )}
            </AnimateOnScroll>

            <div className="max-w-3xl mx-auto px-4 md:px-0">
                <Accordion type="single" collapsible className="w-full">
                    {items.map((faq, i) => (
                        <AccordionItem key={faq.id || i} value={`item-${i}`} className="border-white/10 mb-4 bg-secondary/10 px-6 py-2 rounded-xl">
                            <AccordionTrigger className="text-white hover:text-primary focus:no-underline font-semibold leading-normal text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed mt-2 pb-4">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
