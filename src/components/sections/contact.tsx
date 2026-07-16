"use client";

import { ContactForm } from "@/components/sections/contact-form";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export function Contact({ settings }: { settings?: Record<string, string> }) {
  const email = settings?.contact_email || "hello@thescene.co.in";
  const rawWa = settings?.whatsapp_number || "9845714699";
  const waClean = rawWa.replace(/\D/g, "");
  const waLink = waClean.length === 10 ? `91${waClean}` : waClean;
  const whatsappUrl = `https://wa.me/${waLink}`;
  const whatsappDisplay = rawWa.startsWith("+") ? rawWa : `+91 ${rawWa.replace(/(\d{5})(\d{5})/, "$1 $2")}`;
  const address = settings?.contact_address || "Bengaluru, India — serving clients worldwide";

  return (
    <section className="w-full py-16 bg-[#050505] border-t border-[#7B6A60]/20 relative select-none">
      <div className="absolute inset-0 tech-grid opacity-[0.08] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <div className="border border-[#7B6A60]/30 bg-[#080808] p-6 md:p-8 relative">
          {/* Corner brackets */}
          <span className="absolute -top-[1px] -left-[1px] w-[8px] h-[8px] border-t-2 border-l-2 border-[#D86B2A]" />
          <span className="absolute -top-[1px] -right-[1px] w-[8px] h-[8px] border-t-2 border-r-2 border-[#D86B2A]" />
          <span className="absolute -bottom-[1px] -left-[1px] w-[8px] h-[8px] border-b-2 border-l-2 border-[#D86B2A]" />
          <span className="absolute -bottom-[1px] -right-[1px] w-[8px] h-[8px] border-b-2 border-r-2 border-[#D86B2A]" />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            {/* Left side: System Comms Specs */}
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs text-[#7B6A60] tracking-[0.3em] block mb-2 uppercase">
                  // CONNECT_MODULE
                </span>
                <h2 className="display-title text-[#F5F2EE] mb-4">
                  INITIATE COMMS
                </h2>
                <p className="font-mono text-xs text-[#7B6A60] leading-relaxed uppercase max-w-md">
                  SUBMIT YOUR SYSTEM SPECS AND PARAMETERS. OUR PRODUCTION DESK WILL COMPILE A DETAILED BLUEPRINT ESTIMATE WITHIN 24 HOURS.
                </p>
              </div>

              <div className="h-[1px] bg-[#7B6A60]/20 my-6" />

              <div className="space-y-4">
                {/* Email Node */}
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 group bg-[#050505] p-3 border border-[#7B6A60]/20 hover:border-[#D86B2A] transition-all"
                >
                  <div className="w-10 h-10 border border-[#7B6A60]/40 group-hover:border-[#D86B2A] flex items-center justify-center text-[#7B6A60] group-hover:text-[#D86B2A] transition-colors shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-[#7B6A60] tracking-widest uppercase">SMTP_CHANNEL</span>
                    <span className="font-mono text-xs text-[#F5F2EE] group-hover:text-[#FFB36B] transition-colors">{email}</span>
                  </div>
                </a>

                {/* WhatsApp Link */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group bg-[#050505] p-3 border border-[#7B6A60]/20 hover:border-[#D86B2A] transition-all"
                >
                  <div className="w-10 h-10 border border-[#7B6A60]/40 group-hover:border-[#D86B2A] flex items-center justify-center text-[#7B6A60] group-hover:text-[#D86B2A] transition-colors shrink-0">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-[#7B6A60] tracking-widest uppercase">DIRECT_COMMS</span>
                    <span className="font-mono text-xs text-[#F5F2EE] group-hover:text-[#FFB36B] transition-colors">{whatsappDisplay}</span>
                  </div>
                </a>

                {/* Location Display */}
                <div className="flex items-center gap-4 bg-[#050505] p-3 border border-[#7B6A60]/20">
                  <div className="w-10 h-10 border border-[#7B6A60]/40 flex items-center justify-center text-[#7B6A60] shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-[#7B6A60] tracking-widest uppercase">GEOGRAPHIC_NODE</span>
                    <span className="font-mono text-xs text-[#F5F2EE]">{address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: ContactForm terminal */}
            <div className="w-full">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
