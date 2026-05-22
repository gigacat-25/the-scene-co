import { ContactForm } from "@/components/sections/contact-form";
import { AnimateOnScroll } from "../animate-on-scroll";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section className="w-full">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="color-block-panel color-block-panel-coral">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            <div>
              <AnimateOnScroll animationClass="animate-slide-in-up" hiddenClass="opacity-0">
                <span className="caption-mono text-ink/50 mb-3 block">Contact</span>
                <h2
                  className="text-ink mb-6"
                  style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 340, lineHeight: 1.1, letterSpacing: "-0.96px" }}
                >
                  Let&apos;s build something great together
                </h2>
                <p className="body-lg-figma text-ink/75 mb-10 max-w-md leading-relaxed">
                  Tell us about your project and we&apos;ll get back to you within 24 hours with a free quote.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll animationClass="animate-slide-in-up" hiddenClass="opacity-0" delay="0.1s">
                <div className="space-y-5">
                  <a
                    href="mailto:hello@thescene.co.in"
                    className="flex items-center gap-4 group"
                  >
                    <div className="btn-icon-circular shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="caption-mono text-ink/50 mb-0.5">Email</div>
                      <div className="body-sm-figma text-ink group-hover:underline">hello@thescene.co.in</div>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="btn-icon-circular shrink-0">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="caption-mono text-ink/50 mb-0.5">WhatsApp</div>
                      <div className="body-sm-figma text-ink group-hover:underline">+91 98765 43210</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="btn-icon-circular shrink-0">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="caption-mono text-ink/50 mb-0.5">Location</div>
                      <div className="body-sm-figma text-ink">India — serving clients worldwide</div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
