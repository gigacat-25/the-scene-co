import { ContactForm } from "@/components/sections/contact-form";
import { AnimateOnScroll } from "../animate-on-scroll";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export function Contact({ settings }: { settings?: Record<string, string> }) {
  const email = settings?.contact_email || "hello@thescene.co.in";
  const rawWa = settings?.whatsapp_number || "9845714699";
  const waClean = rawWa.replace(/\D/g, "");
  const waLink = waClean.length === 10 ? `91${waClean}` : waClean;
  const whatsappUrl = `https://wa.me/${waLink}`;
  const whatsappDisplay = rawWa.startsWith("+") ? rawWa : `+91 ${rawWa.replace(/(\d{5})(\d{5})/, "$1 $2")}`;
  const address = settings?.contact_address || "India — serving clients worldwide";

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
                    href={`mailto:${email}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="btn-icon-circular shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="caption-mono text-ink/50 mb-0.5">Email</div>
                      <div className="body-sm-figma text-ink group-hover:underline">{email}</div>
                    </div>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="btn-icon-circular shrink-0">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="caption-mono text-ink/50 mb-0.5">WhatsApp</div>
                      <div className="body-sm-figma text-ink group-hover:underline">{whatsappDisplay}</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="btn-icon-circular shrink-0">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="caption-mono text-ink/50 mb-0.5">Location</div>
                      <div className="body-sm-figma text-ink">{address}</div>
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
