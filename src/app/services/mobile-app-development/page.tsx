import Link from "next/link";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { JsonLd, webPageSchema, serviceSchema } from "@/components/json-ld";
import type { Metadata } from "next";
import { Smartphone, Laptop, Zap, Check, ShieldCheck, ArrowUpRight } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Mobile App Development Company Bangalore | iOS & Android Apps",
  description:
    "Looking for a leading mobile app development company in Bangalore? We build premium iOS and Android applications using React Native and Flutter. Get high-performance cross-platform apps.",
  keywords: [
    "mobile app development company Bangalore",
    "mobile app developers Bangalore",
    "React Native developers Bangalore",
    "Flutter app development Bangalore",
    "iOS app development India",
    "Android app development India",
  ],
  alternates: { canonical: "https://www.thescene.co.in/services/mobile-app-development" },
  openGraph: {
    url: "https://www.thescene.co.in/services/mobile-app-development",
    title: "Mobile App Development Company in Bangalore | The Scene Co.",
    description:
      "Bespoke iOS and Android mobile app development. We build cross-platform mobile solutions with high performance.",
  },
};

const pageSchema = webPageSchema({
  name: "Mobile App Development Services in Bangalore | The Scene Co.",
  description:
    "Premium cross-platform mobile app development services. We build secure iOS and Android apps using React Native & Flutter.",
  url: "/services/mobile-app-development",
  breadcrumbs: [
    { name: "Services", url: "https://www.thescene.co.in/services" },
    { name: "Mobile App Development", url: "https://www.thescene.co.in/services/mobile-app-development" },
  ],
});

const serviceJsonLd = serviceSchema({
  name: "Mobile App Development",
  description: "Cross-platform iOS and Android mobile applications built using React Native or Flutter. High performance, secure database integration.",
  url: "/services/mobile-app-development",
});

export default function MobileAppDevelopmentServicePage() {
  const steps = [
    {
      title: "Interactive Wireframes",
      desc: "We draft precise mobile screen paths and user interactions to define app usability before writing backend code.",
    },
    {
      title: "React Native & Flutter Coding",
      desc: "We write clean, compile-safe mobile codebases to share components between iOS and Android versions.",
    },
    {
      title: "Secure API Integrations",
      desc: "We connect secure HTTPS endpoints, user authentication flows, push alerts, and billing engines.",
    },
    {
      title: "App Store Publishing",
      desc: "We manage the entire submission process for Apple App Store and Google Play Console.",
    },
  ];

  return (
    <div className="flex flex-col bg-canvas text-ink overflow-hidden">
      <JsonLd data={pageSchema} />
      <JsonLd data={serviceJsonLd} />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-surface-soft border-b border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <Link href="/services" className="eyebrow-mono text-ink/50 hover:text-ink transition-colors mb-4 inline-flex items-center gap-2">
            &larr; All Services
          </Link>
          <h1 className="display-lg text-ink mb-6 mt-2">
            Mobile App
            <br />
            <span className="font-bold">Development.</span>
          </h1>
          <p className="body-lg-figma text-ink/75 max-w-2xl mb-8">
            Extend your brand presence directly to mobile devices. We engineer high-performance cross-platform apps for iOS and Android, using React Native or Flutter.
          </p>
          <div className="flex gap-4">
            <Link href="/contact" className="btn-primary-figma">
              Start Your App
            </Link>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* App development flow */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="eyebrow-mono text-accent-magenta">Our Method</span>
            <h2 className="text-ink text-3xl md:text-4xl font-bold mt-2">
              Structured mobile application engineering
            </h2>
            <p className="text-ink/70 mt-3 max-w-xl mx-auto">
              From layout draft to app store launch, our Bangalore-based mobile developers handle everything.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="p-8 bg-surface-soft rounded-2xl border border-hairline flex gap-6">
                <span className="font-mono text-ink/40 text-xl font-bold">0{i+1}</span>
                <div>
                  <h3 className="text-lg font-bold text-ink mb-2">{s.title}</h3>
                  <p className="text-sm text-ink/70 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-surface-soft border-y border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center space-y-6">
          <span className="eyebrow-mono text-accent-magenta">Technology</span>
          <h3 className="text-2xl md:text-3xl font-bold text-ink">
            Native performance, cross-platform efficiency
          </h3>
          <p className="body-figma text-ink/75 leading-relaxed">
            By leveraging cross-platform tools like React Native and Flutter, we develop mobile apps that share up to 90% of their codebase between iOS and Android. This cuts development timelines and budgets in half, while preserving smooth animations and native speed.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-semantic-success" />
              <span className="text-sm font-bold">Biometric Auth (FaceID / TouchID)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-semantic-success" />
              <span className="text-sm font-bold">Offline Database Synchronization</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-semantic-success" />
              <span className="text-sm font-bold">Push Notifications & Live Updates</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title="Ready to build your mobile app?"
        subtitle="Consult our mobile development agency in Bangalore today. We'll set up interactive wireframes and a detailed product quote."
        ctaText="Get Started"
        ctaLink="/contact"
        colorBlock="lilac"
      />
    </div>
  );
}
