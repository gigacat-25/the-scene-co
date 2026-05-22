"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";

export const runtime = "edge";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", logo_url: "", order_index: 0, is_published: 1 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchClients(); }, []);

  async function fetchClients() {
    try {
      const res = await fetch("/api/clients?admin=1");
      const data = await res.json() as { clients?: any[] };
      setClients(data.clients || []);
    } catch { setClients([]); }
    finally { setLoading(false); }
  }

  function resetForm() {
    setForm({ name: "", logo_url: "", order_index: clients.length, is_published: 1 });
    setEditingId(null);
    setShowForm(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await fetch(`/api/clients/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      resetForm();
      fetchClients();
    } finally { setSubmitting(false); }
  }

  function handleEdit(client: any) {
    setEditingId(client.id);
    setForm({
      name: client.name,
      logo_url: client.logo_url || "",
      order_index: client.order_index ?? 0,
      is_published: client.is_published ?? 1,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this client?")) return;
    await fetch(`/api/clients/${id}`, { method: "DELETE" });
    fetchClients();
  }

  async function togglePublish(client: any) {
    await fetch(`/api/clients/${client.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_published: client.is_published ? 0 : 1 }),
    });
    fetchClients();
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-ink/50" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-ink font-bold" style={{ fontSize: 32, fontWeight: 540 }}>Clients & Partners</h1>
        <button
          onClick={() => { setShowForm(!showForm); if (showForm) resetForm(); }}
          className="btn-primary-figma text-sm px-4 py-2 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" /> {showForm ? "Cancel" : "Add Client"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-canvas border border-hairline rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-ink font-bold text-lg mb-5">{editingId ? "Edit" : "New"} Client</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: text fields */}
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-1.5">
                <label className="caption-mono text-ink/50 text-xs">Company/Client Name *</label>
                <input
                  placeholder="e.g. Acme Corp"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="caption-mono text-ink/50 text-xs">Display Order</label>
                  <input
                    type="number"
                    min={0}
                    value={form.order_index}
                    onChange={e => setForm({ ...form, order_index: Number(e.target.value) })}
                    className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="caption-mono text-ink/50 text-xs">Visibility</label>
                  <select
                    value={form.is_published}
                    onChange={e => setForm({ ...form, is_published: Number(e.target.value) })}
                    className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                  >
                    <option value={1}>Published (Show in marquee)</option>
                    <option value={0}>Hidden</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right: logo upload */}
            <div className="space-y-2">
              <label className="caption-mono text-ink/60 text-xs">Client Logo (Optional)</label>
              <ImageUpload value={form.logo_url} onChange={(url) => setForm({ ...form, logo_url: url })} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-5 border-t border-hairline mt-5">
            <button type="button" onClick={resetForm} className="btn-secondary-figma text-sm px-5 py-2">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="btn-primary-figma text-sm px-6 py-2 flex items-center">
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Client"}
            </button>
          </div>
        </form>
      )}

      {/* Clients list */}
      <div className="space-y-4">
        {clients.length === 0 && (
          <div className="bg-canvas border border-hairline rounded-lg p-12 text-center text-ink/40 text-sm">
            No clients added yet. Click <strong>Add Client</strong> to get started.
          </div>
        )}
        {clients.map(client => (
          <div
            key={client.id}
            className={`bg-canvas border rounded-lg p-5 flex items-center gap-5 hover:border-ink/20 transition-colors ${client.is_published ? "border-hairline" : "border-dashed border-hairline opacity-60"}`}
          >
            <GripVertical className="h-4 w-4 text-ink/20 shrink-0" />

            {/* Logo */}
            {client.logo_url ? (
              <img
                src={client.logo_url}
                alt={client.name}
                className="w-12 h-12 object-contain bg-surface-soft border border-hairline rounded p-1 shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded bg-surface-soft border border-hairline shrink-0 flex items-center justify-center text-ink/30 text-base font-bold">
                {client.name.charAt(0)}
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-ink font-semibold text-sm">{client.name}</p>
                {!client.is_published && (
                  <span className="caption-mono text-[9px] bg-ink/10 text-ink/50 px-1.5 py-0.5 rounded">HIDDEN</span>
                )}
              </div>
              <p className="caption-mono text-ink/40 text-[9px] mt-0.5">Order: {client.order_index}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => togglePublish(client)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  client.is_published
                    ? "border-hairline text-ink/50 hover:text-ink hover:border-ink/30"
                    : "border-ink/20 text-ink bg-surface-soft hover:bg-ink/5"
                }`}
              >
                {client.is_published ? "Hide" : "Show"}
              </button>
              <button
                className="p-2 text-ink/60 hover:text-ink transition-colors rounded hover:bg-ink/10"
                onClick={() => handleEdit(client)}
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                className="p-2 text-red-500 hover:text-red-700 transition-colors rounded hover:bg-red-50"
                onClick={() => handleDelete(client.id)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
