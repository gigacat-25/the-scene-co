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
        setErrorMsg("SYS_ERR: SUBMISSION_RATE_LIMIT_EXCEEDED.");
        return;
      }
      if (!res.ok) {
        const data = await res.json() as { error?: string };
        setStatus("error");
        setErrorMsg(data.error || "SYS_ERR: TRANSMISSION_FAILED.");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "", service_interest: "", budget_range: "" });
    } catch {
      setStatus("error");
      setErrorMsg("SYS_ERR: COMMS_TIMEOUT.");
    }
  }

  const inputClass = "w-full bg-[#050505] border border-[#7B6A60]/30 px-4 py-3 font-mono text-xs text-[#F5F2EE] placeholder-[#7B6A60]/50 focus:outline-none focus:border-[#D86B2A] focus:ring-1 focus:ring-[#D86B2A] caret-[#D86B2A] uppercase transition-all duration-200";
  const selectClass = `${inputClass} cursor-pointer appearance-none`;

  if (status === "success") {
    return (
      <div className="bg-[#050505] border border-[#D86B2A] p-8 text-center relative flex flex-col items-center justify-center gap-4">
        {/* Corner brackets */}
        <span className="absolute -top-[1px] -left-[1px] w-[5px] h-[5px] bg-[#D86B2A]" />
        <span className="absolute -top-[1px] -right-[1px] w-[5px] h-[5px] bg-[#D86B2A]" />
        <span className="absolute -bottom-[1px] -left-[1px] w-[5px] h-[5px] bg-[#D86B2A]" />
        <span className="absolute -bottom-[1px] -right-[1px] w-[5px] h-[5px] bg-[#D86B2A]" />

        <div className="w-12 h-12 border border-[#D86B2A] flex items-center justify-center text-[#D86B2A] mb-2 bg-[#D86B2A]/10">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="font-mono text-sm tracking-widest text-[#FFB36B] font-bold uppercase">
          TRANSMISSION COMPLETE
        </h3>
        <p className="font-mono text-xs text-[#7B6A60] uppercase leading-relaxed max-w-sm">
          YOUR COMMS SIGNAL HAS BEEN SENT INTO THE RACK. ESTIMATES WILL COMPILE IN 24H.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 border border-[#7B6A60]/40 text-[#7B6A60] hover:text-[#D86B2A] hover:border-[#D86B2A] font-mono text-[10px] tracking-widest px-6 py-2.5 uppercase transition-colors"
        >
          [NEW_TRANSMISSION]
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#050505] border border-[#7B6A60]/20 p-6 space-y-5 relative">
      {/* Corner crosshairs */}
      <span className="absolute -top-[1px] -left-[1px] w-[4px] h-[4px] bg-[#7B6A60]/40" />
      <span className="absolute -top-[1px] -right-[1px] w-[4px] h-[4px] bg-[#7B6A60]/40" />
      <span className="absolute -bottom-[1px] -left-[1px] w-[4px] h-[4px] bg-[#7B6A60]/40" />
      <span className="absolute -bottom-[1px] -right-[1px] w-[4px] h-[4px] bg-[#7B6A60]/40" />

      <div className="flex items-center justify-between border-b border-[#7B6A60]/10 pb-3 mb-4 font-mono text-[9px] text-[#7B6A60] uppercase">
        <span>CONSOLE // LEAD_INGEST</span>
        <span className="text-[#D86B2A] font-bold">MODE // WRITE</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <input
            placeholder="NAME // *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className={inputClass}
          />
        </div>
        <div className="relative">
          <input
            placeholder="EMAIL // *"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="relative">
        <input
          placeholder="PHONE // OPTIONAL"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="relative">
        <select
          value={form.service_interest}
          onChange={(e) => setForm({ ...form, service_interest: e.target.value })}
          className={selectClass}
          required
        >
          <option value="" disabled className="bg-[#050505]">SELECT SERVICE INTEREST</option>
          <option value="website" className="bg-[#050505]">CUSTOM EXPERIENCE WEBSITES</option>
          <option value="ecommerce" className="bg-[#050505]">E-COMMERCE ENGAGEMENT DECK</option>
          <option value="pos" className="bg-[#050505]">TRANSACTION POS RACKS</option>
          <option value="saas" className="bg-[#050505]">SAAS PRODUCT SCHEMATICS</option>
          <option value="other" className="bg-[#050505]">OTHER MEDIA CHANNELS</option>
        </select>
        {/* Custom select down arrow inside terminal */}
        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#7B6A60] pointer-events-none">[V]</span>
      </div>

      <div className="relative">
        <select
          value={form.budget_range}
          onChange={(e) => setForm({ ...form, budget_range: e.target.value })}
          className={selectClass}
          required
        >
          <option value="" disabled className="bg-[#050505]">BUDGET LIMITS</option>
          <option value="15k-25k" className="bg-[#050505]">₹15,000 – ₹25,000</option>
          <option value="25k-50k" className="bg-[#050505]">₹25,000 – ₹50,000</option>
          <option value="50k-1l" className="bg-[#050505]">₹50,000 – ₹1,00,000</option>
          <option value="1l-2.5l" className="bg-[#050505]">₹1,00,000 – ₹2,50,000</option>
          <option value="2.5l+" className="bg-[#050505]">₹2,50,000+</option>
        </select>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#7B6A60] pointer-events-none">[V]</span>
      </div>

      <div className="relative">
        <textarea
          placeholder="TELL US ABOUT YOUR PROJECT SCHEMATICS // *"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          rows={4}
          className={`${inputClass} min-h-[120px] resize-none`}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#D86B2A] bg-[#D86B2A]/5 border border-[#D86B2A]/20 p-3">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full relative border border-[#D86B2A] bg-transparent text-[#D86B2A] hover:bg-[#D86B2A] hover:text-[#050505] font-mono text-xs tracking-[0.2em] py-3.5 uppercase font-bold transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {/* Corner ticks */}
        <span className="absolute -top-[2px] -left-[2px] w-[4px] h-[4px] bg-[#D86B2A]" />
        <span className="absolute -top-[2px] -right-[2px] w-[4px] h-[4px] bg-[#D86B2A]" />
        <span className="absolute -bottom-[2px] -left-[2px] w-[4px] h-[4px] bg-[#D86B2A]" />
        <span className="absolute -bottom-[2px] -right-[2px] w-[4px] h-[4px] bg-[#D86B2A]" />
        
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            TRANSMITTING...
          </>
        ) : (
          "TRANSMIT"
        )}
      </button>
    </form>
  );
}
