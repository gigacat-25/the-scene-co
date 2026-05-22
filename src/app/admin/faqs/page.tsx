"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";

export const runtime = "edge";

export default function AdminFaqsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ question: "", answer: "", category: "General" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    try {
      const res = await fetch("/api/faqs?admin=1");
      const data = await res.json() as { faqs?: any[] };
      setItems(data.faqs || []);
    } catch { setItems([]); }
    finally { setLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const endpoint = editingId ? `/api/faqs/${editingId}` : "/api/faqs";
      const res = await fetch(endpoint, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setForm({ question: "", answer: "", category: "General" }); setShowForm(false); setEditingId(null); fetchItems(); }
    } finally { setSubmitting(false); }
  }

  function handleEdit(item: any) {
    setEditingId(item.id);
    setForm({ question: item.question, answer: item.answer, category: item.category });
    setShowForm(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete?")) return;
    await fetch(`/api/faqs/${id}`, { method: "DELETE" });
    fetchItems();
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-ink/50" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-ink font-bold" style={{ fontSize: 32, fontWeight: 540 }}>FAQs</h1>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ question: "", answer: "", category: "General" }); }} className="btn-primary-figma text-sm px-4 py-2 flex items-center">
          <Plus className="h-4 w-4 mr-2" /> {showForm ? "Cancel" : "Add"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-canvas border border-hairline rounded-lg p-6 mb-8 space-y-4 shadow-sm">
          <h2 className="text-ink font-bold text-lg mb-2">{editingId ? "Edit" : "New"} FAQ</h2>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Question *" value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} required className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
            <input placeholder="Category *" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink" />
          </div>
          <textarea placeholder="Answer *" value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} required className="w-full h-32 bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink resize-none" />
          <div className="flex justify-end pt-4">
            <button type="submit" disabled={submitting} className="btn-primary-figma text-sm px-6 py-2 flex items-center">
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="bg-canvas border border-hairline rounded-lg p-5 flex items-start justify-between">
            <div className="pr-4">
              <span className="caption-mono text-ink/40 text-xs mb-1 block">{item.category}</span>
              <p className="text-ink font-medium mb-1">{item.question}</p>
              <p className="text-ink/60 text-sm whitespace-pre-wrap">{item.answer}</p>
            </div>
            <div className="flex gap-2 shrink-0 mt-2">
              <button className="p-2 text-ink/60 hover:text-ink transition-colors rounded hover:bg-ink/10" onClick={() => handleEdit(item)}><Edit className="h-4 w-4" /></button>
              <button className="p-2 text-red-500 hover:text-red-700 transition-colors rounded hover:bg-red-50" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
