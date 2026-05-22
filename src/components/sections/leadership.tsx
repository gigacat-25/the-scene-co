"use client";

import Link from "next/link";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

interface TeamMember {
  id?: number;
  name: string;
  role: string;
  bio?: string;
  image_url?: string;
  order_index?: number;
}

interface LeadershipProps {
  teamMembers?: TeamMember[];
  showViewAll?: boolean;
}

const defaultTeamMembers: TeamMember[] = [
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

export function Leadership({ teamMembers, showViewAll }: LeadershipProps) {
  const members = teamMembers && teamMembers.length > 0 ? teamMembers : defaultTeamMembers;

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
          {members.map((member, index) => (
            <AnimateOnScroll
              key={member.id ?? member.name}
              animationClass="animate-slide-in-up"
              hiddenClass="opacity-0"
              delay={`${index * 0.1}s`}
              className="w-full sm:w-80"
            >
              <div className="bg-canvas border border-hairline rounded-lg overflow-hidden hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-200">
                <div className="aspect-[4/3] relative overflow-hidden bg-surface-soft">
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ink/20 text-5xl font-bold">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-ink mb-1" style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.45 }}>
                    {member.name}
                  </h3>
                  <p className="caption-mono text-ink/50 mb-4">{member.role}</p>
                  <div className="h-px bg-hairline-soft mb-4" />
                  {member.bio && (
                    <p className="body-sm-figma text-ink/70 leading-relaxed">{member.bio}</p>
                  )}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {showViewAll && (
          <div className="mt-12 text-center">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3 border border-ink text-ink rounded-full hover:bg-ink hover:text-canvas transition-colors duration-200 font-sans text-sm font-semibold"
            >
              Meet the Whole Team
              <span className="text-xs">➔</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

