"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";

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
    if (!confirm("Delete?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    fetchItems();
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-3xl font-bold text-white">Testimonials</h1>
        <Button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ name: "", role: "", company: "", quote: "", avatar_url: "", rating: 5 }); }}>
          <Plus className="h-4 w-4 mr-2" /> {showForm ? "Cancel" : "Add"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-secondary/20 border border-white/10 rounded-xl p-6 mb-8 space-y-4">
          <h2 className="text-white font-semibold text-lg">{editingId ? "Edit" : "New"} Testimonial</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="bg-input" />
            <Input placeholder="Role *" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required className="bg-input" />
            <Input placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="bg-input" />
            <Input placeholder="Avatar URL" value={form.avatar_url} onChange={e => setForm({ ...form, avatar_url: e.target.value })} className="bg-input" />
          </div>
          <Textarea placeholder="Quote *" value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} required className="bg-input" />
          <Button type="submit" disabled={submitting}>{submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save"}</Button>
        </form>
      )}

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="bg-secondary/20 border border-white/10 rounded-xl p-6 flex items-start justify-between">
            <div>
              <p className="text-white font-medium">&ldquo;{item.quote}&rdquo;</p>
              <p className="text-muted-foreground text-sm mt-2">— {item.name}, {item.role}{item.company ? ` at ${item.company}` : ""}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(item)}><Edit className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
