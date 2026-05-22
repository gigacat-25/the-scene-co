"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Edit } from "lucide-react";

export const runtime = "edge";

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", price_min: 0, price_max: 0, description: "", delivery_time: "", is_popular: 0 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchPlans(); }, []);

  async function fetchPlans() {
    try {
      const res = await fetch("/api/pricing");
      const data = await res.json() as { plans?: any[] };
      setPlans(data.plans || []);
    } catch { setPlans([]); }
    finally { setLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/pricing/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setEditingId(null); fetchPlans(); }
    } finally { setSubmitting(false); }
  }

  function handleEdit(plan: any) {
    setEditingId(plan.id);
    setForm({ name: plan.name, price_min: plan.price_min, price_max: plan.price_max, description: plan.description, delivery_time: plan.delivery_time, is_popular: plan.is_popular });
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div>
      <h1 className="font-headline text-3xl font-bold text-white mb-8">Pricing Plans</h1>
      <p className="text-muted-foreground mb-8">Edit plan details. To add/remove features, use the database directly.</p>

      <div className="space-y-6">
        {plans.map(plan => (
          <div key={plan.id} className="bg-secondary/20 border border-white/10 rounded-xl p-6">
            {editingId === plan.id ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="bg-input" />
                  <Input placeholder="Delivery Time" value={form.delivery_time} onChange={e => setForm({ ...form, delivery_time: e.target.value })} className="bg-input" />
                  <Input type="number" placeholder="Min Price" value={form.price_min} onChange={e => setForm({ ...form, price_min: parseInt(e.target.value) || 0 })} className="bg-input" />
                  <Input type="number" placeholder="Max Price" value={form.price_max} onChange={e => setForm({ ...form, price_max: parseInt(e.target.value) || 0 })} className="bg-input" />
                </div>
                <Textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-input" />
                <div className="flex gap-2">
                  <Button type="submit" disabled={submitting}>{submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save"}</Button>
                  <Button variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                </div>
              </form>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-semibold text-lg">{plan.name} {plan.is_popular === 1 && <span className="text-primary text-sm">(Popular)</span>}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                  <p className="text-white font-bold mt-2">₹{(plan.price_min / 1000).toFixed(0)}K – ₹{(plan.price_max / 1000).toFixed(0)}K · {plan.delivery_time}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => handleEdit(plan)}><Edit className="h-4 w-4" /></Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
