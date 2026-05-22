"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", service_interest: "", budget_range: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 429) {
        setStatus("error");
        setErrorMsg("Too many submissions. Please try again later.");
        return;
      }

      if (!res.ok) {
        const data = await res.json() as { error?: string };
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "", service_interest: "", budget_range: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-secondary/20 border border-white/10 rounded-xl p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-white font-semibold text-xl mb-2">Message Sent!</h3>
        <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
        <Button variant="outline" className="mt-4" onClick={() => setStatus("idle")}>Send Another</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-secondary/20 border border-white/10 rounded-xl p-6 space-y-4">
      <h3 className="text-white font-semibold text-lg">Send Us a Message</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          placeholder="Your Name *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="bg-input border-border"
        />
        <Input
          placeholder="Email *"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="bg-input border-border"
        />
      </div>

      <Input
        placeholder="Phone (optional)"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="bg-input border-border"
      />

      <select
        value={form.service_interest}
        onChange={(e) => setForm({ ...form, service_interest: e.target.value })}
        className="w-full bg-input border-border rounded-md px-3 py-2 text-muted-foreground"
      >
        <option value="">Service Interested In</option>
        <option value="website">Custom Website</option>
        <option value="ecommerce">E-Commerce Store</option>
        <option value="pos">POS System</option>
        <option value="saas">SaaS Product</option>
        <option value="other">Other</option>
      </select>

      <select
        value={form.budget_range}
        onChange={(e) => setForm({ ...form, budget_range: e.target.value })}
        className="w-full bg-input border-border rounded-md px-3 py-2 text-muted-foreground"
      >
        <option value="">Budget Range</option>
        <option value="15k-25k">₹15,000 – ₹25,000</option>
        <option value="25k-50k">₹25,000 – ₹50,000</option>
        <option value="50k-1l">₹50,000 – ₹1,00,000</option>
        <option value="1l-2.5l">₹1,00,000 – ₹2,50,000</option>
        <option value="2.5l+">₹2,50,000+</option>
      </select>

      <Textarea
        placeholder="Tell us about your project *"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
        className="bg-input border-border min-h-[120px]"
      />

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="h-4 w-4" />
          {errorMsg}
        </div>
      )}

      <Button type="submit" disabled={status === "loading"} className="w-full font-bold">
        {status === "loading" ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
