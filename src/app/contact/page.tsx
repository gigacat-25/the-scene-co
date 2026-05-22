import { ContactForm } from "@/components/sections/contact-form";
import { MarqueeStrip } from "@/components/marquee-strip";
import { Mail, Phone, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Contact — The Scene Co.",
  description: "Get in touch for a free consultation and quote. We respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col bg-canvas">

      {/* Hero — white canvas */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-16 max-w-6xl">
        <span className="eyebrow-mono text-ink/60 block mb-4">Contact</span>
        <h1
          className="text-ink mb-6"
          style={{ fontSize: "clamp(36px, 5vw, 86px)", fontWeight: 340, lineHeight: 1.0, letterSpacing: "-1.72px" }}
        >
          Let&apos;s build
          <br />
          <span style={{ fontWeight: 700 }}>something great.</span>
        </h1>
        <p className="body-lg-figma text-ink/70 max-w-2xl">
          Tell us about your project. We&apos;ll get back to you within 24 hours with a free consultation.
        </p>
      </div>

      <MarqueeStrip />

      {/* Main content — white canvas */}
      <div className="container mx-auto px-4 sm:px-6 py-20 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Contact info — 2 cols */}
          <div className="lg:col-span-2 space-y-6">

            <div className="bg-canvas border border-hairline rounded-lg p-6">
              <h3 className="text-ink font-bold mb-5" style={{ fontSize: 20, fontWeight: 540 }}>Get in touch</h3>
              <div className="space-y-4">
                <a href="mailto:hello@thescene.co.in" className="flex items-center gap-3 group">
                  <div className="btn-icon-circular shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="caption-mono text-ink/40 mb-0.5">Email</div>
                    <span className="body-sm-figma text-ink group-hover:underline">hello@thescene.co.in</span>
                  </div>
                </a>
                <a href="tel:+919876543210" className="flex items-center gap-3 group">
                  <div className="btn-icon-circular shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="caption-mono text-ink/40 mb-0.5">Phone</div>
                    <span className="body-sm-figma text-ink group-hover:underline">+91 98765 43210</span>
                  </div>
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="btn-icon-circular shrink-0">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="caption-mono text-ink/40 mb-0.5">WhatsApp</div>
                    <span className="body-sm-figma text-ink group-hover:underline">WhatsApp Us</span>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="btn-icon-circular shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="caption-mono text-ink/40 mb-0.5">Location</div>
                    <span className="body-sm-figma text-ink">India — serving clients worldwide</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="color-block-panel color-block-panel-lime" style={{ padding: "24px" }}>
              <h3 className="text-ink font-bold mb-4" style={{ fontSize: 18, fontWeight: 540 }}>Why choose us?</h3>
              <ul className="space-y-3">
                {[
                  "Custom-built, no templates",
                  "1 year free hosting included",
                  "1 year free domain registration",
                  "Built-in CMS — you control your content",
                  "Fast delivery — 7 to 45 days",
                  "24-hour support response",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-ink shrink-0 mt-0.5" />
                    <span className="body-sm-figma text-ink/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
