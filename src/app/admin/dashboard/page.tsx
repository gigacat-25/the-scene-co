import { getLeads, getPublishedPortfolio, getPublishedClients } from "@/lib/db";
import Link from "next/link";
import { Image, Inbox, TrendingUp, Briefcase } from "lucide-react";

export const runtime = "edge";

export default async function AdminDashboardPage() {
  const leads = await getLeads();
  const portfolio = await getPublishedPortfolio();
  const clients = await getPublishedClients();
  const unreadLeads = leads.filter((l) => l.is_read === 0).length;

  const stats = [
    { label: "Portfolio Items", value: portfolio.length, icon: Image, color: "text-ink" },
    { label: "Clients & Partners", value: clients.length, icon: Briefcase, color: "text-ink" },
    { label: "Total Leads", value: leads.length, icon: Inbox, color: "text-ink" },
    { label: "Unread Leads", value: unreadLeads, icon: TrendingUp, color: "text-red-500" },
  ];

  return (
    <div>
      <h1 className="text-ink font-bold mb-8" style={{ fontSize: 32, fontWeight: 540 }}>Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-canvas border border-hairline shadow-sm rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-surface-soft rounded-md">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-ink">{stat.value}</p>
              <p className="caption-mono text-ink/50 text-xs mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {unreadLeads > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-red-900 font-semibold" style={{ fontSize: 18 }}>You have {unreadLeads} unread lead{unreadLeads > 1 ? "s" : ""}</h3>
              <p className="text-red-700/80 text-sm mt-1">Check your leads inbox to respond.</p>
            </div>
            <Link href="/admin/leads" className="btn-primary-figma text-sm bg-red-600 hover:bg-red-700">
              View Leads →
            </Link>
          </div>
        </div>
      )}

      <div className="bg-canvas border border-hairline shadow-sm rounded-lg p-6">
        <h3 className="text-ink font-semibold mb-5" style={{ fontSize: 18 }}>Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Link href="/admin/portfolio" className="p-4 rounded-lg bg-surface-soft border border-transparent hover:border-hairline text-ink/70 hover:text-ink text-sm transition-colors text-center font-medium">+ Add Portfolio Item</Link>
          <Link href="/admin/clients" className="p-4 rounded-lg bg-surface-soft border border-transparent hover:border-hairline text-ink/70 hover:text-ink text-sm transition-colors text-center font-medium">+ Add Client</Link>
          <Link href="/admin/testimonials" className="p-4 rounded-lg bg-surface-soft border border-transparent hover:border-hairline text-ink/70 hover:text-ink text-sm transition-colors text-center font-medium">+ Add Testimonial</Link>
          <Link href="/admin/faqs" className="p-4 rounded-lg bg-surface-soft border border-transparent hover:border-hairline text-ink/70 hover:text-ink text-sm transition-colors text-center font-medium">+ Add FAQ</Link>
          <Link href="/admin/settings" className="p-4 rounded-lg bg-surface-soft border border-transparent hover:border-hairline text-ink/70 hover:text-ink text-sm transition-colors text-center font-medium">Edit Site Settings</Link>
        </div>
      </div>
    </div>
  );
}
