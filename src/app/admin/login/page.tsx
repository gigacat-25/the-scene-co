"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export const runtime = "edge";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json() as { error?: string };
        setError(data.error || "Invalid password");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-secondary/20 border border-white/10 rounded-xl">
        <h1 className="font-headline text-2xl font-bold text-white mb-2">Admin Login</h1>
        <p className="text-muted-foreground text-sm mb-6">Enter your admin password to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-input border-border"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full font-bold">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Logging in...</> : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
