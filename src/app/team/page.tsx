import { getPublishedTeamMembers } from "@/lib/db";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd, webPageSchema } from "@/components/json-ld";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Our Team — Designers & Developers Behind The Scene Co.",
  description:
    "Meet the passionate designers, developers, and engineers at The Scene Co. — a web development agency in Bangalore building custom websites, e-commerce stores, and POS systems.",
  keywords: [
    "web development team India",
    "software developers Bangalore",
    "web designers India",
    "The Scene Co team",
    "full stack developers Bangalore",
  ],
  alternates: { canonical: "https://thescene.co.in/team" },
  openGraph: {
    url: "https://thescene.co.in/team",
    title: "Our Team | The Scene Co.",
    description:
      "Meet the designers and developers behind The Scene Co. — building custom websites and digital products from Bangalore.",
  },
};

export default async function TeamPage() {
  const teamMembers = await getPublishedTeamMembers();

  const teamSchema = webPageSchema({
    name: "Our Team — Designers & Developers | The Scene Co.",
    description:
      "Meet the team of designers, developers, and engineers behind The Scene Co. — a premium web development agency in Bangalore.",
    url: "/team",
    breadcrumbs: [{ name: "Team", url: "https://thescene.co.in/team" }],
  });

  return (
    <div className="flex flex-col bg-canvas">
      <JsonLd data={teamSchema} />

      {/* Hero Header */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-16 max-w-6xl">
        <span className="eyebrow-mono text-ink/60 block mb-4">OUR TEAM</span>
        <h1
          className="text-ink mb-8"
          style={{ fontSize: "clamp(36px, 5vw, 86px)", fontWeight: 340, lineHeight: 1.0, letterSpacing: "-1.72px" }}
        >
          Meet The
          <br />
          <span style={{ fontWeight: 700 }}>Scene Co. Team</span>
        </h1>
        <p className="body-figma text-ink/75 max-w-xl" style={{ fontSize: 18, fontWeight: 320, lineHeight: 1.45 }}>
          We are a dedicated group of designers, developers, and product minds passionate about crafting custom-designed digital experiences. No templates, no shortcuts.
        </p>
      </div>

      <div className="h-px bg-hairline" />

      {/* Team Grid */}
      <div className="container mx-auto px-4 sm:px-6 py-20 max-w-6xl">
        {teamMembers.length === 0 ? (
          <div className="text-center py-12 text-ink/50">
            No team members added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <AnimateOnScroll
                key={member.id ?? member.name}
                animationClass="animate-slide-in-up"
                hiddenClass="opacity-0"
                delay={`${(index % 4) * 0.1}s`}
                className="w-full"
              >
                <div className="bg-canvas border border-hairline rounded-lg overflow-hidden hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-200 h-full flex flex-col">
                  <div className="aspect-[4/3] relative overflow-hidden bg-surface-soft shrink-0">
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        alt={`${member.name} — ${member.role} at The Scene Co.`}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-ink/20 text-5xl font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-ink mb-1" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.35 }}>
                      {member.name}
                    </h3>
                    <p className="caption-mono text-ink/50 mb-4 text-xs">{member.role}</p>
                    <div className="h-px bg-hairline-soft mb-4" />
                    {member.bio && (
                      <p className="body-sm-figma text-ink/70 leading-relaxed text-sm flex-grow">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        )}
      </div>

      <CtaBanner
        title="Want to build with us?"
        subtitle="Get a free quote today. Our team is ready to design and engineer your premium digital product."
        ctaText="Get a Free Quote"
        ctaLink="/contact"
        secondaryText="View Portfolio"
        secondaryLink="/portfolio"
        colorBlock="navy"
      />
    </div>
  );
}
