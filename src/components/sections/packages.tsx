"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Settings, 
  Globe, 
  ShoppingCart, 
  Send, 
  Search, 
  Users, 
  Paintbrush, 
  ShieldCheck, 
  CheckCircle2 
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: 1,
    num: "01",
    title: "WEBSITE DESIGN & DEVELOPMENT",
    subtitle: "ONLINE EXPERIENCE INTERFACE",
    description: "MODERN WEBSITES BUILT FOR SPEED, PERFORMANCE AND CONVERSIONS.",
    status: "ONLINE",
    icon: Code2,
    whatYouGet: "A PREMIUM VISUAL IDENTITY ON THE INTERNET WITH A CUSTOM DOMAIN ADDRESS. A SECURE LOGIN PANEL TO UPDATE CONTENT ANYTIME. FULL CODE DESIGNED FOR SPEED.",
    features: [
      "CUSTOM SITE DESIGN & CODING",
      "SECURE CONTENT EDIT PORTAL",
      "MOBILE AND TABLET OPTIMIZED",
      "HIGH SPEED LIGHTNING DEPLOYMENT",
      "GOOGLE SEARCH ENGINE INDEX READY"
    ],
    meters: [95, 90, 85, 95]
  },
  {
    id: 2,
    num: "02",
    title: "CUSTOM SOFTWARE DEVELOPMENT",
    subtitle: "INTERNAL OPERATIONS MODULE",
    description: "BUSINESS SOFTWARE TAILORED TO YOUR WORKFLOW.",
    status: "ACTIVE",
    icon: Settings,
    whatYouGet: "A TAILORED SOFTWARE PANEL BUILT EXACTLY FOR YOUR BUSINESS WORKFLOW. CENTRALIZED DATABASE RACKS AND DASHBOARDS TO ELIMINATE MANUAL SPREADSHEETS.",
    features: [
      "TAILORED LOGIC SCHEMATICS",
      "CENTRAL BUSINESS DATABASES",
      "AUTOMATED REPORTING DECKS",
      "MULTI-USER ACCESS CONTROL",
      "API INTEGRATION PORTS"
    ],
    meters: [90, 85, 92, 80]
  },
  {
    id: 3,
    num: "03",
    title: "WEB APPLICATIONS",
    subtitle: "INTERACTIVE SYSTEM DEPLOYMENT",
    description: "POWERFUL WEB APPS DESIGNED TO AUTOMATE YOUR BUSINESS.",
    status: "DEPLOYED",
    icon: Globe,
    whatYouGet: "A POWERFUL INTERACTIVE APP ACCESSIBLE VIA ANY WEB BROWSER. FEATURES LOGIN SCHEMAS, CLOUD DATABASES, AND INTEGRATION PORTS FOR AUTOMATION.",
    features: [
      "BROWSER-BASED PORTALS",
      "SECURE CLIENT ACCOUNTS",
      "CLOUD DATA COMPILATION",
      "THIRD-PARTY API BRIDGES",
      "SCALABLE NODE CLUSTER HOSTING"
    ],
    meters: [88, 95, 80, 90]
  },
  {
    id: 4,
    num: "04",
    title: "E-COMMERCE SOLUTIONS",
    subtitle: "TRANSACTION CORE ENGINE",
    description: "ONLINE STORES THAT SELL, SCALE AND PERFORM.",
    status: "LIVE",
    icon: ShoppingCart,
    whatYouGet: "A DIGITAL STORE EQUIPPED TO PROCESS CARDS, GPAY, AND UPI TRANSACTIONS. AN ADMIN PANEL TO TRACK ORDERS, STOCK COUNT, AND AUTO-SEND BILLS.",
    features: [
      "UPI, GPAY, CARD PAYMENT CORES",
      "INVENTORY COUNTER DASHBOARD",
      "AUTOMATIC COURIER TRACKING LINKS",
      "INVOICING AND RECEIPT LOGS",
      "CUSTOMER SALES METRICS ENGINE"
    ],
    meters: [92, 90, 85, 95]
  },
  {
    id: 5,
    num: "05",
    title: "DIGITAL MARKETING",
    subtitle: "TRAFFIC ACQUISITION SYSTEM",
    description: "MARKETING STRATEGIES THAT GENERATE MEASURABLE GROWTH.",
    status: "RUNNING",
    icon: Send,
    whatYouGet: "TARGETED CAMPAIGNS PLACED ACROSS SEARCH AND SOCIAL CHANNELS. REAL-TIME TRAFFIC MONITORING AND DATA-DRIVEN LEADS TO MULTIPLY CONVERSIONS.",
    features: [
      "AD CAMPAIGN MANAGEMENT",
      "LEAD ACQUISITION PIPELINES",
      "SOCIAL BROADCAST MARKETING",
      "ROI TRACKING DIAGNOSTICS",
      "CONVERSION FUNNEL OPTIMIZATION"
    ],
    meters: [85, 95, 75, 88]
  },
  {
    id: 6,
    num: "06",
    title: "SEARCH ENGINE OPTIMIZATION",
    subtitle: "ORGANIC INDEX SIGNAL",
    description: "INCREASE VISIBILITY AND RANK WHERE CUSTOMERS SEARCH.",
    status: "OPTIMIZED",
    icon: Search,
    whatYouGet: "COMPREHENSIVE ON-PAGE METADATA CODING AND STRATEGIC KEYWORDS. BUILT TO INDEX HIGHER AND CAPTURE ORGANIC GOOGLE TRAFFIC.",
    features: [
      "SCHEMATIC KEYWORD TARGETS",
      "ON-PAGE CODE METADATA AUDITS",
      "BREADCRUMB & SITE-MAP LINKING",
      "COMPETITOR RADAR TRACKING",
      "MONTHLY PERFORMANCE REPORTS"
    ],
    meters: [90, 92, 85, 99]
  },
  {
    id: 7,
    num: "07",
    title: "EVENT MANAGEMENT & PRODUCTION",
    subtitle: "REAL-WORLD LIVE BROADCAST",
    description: "CORPORATE EVENTS, COLLEGE FESTS, LAUNCHES AND EXPERIENCES.",
    status: "LIVE",
    icon: Users,
    whatYouGet: "COMPLETE ON-GROUND COORDINATION, TECHNICAL AUDIO-VISUAL PRODUCTION, STAGING, AND UNFORGETTABLE EXPERIENCES FOR CORPORATE AND COLLEGE FESTS.",
    features: [
      "AV PRODUCTION & LIGHTING",
      "STAGE DESIGN & COORDINATION",
      "CROWD FLOW LOGISTICS",
      "LIVE STREAM BROADCAST PORTS",
      "ARTIST & TALENT MANAGEMENT"
    ],
    meters: [95, 85, 90, 95]
  },
  {
    id: 8,
    num: "08",
    title: "BRANDING & CREATIVE DESIGN",
    subtitle: "IDENTITY SYSTEM DESIGN",
    description: "VISUAL IDENTITIES THAT PEOPLE REMEMBER.",
    status: "CREATIVE",
    icon: Paintbrush,
    whatYouGet: "A MEMORABLE CORPORATE LOGO, SLICK TYPOGRAPHY SCHEMES, AND BRAND STYLE SHEETS THAT POSITION YOUR BRAND AS AN ELITE MARKET LEADER.",
    features: [
      "CUSTOM LOGO SCHEMATICS",
      "BRAND STYLE SPECIFICATIONS",
      "TYPOGRAPHY AND PALETTE MATRIX",
      "MARKETING COLLATERAL PACKS",
      "CREATIVE DECK PRODUCTION"
    ],
    meters: [88, 90, 80, 92]
  },
  {
    id: 9,
    num: "09",
    title: "HOSTING & MAINTENANCE",
    subtitle: "INFRASTRUCTURE CLUSTER SHIELD",
    description: "RELIABLE INFRASTRUCTURE WITH CONTINUOUS SUPPORT.",
    status: "SECURED",
    icon: ShieldCheck,
    whatYouGet: "CONTINUOUS CLOUD SERVER MONITORING, COMPILATION BACKUPS, EDGE FIREWALL STATUS CHECKS, AND ALWAYS-ON HELPDESK REPAIR SUPPORT.",
    features: [
      "99.9% UPTIME EDGE CLOUD",
      "DAILY AUTOMATIC BACKUPS",
      "SECURITY PATCH INJECTIONS",
      "RAPID SUPPORT REPAIR HOTLINE",
      "CONTINUOUS PLATFORM VERIFICATION"
    ],
    meters: [98, 95, 90, 99]
  }
];

