"use client";

import { useState, useEffect } from "react";
import { Loader2, Inbox, CheckCircle2 } from "lucide-react";

export const runtime = "edge";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchLeads(); }, []);

  async function fetchLeads() {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json() as { leads?: any[] };
      setLeads(data.leads || []);
    } catch { setLeads([]); }
    finally { setLoading(false); }
  }

  async function markRead(id: number) {
    await fetch(`/api/leads/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_read: 1 }) });
    fetchLeads();
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-ink/50" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-ink font-bold" style={{ fontSize: 32, fontWeight: 540 }}>Inbox & Leads</h1>
      </div>

      {leads.length === 0 ? (
        <div className="text-center py-20 bg-canvas border border-hairline rounded-lg">
          <Inbox className="h-10 w-10 text-ink/20 mx-auto mb-4" />
          <p className="text-ink/50">No leads found yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map(lead => (
            <div key={lead.id} className={`bg-canvas border ${lead.is_read ? 'border-hairline' : 'border-ink shadow-sm'} rounded-lg p-6 flex flex-col md:flex-row gap-6 transition-colors`}>
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-ink font-bold text-lg">{lead.name}</h3>
                    <div className="flex gap-4 text-sm mt-1">
                      <a href={`mailto:${lead.email}`} className="text-ink/60 hover:text-ink">{lead.email}</a>
                      <a href={`tel:${lead.phone}`} className="text-ink/60 hover:text-ink">{lead.phone}</a>
                    </div>
                  </div>
                  <span className="caption-mono text-ink/40 text-xs">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <span className="bg-surface-soft border border-hairline text-ink/80 text-xs px-2 py-1 rounded">
                    Service: {lead.service_interest}
                  </span>
                  <span className="bg-surface-soft border border-hairline text-ink/80 text-xs px-2 py-1 rounded">
                    Budget: {lead.budget_range}
                  </span>
                </div>
                
                <div className="bg-surface-soft p-4 rounded-md text-ink/80 text-sm whitespace-pre-wrap">
                  {lead.message}
                </div>
              </div>
              
              {!lead.is_read && (
                <div className="flex items-start shrink-0">
                  <button onClick={() => markRead(lead.id)} className="btn-secondary-figma text-sm px-3 py-1.5 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Mark Read
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
