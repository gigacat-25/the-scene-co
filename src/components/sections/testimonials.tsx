"use client";

import { AnimateOnScroll } from "../animate-on-scroll";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Mehta",
    company: "Spice Route Restaurant",
    review: "The Scene Co. built our POS and website together seamlessly. Orders go straight from the website into our kitchen screen. Game changer for our team.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    company: "Kala Boutique",
    review: "We went from zero online presence to ₹3L+ monthly revenue in 4 months. The e-commerce store they built is beautiful and the CMS is so easy to use.",
    rating: 5,
  },
  {
    name: "Rohan Verma",
    company: "TechLaunch SaaS",
    review: "Hired them for a SaaS landing page and CMS. They delivered in 10 days, pixel perfect. The best dev team we've worked with — responsive and reliable.",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    company: "FreshBox Grocery",
    review: "Our inventory, billing, and website are now one system. We cut manual work by 70%. Absolutely worth every rupee — and hosting is free for the first year!",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="w-full">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="color-block-panel color-block-panel-navy">
          <AnimateOnScroll
            animationClass="animate-slide-in-up"
            hiddenClass="opacity-0"
            className="mb-12"
          >
            <span className="caption-mono text-white/50 mb-3 block">Client Experiences</span>
            <h2
              className="text-white"
              style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 340, lineHeight: 1.1, letterSpacing: "-0.96px" }}
            >
              Don't take our word for it.
              <br />
              Take theirs.
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimateOnScroll
                key={index}
                animationClass="animate-slide-in-up"
                hiddenClass="opacity-0"
                delay={`${index * 0.1}s`}
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-6 h-full flex flex-col justify-between hover:bg-white/15 transition-colors duration-200">
                  <div>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-white text-white" />
                      ))}
                    </div>
                    <blockquote className="text-white/80 leading-relaxed mb-6" style={{ fontSize: 18, fontWeight: 320 }}>
                      &ldquo;{testimonial.review}&rdquo;
                    </blockquote>
                  </div>
                  <div>
                    <p className="font-bold text-white" style={{ fontWeight: 540 }}>{testimonial.name}</p>
                    <p className="caption-mono text-white/50">{testimonial.company}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
