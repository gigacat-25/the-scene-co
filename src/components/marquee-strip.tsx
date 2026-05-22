interface Client {
  id?: number;
  name: string;
  logo_url?: string;
}

interface MarqueeStripProps {
  clients?: Client[];
}

const defaultClients: Client[] = [
  { name: "Custom Websites" },
  { name: "E-Commerce Stores" },
  { name: "POS Systems" },
  { name: "SaaS Dashboards" },
  { name: "Mobile-First Design" },
  { name: "Built-in CMS" },
  { name: "1 Year Free Hosting" },
  { name: "Cloudflare Edge" },
  { name: "Zero Templates" },
];

export function MarqueeStrip({ clients }: MarqueeStripProps) {
  const items = clients && clients.length > 0 ? clients : defaultClients;

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
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="caption-mono text-inverse-ink/80 px-6 inline-flex items-center gap-4"
          >
            <span
              className="inline-block w-1 h-1 rounded-full bg-inverse-ink/40"
              aria-hidden="true"
            />
            {item.logo_url ? (
              <img
                src={item.logo_url}
                alt={item.name}
                className="h-4 object-contain brightness-0 invert opacity-80"
              />
            ) : (
              <span>{item.name}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
