"use client";

import { useState } from "react";
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

  const inputClass = "w-full bg-canvas border border-hairline rounded-md px-4 py-3 body-sm-figma text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-ink/20 transition-all duration-150";
  const selectClass = `${inputClass} cursor-pointer`;

  if (status === "success") {
    return (
      <div className="bg-canvas border border-hairline rounded-lg p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-surface-soft flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-6 w-6 text-ink" />
        </div>
        <h3 className="text-ink font-bold text-xl mb-2" style={{ fontWeight: 540 }}>Message Sent!</h3>
        <p className="body-sm-figma text-ink/70 mb-6">We&apos;ll get back to you within 24 hours.</p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-secondary-figma text-sm"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-canvas border border-hairline rounded-lg p-6 space-y-4">
      <h3 className="text-ink mb-2" style={{ fontSize: 20, fontWeight: 540, lineHeight: 1.35 }}>
        Send us a message
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          placeholder="Your Name *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className={inputClass}
        />
        <input
          placeholder="Email *"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className={inputClass}
        />
      </div>

      <input
        placeholder="Phone (optional)"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className={inputClass}
      />

      <select
        value={form.service_interest}
        onChange={(e) => setForm({ ...form, service_interest: e.target.value })}
        className={selectClass}
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
        className={selectClass}
      >
        <option value="">Budget Range</option>
        <option value="15k-25k">₹15,000 – ₹25,000</option>
        <option value="25k-50k">₹25,000 – ₹50,000</option>
        <option value="50k-1l">₹50,000 – ₹1,00,000</option>
        <option value="1l-2.5l">₹1,00,000 – ₹2,50,000</option>
        <option value="2.5l+">₹2,50,000+</option>
      </select>

      <textarea
        placeholder="Tell us about your project *"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
        rows={4}
        className={`${inputClass} min-h-[120px] resize-none`}
      />

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm" style={{ color: "#cc0000" }}>
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full btn-primary-figma flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
