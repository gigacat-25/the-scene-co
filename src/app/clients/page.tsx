import { getPublishedClients } from "@/lib/db";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { CtaBanner } from "@/components/sections/cta-banner";

export const runtime = "edge";

export const metadata = {
  title: "Our Clients — The Scene Co.",
  description: "Explore the businesses, brands, and startups we've collaborated with to build bespoke digital products.",
};

export default async function ClientsPage() {
  const clients = await getPublishedClients();

  return (
    <div className="flex flex-col bg-canvas">
      {/* Hero Header */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-16 max-w-6xl">
        <span className="eyebrow-mono text-ink/60 block mb-4">CLIENTS</span>
        <h1
          className="text-ink mb-8"
          style={{ fontSize: "clamp(36px, 5vw, 86px)", fontWeight: 340, lineHeight: 1.0, letterSpacing: "-1.72px" }}
        >
          People We&apos;ve
          <br />
          <span style={{ fontWeight: 700 }}>Worked With</span>
        </h1>
        <p className="body-figma text-ink/75 max-w-xl" style={{ fontSize: 18, fontWeight: 320, lineHeight: 1.45 }}>
          From startups to established brands, we partner with visionary businesses to launch custom websites, platforms, and POS software.
        </p>
      </div>

      <div className="h-px bg-hairline" />

      {/* Clients Grid */}
      <div className="container mx-auto px-4 sm:px-6 py-20 max-w-6xl">
        {clients.length === 0 ? (
          <div className="text-center py-12 text-ink/50">
            No clients added yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {clients.map((client, index) => (
              <AnimateOnScroll
                key={client.id ?? client.name}
                animationClass="animate-slide-in-up"
                hiddenClass="opacity-0"
                delay={`${(index % 5) * 0.08}s`}
                className="w-full"
              >
                <div className="bg-canvas border border-hairline rounded-lg hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:border-ink/20 transition-all duration-200 aspect-[4/3] flex items-center justify-center p-6 text-center select-none group">
                  {client.logo_url ? (
                    <img
                      src={client.logo_url}
                      alt={client.name}
                      className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <div className="text-ink font-semibold text-lg sm:text-xl">
                      {client.name}
                    </div>
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        )}
      </div>

      {/* CTA Banner */}
      <CtaBanner
        title="Ready to build your digital presence?"
        subtitle="Let's build a custom website, e-commerce store, or POS system together. Get a free proposal in 24 hours."
        ctaText="Get a Free Quote"
        ctaLink="/contact"
        secondaryText="Our Services"
        secondaryLink="/services"
        colorBlock="navy"
      />
    </div>
  );
}
