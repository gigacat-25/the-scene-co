import { getLeads, getPublishedPortfolio, getPublishedBlogPosts } from "@/lib/db";
import Link from "next/link";
import { Image, FileText, Inbox, TrendingUp } from "lucide-react";

export const runtime = "edge";

export default async function AdminDashboardPage() {
  const leads = await getLeads();
  const portfolio = await getPublishedPortfolio();
  const blogPosts = await getPublishedBlogPosts();
  const unreadLeads = leads.filter((l) => l.is_read === 0).length;

  const stats = [
    { label: "Portfolio Items", value: portfolio.length, icon: Image, color: "text-blue-400" },
    { label: "Blog Posts", value: blogPosts.length, icon: FileText, color: "text-green-400" },
    { label: "Total Leads", value: leads.length, icon: Inbox, color: "text-yellow-400" },
    { label: "Unread Leads", value: unreadLeads, icon: TrendingUp, color: "text-red-400" },
  ];

  return (
    <div>
      <h1 className="font-headline text-3xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-secondary/20 border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {unreadLeads > 0 && (
        <div className="bg-secondary/20 border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">You have {unreadLeads} unread lead{unreadLeads > 1 ? "s" : ""}</h3>
              <p className="text-muted-foreground text-sm">Check your leads inbox to respond.</p>
            </div>
            <Link href="/admin/leads" className="text-primary hover:underline text-sm font-medium">
              View Leads →
            </Link>
          </div>
        </div>
      )}

      <div className="bg-secondary/20 border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Link href="/admin/portfolio" className="text-muted-foreground hover:text-white text-sm transition-colors">+ Add Portfolio Item</Link>
          <Link href="/admin/blog" className="text-muted-foreground hover:text-white text-sm transition-colors">+ Write Blog Post</Link>
          <Link href="/admin/testimonials" className="text-muted-foreground hover:text-white text-sm transition-colors">+ Add Testimonial</Link>
          <Link href="/admin/faqs" className="text-muted-foreground hover:text-white text-sm transition-colors">+ Add FAQ</Link>
          <Link href="/admin/settings" className="text-muted-foreground hover:text-white text-sm transition-colors">Edit Site Settings</Link>
          <Link href="/admin/pricing" className="text-muted-foreground hover:text-white text-sm transition-colors">Edit Pricing</Link>
        </div>
      </div>
    </div>
  );
}
