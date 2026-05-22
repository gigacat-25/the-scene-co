"use client";

import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Your Name",
    role: "Founder & Creative Director",
    bio: "Building premium websites, POS systems, and SaaS products for businesses that want more than templates.",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
];

export function Leadership() {
  return (
    <section id="team" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimateOnScroll animationClass="animate-slide-in-up" hiddenClass="opacity-0">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-6">
              Meet The Scene Co.
            </h2>
            <p className="text-muted-foreground text-lg">
              We build premium websites, e-commerce platforms, and POS systems — full-stack, custom-designed, with 1 year free hosting.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <AnimateOnScroll
              key={member.name}
              animationClass="animate-slide-in-up"
              hiddenClass="opacity-0"
              delay={`${index * 0.1}s`}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md"
            >
              <Card className="bg-secondary/30 border-white/10 overflow-hidden hover:border-primary/50 transition-colors group w-full">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="font-headline text-2xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium">{member.role}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
