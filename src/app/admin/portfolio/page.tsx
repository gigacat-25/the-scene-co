"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";

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

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-ink/50" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-ink font-bold" style={{ fontSize: 32, fontWeight: 540 }}>Portfolio</h1>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ title: "", slug: "", category: "", description: "", image_url: "", client_name: "", technologies: "" }); }} className="btn-primary-figma text-sm px-4 py-2 flex items-center">
          <Plus className="h-4 w-4 mr-2" /> {showForm ? "Cancel" : "Add Item"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-canvas border border-hairline rounded-lg p-6 mb-8 space-y-5 shadow-sm">
          <h2 className="text-ink font-bold text-lg mb-2">{editingId ? "Edit" : "New"} Portfolio Item</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
                <input placeholder="Slug *" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
                <input placeholder="Category *" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
                <input placeholder="Client Name" value={form.client_name} onChange={e => setForm({ ...form, client_name: e.target.value })} className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
              </div>
              <input placeholder="Technologies (comma separated)" value={form.technologies} onChange={e => setForm({ ...form, technologies: e.target.value })} className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
              <textarea placeholder="Description *" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required className="w-full h-32 bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink resize-none" />
            </div>
            
            <div className="space-y-2">
              <label className="caption-mono text-ink/60 text-xs">Featured Image</label>
              <ImageUpload value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} />
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-hairline">
            <button type="submit" disabled={submitting} className="btn-primary-figma text-sm px-6 py-2 flex items-center">
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Item"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-canvas border border-hairline rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-soft border-b border-hairline">
            <tr>
              <th className="p-4 text-ink font-semibold">Title</th>
              <th className="p-4 text-ink font-semibold">Category</th>
              <th className="p-4 text-ink font-semibold">Client</th>
              <th className="p-4 text-right text-ink font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-ink/5 transition-colors">
                <td className="p-4 text-ink font-medium flex items-center gap-3">
                  {item.image_url && <img src={item.image_url} className="w-10 h-10 object-cover rounded border border-hairline" alt="" />}
                  {item.title}
                </td>
                <td className="p-4 text-ink/70">{item.category}</td>
                <td className="p-4 text-ink/70">{item.client_name || "—"}</td>
                <td className="p-4 flex gap-2 justify-end">
                  <button className="p-2 text-ink/60 hover:text-ink transition-colors rounded hover:bg-ink/10" onClick={() => handleEdit(item)}><Edit className="h-4 w-4" /></button>
                  <button className="p-2 text-red-500 hover:text-red-700 transition-colors rounded hover:bg-red-50" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
