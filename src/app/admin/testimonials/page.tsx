"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";

export const runtime = "edge";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", role: "", company: "", quote: "", avatar_url: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json() as { testimonials?: any[] };
      setItems(data.testimonials || []);
    } catch { setItems([]); }
    finally { setLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const endpoint = editingId ? `/api/testimonials/${editingId}` : "/api/testimonials";
      const res = await fetch(endpoint, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setForm({ name: "", role: "", company: "", quote: "", avatar_url: "", rating: 5 }); setShowForm(false); setEditingId(null); fetchItems(); }
    } finally { setSubmitting(false); }
  }

  function handleEdit(item: any) {
    setEditingId(item.id);
    setForm({ name: item.name, role: item.role, company: item.company, quote: item.quote, avatar_url: item.avatar_url, rating: item.rating });
    setShowForm(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    fetchItems();
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-ink/50" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-ink font-bold" style={{ fontSize: 32, fontWeight: 540 }}>Testimonials</h1>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ name: "", role: "", company: "", quote: "", avatar_url: "", rating: 5 }); }} className="btn-primary-figma text-sm px-4 py-2 flex items-center">
          <Plus className="h-4 w-4 mr-2" /> {showForm ? "Cancel" : "Add"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-canvas border border-hairline rounded-lg p-6 mb-8 space-y-5 shadow-sm">
          <h2 className="text-ink font-bold text-lg mb-2">{editingId ? "Edit" : "New"} Testimonial</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
                <input placeholder="Role *" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
                <input placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
              </div>
              <textarea placeholder="Quote *" value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} required className="w-full h-32 bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink resize-none" />
            </div>
            
            <div className="space-y-2">
              <label className="caption-mono text-ink/60 text-xs">Avatar Image</label>
              <ImageUpload value={form.avatar_url} onChange={(url) => setForm({ ...form, avatar_url: url })} />
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-hairline">
            <button type="submit" disabled={submitting} className="btn-primary-figma text-sm px-6 py-2 flex items-center">
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Testimonial"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="bg-canvas border border-hairline shadow-sm rounded-lg p-6 flex items-start justify-between hover:border-ink/20 transition-colors">
            <div className="flex gap-4 items-start">
              {item.avatar_url && <img src={item.avatar_url} className="w-12 h-12 object-cover rounded-full border border-hairline" alt="" />}
              <div>
                <p className="text-ink font-medium" style={{ fontSize: 16 }}>&ldquo;{item.quote}&rdquo;</p>
                <p className="text-ink/60 text-sm mt-2">— {item.name}, {item.role}{item.company ? ` at ${item.company}` : ""}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="p-2 text-ink/60 hover:text-ink transition-colors rounded hover:bg-ink/10" onClick={() => handleEdit(item)}><Edit className="h-4 w-4" /></button>
              <button className="p-2 text-red-500 hover:text-red-700 transition-colors rounded hover:bg-red-50" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