export function Packages() {
  return (
    <section className="w-full py-16 relative bg-[#050505] select-none">
      {/* Background HUD grids */}
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 relative z-10 px-4">
        <span className="font-mono text-xs text-[#7B6A60] tracking-[0.3em] uppercase block mb-3">
          // CAPABILITY_ARRAY
        </span>
        <h2 className="display-title text-[#F5F2EE] max-w-4xl mx-auto">
          CREATIVE TECHNOLOGY & PRODUCTION RACKS
        </h2>
        <p className="mt-4 font-mono text-xs text-[#7B6A60] tracking-wide max-w-2xl mx-auto uppercase">
          WE BUILD COMPLETE BUSINESS ECOSYSTEMS. DEPLOY ANY SERVICE MODULE BELOW TO INITIATE GROWTH parameters.
        </p>
      </div>

      {/* Grid of Broadcast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        {services.map((pkg, idx) => (
          <motion.div
            key={pkg.id}
            className="group relative bg-[#080808] border border-[#7B6A60]/30 p-6 flex flex-col justify-between transition-mechanical hover:border-[#D86B2A] hover:shadow-[0_0_20px_rgba(216,107,42,0.12)] min-h-[500px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Corner crosshairs */}
            <span className="absolute -top-[1px] -left-[1px] w-[6px] h-[6px] border-t border-l border-[#7B6A60]/40 group-hover:border-[#D86B2A] transition-colors" />
            <span className="absolute -top-[1px] -right-[1px] w-[6px] h-[6px] border-t border-r border-[#7B6A60]/40 group-hover:border-[#D86B2A] transition-colors" />
            <span className="absolute -bottom-[1px] -left-[1px] w-[6px] h-[6px] border-b border-l border-[#7B6A60]/40 group-hover:border-[#D86B2A] transition-colors" />
            <span className="absolute -bottom-[1px] -right-[1px] w-[6px] h-[6px] border-b border-r border-[#7B6A60]/40 group-hover:border-[#D86B2A] transition-colors" />

            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-[#7B6A60]/20 pb-4 mb-6">
              <span className="font-mono text-xl text-[#D86B2A] font-bold">
                {pkg.num}
              </span>
              
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7B6A60]/60 group-hover:bg-[#D86B2A] animate-pulse" />
                <span className="font-mono text-[9px] text-[#7B6A60] tracking-widest uppercase">
                  STATUS: {pkg.status}
                </span>
              </div>
            </div>

            {/* Center Info */}
            <div className="flex-grow flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <pkg.icon className="h-5 w-5 text-[#FFB36B] shrink-0" />
                <div>
                  <h3 className="font-mono text-xs tracking-[0.15em] font-black text-[#F5F2EE] uppercase">
                    {pkg.title}
                  </h3>
                  <span className="block font-mono text-[9px] text-[#7B6A60] tracking-[0.2em]">
                    {pkg.subtitle}
                  </span>
                </div>
              </div>

              <p className="font-mono text-[11px] text-[#7B6A60] leading-relaxed uppercase my-2">
                {pkg.description}
              </p>

              {/* WHAT YOU GET DELIVERABLES BOX */}
              <div className="bg-[#050505] p-3.5 border border-[#D86B2A]/30 text-[#FFB36B] font-mono text-[10px] uppercase leading-relaxed my-2">
                <span className="text-[#D86B2A] font-bold block mb-1">=== WHAT YOU GET ===</span>
                {pkg.whatYouGet}
              </div>

              {/* Meters */}
              <div className="flex flex-col gap-2 my-2 bg-[#050505] p-3 border border-[#7B6A60]/10">
                <div className="font-mono text-[8px] text-[#7B6A60] tracking-widest uppercase flex justify-between">
                  <span>OUT_BANDWIDTH</span>
                  <span>DB_GAIN</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {pkg.meters.map((meter, i) => (
                    <div key={i} className="h-1 bg-[#7B6A60]/10 relative overflow-hidden">
                      <motion.div
                        className="h-full bg-[#D86B2A]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${meter}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 + i * 0.1, duration: 1 }}
                        animate={{
                          width: [
                            `${meter}%`, 
                            `${Math.min(100, Math.max(10, meter + (Math.random() * 20 - 10)))}%`,
                            `${meter}%`
                          ]
                        }}
                        // @ts-ignore
                        transition={{
                          repeat: Infinity,
                          duration: 2 + Math.random() * 2,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Features list */}
              <div className="mt-4">
                <h4 className="font-mono text-[9px] text-[#FFB36B] tracking-[0.2em] uppercase font-bold mb-3">
                  // SPECS_CAPABILITIES:
                </h4>
                <ul className="space-y-2">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 font-mono text-[10px] text-[#7B6A60] uppercase">
                      <CheckCircle2 className="h-3 w-3 text-[#D86B2A] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="mt-8 border-t border-[#7B6A60]/20 pt-6">
              <Link
                href="/contact"
                className="w-full text-center block border border-[#7B6A60]/40 group-hover:border-[#D86B2A] text-[#7B6A60] group-hover:text-[#D86B2A] font-mono text-[10px] tracking-[0.2em] py-3 uppercase transition-all duration-300 font-bold bg-transparent"
              >
                SELECT MODULE
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
