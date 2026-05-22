"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";

export const runtime = "edge";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", cover_image_url: "", author: "The Scene Co.", tags: "", is_published: 0 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json() as { posts?: any[] };
      setPosts(data.posts || []);
    } catch { setPosts([]); }
    finally { setLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const endpoint = editingId ? `/api/blog/${editingId}` : "/api/blog";
      const res = await fetch(endpoint, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) }) });
      if (res.ok) { setForm({ title: "", slug: "", excerpt: "", content: "", cover_image_url: "", author: "The Scene Co.", tags: "", is_published: 0 }); setShowForm(false); setEditingId(null); fetchPosts(); }
    } finally { setSubmitting(false); }
  }

  function handleEdit(post: any) {
    let tags = "";
    try { tags = JSON.parse(post.tags || "[]").join(", "); } catch {}
    setEditingId(post.id);
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, cover_image_url: post.cover_image_url, author: post.author, tags, is_published: post.is_published });
    setShowForm(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    fetchPosts();
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-3xl font-bold text-white">Blog</h1>
        <Button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ title: "", slug: "", excerpt: "", content: "", cover_image_url: "", author: "The Scene Co.", tags: "", is_published: 0 }); }}>
          <Plus className="h-4 w-4 mr-2" /> {showForm ? "Cancel" : "New Post"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-secondary/20 border border-white/10 rounded-xl p-6 mb-8 space-y-4">
          <h2 className="text-white font-semibold text-lg">{editingId ? "Edit" : "New"} Post</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="bg-input" />
            <Input placeholder="Slug *" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required className="bg-input" />
          </div>
          <Input placeholder="Excerpt *" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} required className="bg-input" />
          <Input placeholder="Cover Image URL" value={form.cover_image_url} onChange={e => setForm({ ...form, cover_image_url: e.target.value })} className="bg-input" />
          <Input placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="bg-input" />
          <Textarea placeholder="Content *" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required className="bg-input min-h-[200px]" />
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" checked={form.is_published === 1} onChange={e => setForm({ ...form, is_published: e.target.checked ? 1 : 0 })} />
              Published
            </label>
            <Button type="submit" disabled={submitting}>{submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save"}</Button>
          </div>
        </form>
      )}

      <div className="bg-secondary/20 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 border-b border-white/10">
            <tr><th className="p-4 text-white">Title</th><th className="p-4 text-white">Status</th><th className="p-4 text-right text-white">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-white/5">
                <td className="p-4 text-white font-medium">{post.title}</td>
                <td className="p-4"><span className={post.is_published ? "text-green-400" : "text-yellow-400"}>{post.is_published ? "Published" : "Draft"}</span></td>
                <td className="p-4 flex gap-2 justify-end">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(post)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400" onClick={() => handleDelete(post.id)}><Trash2 className="h-4 w-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
