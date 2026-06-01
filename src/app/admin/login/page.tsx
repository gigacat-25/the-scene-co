import { SignIn } from "@clerk/nextjs";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <div className="fixed inset-0 z-[100] bg-canvas flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="font-headline text-3xl font-bold text-ink mb-1">CMS Login</h1>
          <p className="caption-mono text-ink/50 text-sm">The Scene Co. — Admin Access Only</p>
        </div>
        <SignIn
          routing="hash"
          appearance={{
            variables: {
              colorPrimary: "#111",
              colorBackground: "#ffffff",
              colorInputBackground: "#f7f7f5",
              colorText: "#111",
              fontFamily: "Inter, sans-serif",
              borderRadius: "8px",
            },
            elements: {
              card: "shadow-none border border-hairline",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border border-hairline text-sm font-medium",
              formButtonPrimary: "bg-ink text-canvas hover:bg-ink/90 text-sm font-medium",
              footerActionLink: "text-ink underline",
            },
          }}
        />
      </div>
    </div>
  );
}
