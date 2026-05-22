import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { ShieldX } from "lucide-react";

export const runtime = "edge";

export default function ForbiddenPage() {
  return (
    <div className="fixed inset-0 z-[100] bg-canvas flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="flex justify-center mb-6">
          <ShieldX className="h-16 w-16 text-ink/20" />
        </div>
        <h1 className="font-headline text-3xl font-bold text-ink mb-3">Access Denied</h1>
        <p className="text-ink/60 mb-8" style={{ fontSize: 16, lineHeight: 1.6 }}>
          This admin panel is restricted. Your account does not have permission to access this area.
        </p>
        <div className="flex flex-col gap-3 items-center">
          <SignOutButton redirectUrl="/">
            <button className="btn-primary-figma px-8 py-2.5 text-sm">
              Sign Out
            </button>
          </SignOutButton>
          <Link href="/" className="text-ink/50 hover:text-ink text-sm underline underline-offset-2 transition-colors">
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
