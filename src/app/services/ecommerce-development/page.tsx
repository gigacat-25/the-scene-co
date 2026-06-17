import Link from "next/link";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { CtaBanner } from "@/components/sections/cta-banner";
import { MarqueeStrip } from "@/components/marquee-strip";
import { JsonLd, webPageSchema, serviceSchema } from "@/components/json-ld";
import type { Metadata } from "next";
import { ShoppingBag, CreditCard, ShieldCheck, BarChart, Truck, Database } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Best E-Commerce Website Development Company in Bangalore, India | Online Store Design",
  description:
    "Top e-commerce website development company in Bangalore. Launch your online store with custom Next.js e-commerce. Integrated Razorpay, Stripe & UPI, real-time inventory management, and built-in CMS. Serving all of India.",
  keywords: [
    "best e-commerce website development company Bangalore",
    "e-commerce website development Bangalore",
    "online store development Bangalore",
    "Razorpay integration India",
    "custom e-commerce website India",
    "Next.js e-commerce agency",
    "online shopping site developer Bangalore",
    "e-commerce development company India",
  ],
  alternates: { canonical: "https://www.thescene.co.in/services/ecommerce-development" },
  openGraph: {
    url: "https://www.thescene.co.in/services/ecommerce-development",
    title: "Best E-Commerce Website Development Company in Bangalore, India | The Scene Co.",
    description:
      "Top e-commerce stores with secure local checkouts (Razorpay, Stripe, UPI), lightning-fast product pages, and dynamic inventory synchronization. Best e-commerce developer in Bangalore.",
  },
};

const pageSchema = webPageSchema({
  name: "E-Commerce Website Development Bangalore, India | The Scene Co.",
  description:
    "Custom online store development services with Razorpay, Stripe, and UPI integration. Fast shopping experiences built with Next.js.",
  url: "/services/ecommerce-development",
  breadcrumbs: [
    { name: "Services", url: "https://www.thescene.co.in/services" },
    { name: "E-Commerce Development", url: "https://www.thescene.co.in/services/ecommerce-development" },
  ],
});

const serviceJsonLd = serviceSchema({
  name: "E-Commerce Store Development",
  description: "Next.js e-commerce store with secure local checkouts (Razorpay, Stripe, UPI), inventory sync, and custom CMS.",
  url: "/services/ecommerce-development",
});

export default function EcommerceDevelopmentServicePage() {
  const systems = [
    {
      title: "Razorpay, Stripe & UPI Integration",
      desc: "Connect direct bank transfers, UPI apps, Paytm, Razorpay, and Stripe for seamless customer checkouts.",
      icon: CreditCard,
    },
    {
      title: "Real-Time Inventory Dashboard",
      desc: "Synchronize stock counts across multiple sales channels instantly. Get automated low stock email notifications.",
      icon: Database,
    },
    {
      title: "Secure Customer Accounts",
      desc: "Let buyers save billing details, check order histories, manage wishes, and request returns securely.",
      icon: ShieldCheck,
    },
    {
      title: "Analytics & Tracking Tools",
      desc: "Implement Google Analytics, Facebook Pixel, and conversion tracking directly in your checkout pipeline.",
      icon: BarChart,
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
            Best E-Commerce Website
            <br />
            <span className="font-bold">Development in Bangalore, India.</span>
          </h1>
          <p className="body-lg-figma text-ink/75 max-w-2xl mb-8">
            Build a high-converting online shop with lightning-fast page loading speeds, custom checkouts, and clean product catalogs. Deployed on Cloudflare for 100% server availability.
          </p>
          <div className="flex gap-4">
            <Link href="/contact" className="btn-primary-figma">
              Start Your Shop
            </Link>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* E-commerce Systems */}
      <section className="py-20 bg-canvas">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="eyebrow-mono text-accent-magenta">Systems</span>
            <h2 className="text-ink text-3xl md:text-4xl font-bold mt-2">
              Everything needed to run your online store
            </h2>
            <p className="text-ink/70 mt-3 max-w-xl mx-auto">
              Our e-commerce developers configure complete checkout systems from database setup to logistics tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {systems.map((s, i) => {
              const IconComp = s.icon;
              return (
                <div key={i} className="p-8 bg-surface-soft rounded-2xl border border-hairline flex gap-6 items-start">
                  <div className="p-3 bg-canvas rounded-xl border border-hairline text-ink shrink-0">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink mb-2">{s.title}</h3>
                    <p className="text-sm text-ink/70 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEO Deep-dive for E-commerce */}
      <section className="py-20 bg-surface-soft border-y border-hairline">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-8">
          <h3 className="text-2xl md:text-3xl font-bold text-ink text-center">
            How we optimize your online store for Google Search
          </h3>
          <p className="body-figma text-ink/75 leading-relaxed text-center">
            Unlike slow Shopify templates that suffer from server latency and bloated scripts, we code lightweight Next.js product pages. We embed product schema markup (price, availability, rating) dynamically, enabling rich snippets on Google Search results pages. This drives more click-throughs and lowers acquisition budgets.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="p-6 bg-canvas rounded-xl border border-hairline text-center">
              <span className="font-mono text-ink text-xl font-bold block mb-2">99/100</span>
              <span className="text-sm text-ink/70">Mobile Lighthouse Speed Score</span>
            </div>
            <div className="p-6 bg-canvas rounded-xl border border-hairline text-center">
              <span className="font-mono text-ink text-xl font-bold block mb-2">1 Year</span>
              <span className="text-sm text-ink/70">Free Cloudflare Edge Hosting</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title="Ready to boost your sales?"
        subtitle="Talk to our e-commerce developers in Bangalore. Get a secure online shop, custom invoice layouts, and 1 year free domain registration."
        ctaText="Get Started"
        ctaLink="/contact"
        colorBlock="coral"
      />
    </div>
  );
}
