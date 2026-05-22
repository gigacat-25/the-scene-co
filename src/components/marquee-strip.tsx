"use client";

const items = [
  "Custom Websites",
  "E-Commerce Stores",
  "POS Systems",
  "SaaS Dashboards",
  "Mobile-First Design",
  "Built-in CMS",
  "1 Year Free Hosting",
  "Cloudflare Edge",
  "Zero Templates",
  "Razorpay & Stripe",
];

export function MarqueeStrip() {
  return (
    <div
      className="w-full overflow-hidden bg-inverse-canvas text-inverse-ink"
      style={{ height: 36 }}
      aria-hidden="true"
    >
      <div
        className="flex items-center h-full gap-0 whitespace-nowrap"
        style={{
          animation: "marquee 28s linear infinite",
          width: "max-content",
        }}
      >
        {/* Doubled for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="caption-mono text-inverse-ink/80 px-6 inline-flex items-center gap-2"
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-inverse-ink/40"
              aria-hidden="true"
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
