"use client";

import { AnimateOnScroll } from "@/components/animate-on-scroll";

const teamMembers = [
  {
    name: "Your Name",
    role: "Founder & Creative Director",
    bio: "Building premium websites, POS systems, and SaaS products for businesses that want more than templates.",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "1 yr", label: "Free Hosting Included" },
  { value: "100%", label: "Custom — No Templates" },
  { value: "24 hr", label: "Support Response" },
];

export function Leadership() {
  return (
    <section className="w-full bg-canvas py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline border border-hairline rounded-lg overflow-hidden mb-12 md:mb-24">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 sm:p-8 text-center bg-canvas hover:bg-surface-soft transition-colors duration-200"
            >
              <div
                className="text-ink mb-2"
                style={{ fontSize: "clamp(24px,4vw,48px)", fontWeight: 700, lineHeight: 1 }}
              >
                {stat.value}
              </div>
              <div className="caption-mono text-ink/50 text-[10px] sm:text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <AnimateOnScroll animationClass="animate-slide-in-up" hiddenClass="opacity-0">
          <div className="text-center mb-16">
            <span className="eyebrow-mono text-ink/60 block mb-3">The Team</span>
            <h2
              className="text-ink"
              style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 340, lineHeight: 1.1, letterSpacing: "-0.96px" }}
            >
              Meet The Scene Co.
            </h2>
            <p className="mt-4 body-lg-figma text-ink/70 max-w-xl mx-auto">
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
              className="w-full sm:w-80"
            >
              <div className="bg-canvas border border-hairline rounded-lg overflow-hidden hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-200">
                <div className="aspect-[4/3] relative overflow-hidden bg-surface-soft">
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-ink mb-1" style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.45 }}>
                    {member.name}
                  </h3>
                  <p className="caption-mono text-ink/50 mb-4">{member.role}</p>
                  <div className="h-px bg-hairline-soft mb-4" />
                  <p className="body-sm-figma text-ink/70 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
