import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, Image, MessageSquare, DollarSign, FileText, HelpCircle, Inbox, Settings, LogOut } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Admin — The Scene Co.",
};

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/portfolio", label: "Portfolio", icon: Image },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/pricing", label: "Pricing", icon: DollarSign },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] bg-canvas flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-soft border-r border-hairline flex flex-col h-full shrink-0">
        <div className="p-6 border-b border-hairline">
          <h1 className="font-headline text-xl font-bold text-ink">CMS</h1>
          <p className="caption-mono text-ink/50 text-xs">The Scene Co.</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors text-sm font-medium"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-hairline bg-surface-soft">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors text-sm font-medium">
            View Site
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors text-sm font-medium mt-1">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto bg-canvas">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
