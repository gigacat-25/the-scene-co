"use client";

import { AnimateOnScroll } from "../animate-on-scroll";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Jenkins",
        company: "TechForward Summit",
        review: "The Scene Co. completely transformed our annual summit. Not only was the production flawless, but their zero-waste initiative resonated perfectly with our core values. We couldn't be happier.",
        rating: 5,
    },
    {
        name: "Marcus Aurelius",
        company: "TEDx University",
        review: "From the spectacular stage design to the coordination of 12 speakers, everything was immaculate. A truly premium experience that felt both majestic and incredibly intimate.",
        rating: 5,
    },
    {
        name: "Elena Rodriguez",
        company: "Eco-Wear Launch",
        review: "Their experiential brand activation was out of this world. Our guests were mesmerized by the botanical installations and sustainable catering. Best agency we've ever worked with.",
        rating: 5,
    },
    {
        name: "David Chen",
        company: "Global Banking Gala",
        review: "Unparalleled attention to detail. Having an event executed so elegantly with a 100% carbon-neutral footprint is a rare achievement. They are masters of their craft.",
        rating: 5,
    },
];

export function Testimonials() {
    return (
        <section className="w-full">
            <AnimateOnScroll
                animationClass="animate-slide-in-up"
                hiddenClass="opacity-0"
                className="text-center mb-12"
            >
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-white">
                    Client Experiences
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    Don't just take our word for it—hear from the brands and individuals who have trusted us to orchestrate their most important moments.
                </p>
            </AnimateOnScroll>

            <div className="px-12 max-w-5xl mx-auto">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                                <div className="p-2 h-full">
                                    <Card className="bg-secondary/20 border-white/10 h-full">
                                        <CardContent className="flex flex-col justify-between p-6 h-full">
                                            <div className="flex mb-4">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                                ))}
                                            </div>
                                            <blockquote className="text-muted-foreground italic mb-6 flex-grow leading-relaxed">
                                                "{testimonial.review}"
                                            </blockquote>
                                            <div>
                                                <p className="font-bold text-white">{testimonial.name}</p>
                                                <p className="text-sm text-primary">{testimonial.company}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="bg-background/50 border-white/10 hover:bg-primary hover:text-white" />
                    <CarouselNext className="bg-background/50 border-white/10 hover:bg-primary hover:text-white" />
                </Carousel>
            </div>
        </section>
    );
}
