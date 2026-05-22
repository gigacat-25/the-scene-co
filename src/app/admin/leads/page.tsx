"use client";

import { useState, useEffect } from "react";
import { Loader2, Mail, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    await fetch(`/api/leads/${id}`, { method: "PATCH" });
    fetchLeads();
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  return (
    <div>
      <h1 className="font-headline text-3xl font-bold text-white mb-8">Leads</h1>

      {leads.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No leads yet.</p>
      ) : (
        <div className="space-y-4">
          {leads.map(lead => (
            <div key={lead.id} className={`bg-secondary/20 border rounded-xl p-6 ${lead.is_read === 0 ? "border-primary/50" : "border-white/10"}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white font-semibold">{lead.name}</h3>
                    {lead.is_read === 0 && <Badge variant="default" className="text-xs">New</Badge>}
                    {lead.service_interest && <Badge variant="outline" className="text-xs">{lead.service_interest}</Badge>}
                    {lead.budget_range && <Badge variant="outline" className="text-xs">{lead.budget_range}</Badge>}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-white transition-colors">
                      <Mail className="h-3.5 w-3.5" /> {lead.email}
                    </a>
                    {lead.phone && <span>{lead.phone}</span>}
                    <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{lead.message}</p>
                </div>
                {lead.is_read === 0 && (
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => markRead(lead.id)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
