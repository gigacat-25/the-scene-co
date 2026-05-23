import { ContactForm } from "@/components/sections/contact-form";
import { MarqueeStrip } from "@/components/marquee-strip";
import { Mail, Phone, MapPin, MessageCircle, CheckCircle2 } from "lucide-react";
import { JsonLd, webPageSchema } from "@/components/json-ld";
import { CopyableEmail } from "@/components/copyable-email";
import { getAllSettings } from "@/lib/db";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Contact Us — Get a Free Quote for Your Website or App",
  description:
    "Contact The Scene Co. for a free consultation and quote for your custom website, e-commerce store, or POS system. Based in Bangalore, India. We respond within 24 hours.",
  keywords: [
    "contact web developer India",
    "hire web developer Bangalore",
    "get website quote India",
    "free website consultation India",
    "web development inquiry Bangalore",
    "custom website quote India",
  ],
  alternates: { canonical: "https://www.thescene.co.in/contact" },
  openGraph: {
    url: "https://www.thescene.co.in/contact",
    title: "Contact The Scene Co. | Free Website Quote",
    description:
      "Get in touch for a free consultation and quote. We respond within 24 hours. Based in Bangalore, India.",
  },
};

export default async function ContactPage() {
  const settings: Record<string, string> = await getAllSettings().catch(() => ({}));
  const email = settings.contact_email || "hello@thescene.co.in";
  const phone = settings.contact_phone || "080 3150720 / +91 98457 14699";

  const rawWa = settings.whatsapp_number || "9845714699";
  const waClean = rawWa.replace(/\D/g, "");
  const waLink = waClean.length === 10 ? `91${waClean}` : waClean;
  const whatsappUrl = `https://wa.me/${waLink}`;

  const primaryPhone = phone.split("/")[0].trim();
  const telLink = `tel:${primaryPhone.replace(/[\s\-\+]/g, "")}`;

  const contactSchema = webPageSchema({
    name: "Contact The Scene Co. — Get a Free Quote",
    description:
      "Contact us for a free consultation and quote for your custom website, e-commerce store, or POS system. We respond within 24 hours.",
    url: "/contact",
    breadcrumbs: [{ name: "Contact", url: "https://www.thescene.co.in/contact" }],
  });

  return (
    <div className="flex flex-col bg-canvas">
      <JsonLd data={contactSchema} />

      {/* Hero */}
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

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 py-20 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-canvas border border-hairline rounded-lg p-6">
              <h3 className="text-ink font-bold mb-5" style={{ fontSize: 20, fontWeight: 540 }}>Get in touch</h3>
              <div className="space-y-4">
                <CopyableEmail email={email} />
                <a href={telLink} className="flex items-center gap-3 group">
                  <div className="btn-icon-circular shrink-0"><Phone className="h-4 w-4" /></div>
                  <div>
                    <div className="caption-mono text-ink/40 mb-0.5">Phone</div>
                    <span className="body-sm-figma text-ink group-hover:underline">{phone}</span>
                  </div>
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="btn-icon-circular shrink-0"><MessageCircle className="h-4 w-4" /></div>
                  <div>
                    <div className="caption-mono text-ink/40 mb-0.5">WhatsApp</div>
                    <span className="body-sm-figma text-ink group-hover:underline">WhatsApp Us</span>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="btn-icon-circular shrink-0"><MapPin className="h-4 w-4" /></div>
                  <div>
                    <div className="caption-mono text-ink/40 mb-0.5">Location</div>
                    <span className="body-sm-figma text-ink">Bangalore, Karnataka, India</span>
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
