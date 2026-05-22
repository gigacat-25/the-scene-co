"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";

export const runtime = "edge";

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", category: "", description: "", image_url: "", client_name: "", technologies: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json() as { items?: any[] };
      setItems(data.items || []);
    } catch { setItems([]); }
    finally { setLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const endpoint = editingId ? `/api/portfolio/${editingId}` : "/api/portfolio";
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, technologies: form.technologies.split(",").map(t => t.trim()).filter(Boolean) }),
      });
      if (res.ok) { setForm({ title: "", slug: "", category: "", description: "", image_url: "", client_name: "", technologies: "" }); setShowForm(false); setEditingId(null); fetchItems(); }
    } finally { setSubmitting(false); }
  }

  function handleEdit(item: any) {
    let techs = "";
    try { techs = JSON.parse(item.technologies || "[]").join(", "); } catch {}
    setEditingId(item.id);
    setForm({ title: item.title, slug: item.slug, category: item.category, description: item.description, image_url: item.image_url, client_name: item.client_name, technologies: techs });
    setShowForm(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    fetchItems();
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-3xl font-bold text-white">Portfolio</h1>
        <Button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ title: "", slug: "", category: "", description: "", image_url: "", client_name: "", technologies: "" }); }}>
          <Plus className="h-4 w-4 mr-2" /> {showForm ? "Cancel" : "Add Item"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-secondary/20 border border-white/10 rounded-xl p-6 mb-8 space-y-4">
          <h2 className="text-white font-semibold text-lg">{editingId ? "Edit" : "New"} Portfolio Item</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="bg-input" />
            <Input placeholder="Slug *" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required className="bg-input" />
            <Input placeholder="Category *" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required className="bg-input" />
            <Input placeholder="Client Name" value={form.client_name} onChange={e => setForm({ ...form, client_name: e.target.value })} className="bg-input" />
          </div>
          <Input placeholder="Image URL" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} className="bg-input" />
          <Input placeholder="Technologies (comma separated)" value={form.technologies} onChange={e => setForm({ ...form, technologies: e.target.value })} className="bg-input" />
          <Textarea placeholder="Description *" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required className="bg-input" />
          <Button type="submit" disabled={submitting}>{submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save"}</Button>
        </form>
      )}

      <div className="bg-secondary/20 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 border-b border-white/10">
            <tr><th className="p-4 text-white">Title</th><th className="p-4 text-white">Category</th><th className="p-4 text-white">Client</th><th className="p-4 text-right text-white">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-white/5">
                <td className="p-4 text-white font-medium">{item.title}</td>
                <td className="p-4 text-muted-foreground">{item.category}</td>
                <td className="p-4 text-muted-foreground">{item.client_name || "—"}</td>
                <td className="p-4 flex gap-2 justify-end">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(item)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
