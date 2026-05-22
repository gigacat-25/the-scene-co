"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export const runtime = "edge";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetchSettings(); }, []);

  async function fetchSettings() {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json() as { settings?: Record<string, string> };
      setSettings(data.settings || {});
    } catch { setSettings({}); }
    finally { setLoading(false); }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally { setSaving(false); }
  }

  function update(key: string, value: string) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  const sections = [
    { title: "General", fields: [
      { key: "site_name", label: "Site Name" },
      { key: "site_tagline", label: "Tagline" },
    ]},
    { title: "Hero Section", fields: [
      { key: "hero_title", label: "Hero Title" },
      { key: "hero_subtitle", label: "Hero Subtitle" },
      { key: "hero_cta_text", label: "CTA Button Text" },
      { key: "hero_cta_link", label: "CTA Link" },
    ]},
    { title: "Contact Info", fields: [
      { key: "contact_email", label: "Email" },
      { key: "contact_phone", label: "Phone" },
      { key: "contact_address", label: "Address" },
      { key: "whatsapp_number", label: "WhatsApp Number" },
    ]},
    { title: "Social Links", fields: [
      { key: "social_twitter", label: "Twitter" },
      { key: "social_instagram", label: "Instagram" },
      { key: "social_linkedin", label: "LinkedIn" },
      { key: "social_github", label: "GitHub" },
    ]},
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-3xl font-bold text-white">Site Settings</h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : saved ? "✓ Saved!" : "Save All"}
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {sections.map(section => (
          <div key={section.title} className="bg-secondary/20 border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-semibold text-lg mb-4">{section.title}</h3>
            <div className="space-y-4">
              {section.fields.map(field => (
                <div key={field.key}>
                  <label className="text-sm text-muted-foreground mb-1 block">{field.label}</label>
                  <Input
                    value={settings[field.key] || ""}
                    onChange={e => update(field.key, e.target.value)}
                    className="bg-input"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
}
