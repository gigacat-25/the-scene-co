"use client";

import { useState, useEffect } from "react";
import { Loader2, Edit, Trash2, X, Check, Plus } from "lucide-react";

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
    is_published: 1,
    order_index: 0
  });

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    try {
      const res = await fetch("/api/pricing?admin=1");
      const data = await res.json() as { plans?: any[] };
      setItems(data.plans || []);
    } catch { setItems([]); }
    finally { setLoading(false); }
  }

  function resetForm() {
    setForm({
      name: "",
      description: "",
      price_min: 0,
      price_max: 0,
      currency: "₹",
      delivery_time: "",
      is_popular: 0,
      is_published: 1,
      order_index: items.length
    });
    setEditingId(null);
    setShowForm(false);
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
      is_published: item.is_published ?? 1,
      order_index: item.order_index || 0
    });
    setShowForm(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this pricing plan?")) return;
    try {
      const res = await fetch(`/api/pricing/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchItems();
      }
    } catch (err) {
      alert("Failed to delete plan");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingId ? `/api/pricing/${editingId}` : "/api/pricing";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        resetForm();
        fetchItems();
      }
    } finally { setSubmitting(false); }
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-ink/50" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-ink font-bold" style={{ fontSize: 32, fontWeight: 540 }}>Pricing Plans</h1>
        <button
          onClick={() => { if (showForm) resetForm(); else { resetForm(); setShowForm(true); } }}
          className="btn-primary-figma text-sm px-4 py-2 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" /> {showForm && !editingId ? "Cancel" : "Add Plan"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-canvas border border-hairline rounded-lg p-6 mb-8 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <h2 className="text-ink font-bold text-lg">{editingId ? `Edit Plan: ${form.name}` : "Add New Plan"}</h2>
            <button type="button" onClick={resetForm} className="text-ink/50 hover:text-ink"><X className="h-5 w-5" /></button>
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

            <div>
              <label className="caption-mono text-ink/60 text-xs mb-1.5 block">Visibility</label>
              <select
                value={form.is_published}
                onChange={e => setForm({ ...form, is_published: parseInt(e.target.value) })}
                className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink"
              >
                <option value={1}>Published</option>
                <option value={0}>Hidden / Draft</option>
              </select>
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
            <button type="button" onClick={resetForm} className="btn-secondary-figma text-sm px-4 py-2">Cancel</button>
            <button type="submit" disabled={submitting} className="btn-primary-figma text-sm px-6 py-2 flex items-center">
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : (editingId ? "Save Changes" : "Create Plan")}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className={`bg-canvas border shadow-sm rounded-lg p-6 relative flex flex-col justify-between hover:border-ink/20 transition-all duration-200 ${item.is_published ? "border-hairline" : "border-dashed border-hairline opacity-75"}`}>
            <div>
              {item.is_popular === 1 && (
                <span className="absolute top-4 right-4 bg-ink text-canvas caption-mono px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider">POPULAR</span>
              )}
              {item.is_published === 0 && (
                <span className="absolute top-4 left-4 bg-ink/15 text-ink/65 caption-mono px-2 py-0.5 rounded text-[9px] font-bold">HIDDEN</span>
              )}
              <h3 className="text-ink font-bold text-xl mb-1 mt-4">{item.name}</h3>
              <p className="text-ink/60 text-sm mb-4 h-12 overflow-hidden">{item.description}</p>
              
              <div className="mb-4">
                <span className="text-ink text-3xl font-extrabold">{item.currency}{item.price_min}</span>
                {item.price_max > 0 && <span className="text-ink/50 text-sm font-medium"> - {item.currency}{item.price_max}</span>}
              </div>
              
              <p className="caption-mono text-ink/40 text-xs mb-6">Delivery: {item.delivery_time}</p>
            </div>
            
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="flex-1 btn-secondary-figma text-sm py-2 flex items-center justify-center gap-2">
                <Edit className="h-4 w-4" /> Edit Plan Details
              </button>
              <button onClick={() => handleDelete(item.id)} className="btn-secondary-figma text-sm p-2 flex items-center justify-center hover:text-red-500 hover:border-red-500 transition-colors" title="Delete Plan">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
