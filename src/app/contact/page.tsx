import { ContactForm } from "@/components/sections/contact-form";
import { MapSection } from "@/components/sections/map-section";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Contact Us — The Scene Co.",
  description: "Get in touch for a free consultation and quote. We respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Talk
          </h1>
          <p className="text-muted-foreground text-lg">
            Tell us about your project. We'll get back to you within 24 hours with a free consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <ContactForm />

          <div className="space-y-8">
            <div className="bg-secondary/20 border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-semibold text-lg mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <a href="mailto:hello@thescene.co.in" className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>hello@thescene.co.in</span>
                </a>
                <a href="tel:+919876543210" className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+91 98765 43210</span>
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>India</span>
                </div>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-green-400 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            <div className="bg-secondary/20 border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-semibold text-lg mb-4">Why Choose Us?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Custom-built, no templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>1 year free hosting included</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>1 year free domain registration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Built-in CMS — you control your content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Fast delivery — 7 to 45 days</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <MapSection />
    </div>
  );
}
