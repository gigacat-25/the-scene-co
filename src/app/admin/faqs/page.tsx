"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";

export const runtime = "edge";

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ question: "", answer: "", category: "general" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchFAQs(); }, []);

  async function fetchFAQs() {
    try {
      const res = await fetch("/api/faqs");
      const data = await res.json() as { faqs?: any[] };
      setFaqs(data.faqs || []);
    } catch { setFaqs([]); }
    finally { setLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/faqs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setForm({ question: "", answer: "", category: "general" }); setShowForm(false); fetchFAQs(); }
    } finally { setSubmitting(false); }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete?")) return;
    await fetch(`/api/faqs/${id}`, { method: "DELETE" });
    fetchFAQs();
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-3xl font-bold text-white">FAQs</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" /> {showForm ? "Cancel" : "Add FAQ"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-secondary/20 border border-white/10 rounded-xl p-6 mb-8 space-y-4">
          <h2 className="text-white font-semibold text-lg">New FAQ</h2>
          <Input placeholder="Question *" value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} required className="bg-input" />
          <Textarea placeholder="Answer *" value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} required className="bg-input" />
          <Input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="bg-input" />
          <Button type="submit" disabled={submitting}>{submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save"}</Button>
        </form>
      )}

      <div className="space-y-4">
        {faqs.map(faq => (
          <div key={faq.id} className="bg-secondary/20 border border-white/10 rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white font-medium">{faq.question}</p>
                <p className="text-muted-foreground text-sm mt-1">{faq.answer}</p>
                <span className="text-xs text-primary mt-2 inline-block">{faq.category}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 shrink-0" onClick={() => handleDelete(faq.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
