"use client";

import { useState, useEffect } from "react";
import { Loader2, Edit, Trash2, X, Check } from "lucide-react";

export const runtime = "edge";

export default function AdminPricingPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    description: "",
    price_min: 0,
    price_max: 0,
    currency: "₹",
    delivery_time: "",
    is_popular: 0,
    order_index: 0
  });

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    try {
      const res = await fetch("/api/pricing");
      const data = await res.json() as { plans?: any[] };
      setItems(data.plans || []);
    } catch { setItems([]); }
    finally { setLoading(false); }
  }

  function handleEdit(item: any) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description,
      price_min: item.price_min,
      price_max: item.price_max || 0,
      currency: item.currency || "₹",
      delivery_time: item.delivery_time,
      is_popular: item.is_popular || 0,
      order_index: item.order_index || 0
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/pricing/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setShowForm(false);
        setEditingId(null);
        fetchItems();
      }
    } finally { setSubmitting(false); }
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-ink/50" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-ink font-bold" style={{ fontSize: 32, fontWeight: 540 }}>Pricing Plans</h1>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-canvas border border-hairline rounded-lg p-6 mb-8 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <h2 className="text-ink font-bold text-lg">Edit Plan: {form.name}</h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-ink/50 hover:text-ink"><X className="h-5 w-5" /></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="caption-mono text-ink/60 text-xs mb-1.5 block">Plan Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
            </div>

            <div>
              <label className="caption-mono text-ink/60 text-xs mb-1.5 block">Delivery Time *</label>
              <input value={form.delivery_time} onChange={e => setForm({ ...form, delivery_time: e.target.value })} required className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
            </div>

            <div>
              <label className="caption-mono text-ink/60 text-xs mb-1.5 block">Minimum Price ({form.currency}) *</label>
              <input type="number" value={form.price_min} onChange={e => setForm({ ...form, price_min: parseInt(e.target.value) || 0 })} required className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
            </div>

            <div>
              <label className="caption-mono text-ink/60 text-xs mb-1.5 block">Maximum Price (Optional)</label>
              <input type="number" value={form.price_max} onChange={e => setForm({ ...form, price_max: parseInt(e.target.value) || 0 })} className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
            </div>

            <div>
              <label className="caption-mono text-ink/60 text-xs mb-1.5 block">Currency Symbol *</label>
              <input value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })} required className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
            </div>

            <div>
              <label className="caption-mono text-ink/60 text-xs mb-1.5 block">Display Order Index</label>
              <input type="number" value={form.order_index} onChange={e => setForm({ ...form, order_index: parseInt(e.target.value) || 0 })} className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
            </div>
          </div>

          <div>
            <label className="caption-mono text-ink/60 text-xs mb-1.5 block">Description *</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required className="w-full h-24 bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink resize-none" />
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="is_popular" checked={form.is_popular === 1} onChange={e => setForm({ ...form, is_popular: e.target.checked ? 1 : 0 })} className="h-4 w-4 rounded border-hairline text-ink focus:ring-ink" />
            <label htmlFor="is_popular" className="text-sm text-ink select-none font-medium">Feature this as the &quot;Popular&quot; plan</label>
          </div>

          <div className="flex justify-end pt-4 border-t border-hairline gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary-figma text-sm px-4 py-2">Cancel</button>
            <button type="submit" disabled={submitting} className="btn-primary-figma text-sm px-6 py-2 flex items-center">
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Changes"}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-canvas border border-hairline shadow-sm rounded-lg p-6 relative flex flex-col justify-between hover:border-ink/20 transition-all duration-200">
            <div>
              {item.is_popular === 1 && (
                <span className="absolute top-4 right-4 bg-ink text-canvas caption-mono px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider">POPULAR</span>
              )}
              <h3 className="text-ink font-bold text-xl mb-1">{item.name}</h3>
              <p className="text-ink/60 text-sm mb-4 h-12 overflow-hidden">{item.description}</p>
              
              <div className="mb-4">
                <span className="text-ink text-3xl font-extrabold">{item.currency}{item.price_min}</span>
                {item.price_max > 0 && <span className="text-ink/50 text-sm font-medium"> - {item.currency}{item.price_max}</span>}
              </div>
              
              <p className="caption-mono text-ink/40 text-xs mb-6">Delivery: {item.delivery_time}</p>
            </div>
            
            <button onClick={() => handleEdit(item)} className="w-full btn-secondary-figma text-sm py-2 flex items-center justify-center gap-2">
              <Edit className="h-4 w-4" /> Edit Plan Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
