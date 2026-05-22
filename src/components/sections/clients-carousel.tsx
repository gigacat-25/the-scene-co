import { AnimateOnScroll } from "@/components/animate-on-scroll";

interface Client {
  id?: number;
  name: string;
  logo_url?: string;
}

interface ClientsCarouselProps {
  clients: Client[];
}

export function ClientsCarousel({ clients }: ClientsCarouselProps) {
  if (clients.length === 0) return null;

  // Double the list for a seamless loop
  const displayClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <div className="w-full bg-surface-soft border-t border-b border-hairline py-14 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 mb-8 max-w-6xl text-center">
        <span className="eyebrow-mono text-ink/50 uppercase tracking-widest text-xs">Brands We Have Worked With</span>
      </div>

      <div className="relative w-full flex items-center">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-surface-soft to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-surface-soft to-transparent z-10 pointer-events-none" />

        {/* Rolling track */}
        <div
          className="flex gap-6 whitespace-nowrap"
          style={{
            animation: "marquee 35s linear infinite",
            width: "max-content",
          }}
        >
          {displayClients.map((client, idx) => (
            <div
              key={idx}
              className="inline-flex items-center justify-center bg-canvas border border-hairline rounded-lg py-4 px-8 min-w-[150px] h-[75px] transition-all hover:border-ink/20 shadow-[0_1px_3px_rgba(0,0,0,0.02)] select-none group shrink-0"
            >
              {client.logo_url ? (
                <img
                  src={client.logo_url}
                  alt={client.name}
                  className="max-h-full max-w-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              ) : (
                <span className="text-ink font-semibold text-sm tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
