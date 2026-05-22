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
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary/30 border-r border-white/10 flex flex-col fixed h-full">
        <div className="p-6 border-b border-white/10">
          <h1 className="font-headline text-xl font-bold text-white">CMS</h1>
          <p className="text-muted-foreground text-sm">The Scene Co.</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors text-sm"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors text-sm">
            View Site
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-sm">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
