"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";

export const runtime = "edge";

export default function AdminBlogPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", cover_image_url: "", author: "Team" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    try {
      const res = await fetch("/api/blog?admin=1");
      const data = await res.json() as { posts?: any[] };
      setItems(data.posts || []);
    } catch { setItems([]); }
    finally { setLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const endpoint = editingId ? `/api/blog/${editingId}` : "/api/blog";
      const res = await fetch(endpoint, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setForm({ title: "", slug: "", excerpt: "", content: "", cover_image_url: "", author: "Team" }); setShowForm(false); setEditingId(null); fetchItems(); }
    } finally { setSubmitting(false); }
  }

  function handleEdit(item: any) {
    setEditingId(item.id);
    setForm({ title: item.title, slug: item.slug, excerpt: item.excerpt, content: item.content, cover_image_url: item.cover_image_url, author: item.author });
    setShowForm(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete post?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    fetchItems();
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-ink/50" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-ink font-bold" style={{ fontSize: 32, fontWeight: 540 }}>Blog Posts</h1>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ title: "", slug: "", excerpt: "", content: "", cover_image_url: "", author: "Team" }); }} className="btn-primary-figma text-sm px-4 py-2 flex items-center">
          <Plus className="h-4 w-4 mr-2" /> {showForm ? "Cancel" : "Add Post"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-canvas border border-hairline rounded-lg p-6 mb-8 space-y-5 shadow-sm">
          <h2 className="text-ink font-bold text-lg mb-2">{editingId ? "Edit" : "New"} Post</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <input placeholder="Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Slug *" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
                <input placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
              </div>
              <textarea placeholder="Excerpt *" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} required className="w-full h-20 bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink resize-none" />
              <textarea placeholder="Content (Markdown) *" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required className="w-full h-64 font-mono bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink resize-none" />
            </div>
            
            <div className="space-y-2">
              <label className="caption-mono text-ink/60 text-xs">Cover Image</label>
              <ImageUpload value={form.cover_image_url} onChange={(url) => setForm({ ...form, cover_image_url: url })} />
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-hairline">
            <button type="submit" disabled={submitting} className="btn-primary-figma text-sm px-6 py-2 flex items-center">
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Post"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-canvas border border-hairline rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-soft border-b border-hairline">
            <tr>
              <th className="p-4 text-ink font-semibold">Title</th>
              <th className="p-4 text-ink font-semibold">Author</th>
              <th className="p-4 text-right text-ink font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-ink/5 transition-colors">
                <td className="p-4 text-ink font-medium">{item.title}</td>
                <td className="p-4 text-ink/70">{item.author}</td>
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
