import type { Metadata } from "next";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LayoutDashboard, Image, MessageSquare, DollarSign, HelpCircle, Inbox, Settings, Users, Briefcase, Mail } from "lucide-react";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Admin — The Scene Co.",
};

// Only this email is allowed access
const ADMIN_EMAIL = "thescene.co26@gmail.com";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/portfolio", label: "Portfolio", icon: Image },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/pricing", label: "Pricing", icon: DollarSign },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/clients", label: "Clients", icon: Briefcase },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/email-drafter", label: "AI Drafter", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Server-side email whitelist check
  const user = await currentUser();

  if (user) {
    const primaryEmail = user.emailAddresses.find(
      (e: { id: string; emailAddress: string }) => e.id === user.primaryEmailAddressId
    )?.emailAddress;

    if (primaryEmail !== ADMIN_EMAIL) {
      redirect("/admin/forbidden");
    }
  }
  // If no user, middleware already redirected to /admin/login

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

        {/* Footer: View Site + Clerk UserButton */}
        <div className="p-4 border-t border-hairline bg-surface-soft space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors text-sm font-medium">
            ↗ View Site
          </Link>
          <div className="flex items-center gap-3 px-3 py-2.5">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-7 w-7",
                },
              }}
            />
            <div>
              <p className="text-xs font-medium text-ink leading-none">{user?.firstName || "Admin"}</p>
              <p className="text-[10px] caption-mono text-ink/40 mt-0.5">{ADMIN_EMAIL}</p>
            </div>
          </div>
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
