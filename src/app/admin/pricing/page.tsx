"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";

export const runtime = "edge";

export default function AdminPricingPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    try {
      const res = await fetch("/api/pricing");
      const data = await res.json() as { plans?: any[] };
      setItems(data.plans || []);
    } catch { setItems([]); }
    finally { setLoading(false); }
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-ink/50" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-ink font-bold" style={{ fontSize: 32, fontWeight: 540 }}>Pricing Plans</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-canvas border border-hairline shadow-sm rounded-lg p-6 relative">
            {item.is_popular === 1 && (
              <span className="absolute top-4 right-4 bg-ink text-canvas caption-mono px-2 py-1 rounded-md text-[10px]">POPULAR</span>
            )}
            <h3 className="text-ink font-bold text-lg mb-1">{item.name}</h3>
            <p className="text-ink/60 text-sm mb-4 h-10">{item.description}</p>
            
            <div className="mb-4">
              <span className="text-ink text-3xl font-bold">{item.currency}{item.price_min}</span>
            </div>
            
            <p className="text-ink/50 text-xs mb-6">Delivery: {item.delivery_time}</p>
            
            <button className="w-full btn-secondary-figma text-sm">Edit Plan (Coming Soon)</button>
          </div>
        ))}
      </div>
    </div>
  );
}
