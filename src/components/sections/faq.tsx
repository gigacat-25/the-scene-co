import { AnimateOnScroll } from "../animate-on-scroll";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "How far in advance should we book an event with you?",
        answer: "For major corporate events, TEDx functions, or large brand activations, we recommend booking at least 3-6 months in advance. However, smaller bespoke experiences can often be accommodated with 4-6 weeks' notice.",
    },
    {
        question: "How do you ensure zero-waste and carbon-neutrality?",
        answer: "We source our materials locally, ban single-use plastics, focus on up-cycled decors, and partner with certified carbon offsetting programs for operations and travel. Transparency is paramount in our eco-conscious pledge.",
    },
    {
        question: "Do you offer 'a la carte' services or only full planning?",
        answer: "While full-scale event production is our specialty, we absolutely offer specialized a la carte services like stage design, AV production, or sustainable catering procurement. Let's discuss your specific needs during a consultation.",
    },
    {
        question: "Can you manage events outside your primary city?",
        answer: "Absolutely. The Scene Co. orchestrates events globally. We utilize our verified network of sustainable vendors across various regions to ensure consistency regardless of the destination.",
    },
];

export function FAQ() {
    return (
        <section className="w-full">
            <AnimateOnScroll
                animationClass="animate-slide-in-up"
                hiddenClass="opacity-0"
                className="text-center mb-12"
            >
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-white">
                    Frequently Asked Questions
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    Everything you need to know about our premium event planning processes, policies, and sustainable commitments.
                </p>
            </AnimateOnScroll>

            <div className="max-w-3xl mx-auto px-4 md:px-0">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`item-${i}`} className="border-white/10 mb-4 bg-secondary/10 px-6 py-2 rounded-xl">
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
