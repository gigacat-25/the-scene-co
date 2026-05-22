"use client";

import { useState, useEffect } from "react";
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

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-ink/50" /></div>;

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
    { title: "AI Configuration (Groq)", fields: [
      { key: "groq_api_key", label: "Groq API Key" },
    ]},
    { title: "Google OAuth2 Email Configuration", fields: [
      { key: "google_client_id", label: "Google Client ID" },
      { key: "google_client_secret", label: "Google Client Secret" },
      { key: "google_refresh_token", label: "Google Refresh Token" },
      { key: "admin_email", label: "Admin Notification Email" },
    ]},
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-ink font-bold" style={{ fontSize: 32, fontWeight: 540 }}>Site Settings</h1>
        <button onClick={handleSave} disabled={saving} className="btn-primary-figma text-sm px-6 py-2 flex items-center">
          {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : saved ? "✓ Saved!" : "Save All Settings"}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {sections.map(section => (
          <div key={section.title} className="bg-canvas border border-hairline shadow-sm rounded-lg p-6">
            <h3 className="text-ink font-semibold text-lg mb-5">{section.title}</h3>
            <div className="space-y-4">
              {section.fields.map(field => (
                <div key={field.key}>
                  <label className="caption-mono text-ink/60 text-xs mb-1.5 block uppercase">{field.label}</label>
                  <input
                    value={settings[field.key] || ""}
                    onChange={e => update(field.key, e.target.value)}
                    className="w-full bg-surface-soft border border-hairline rounded-md px-3 py-2 text-sm text-ink outline-none focus:border-ink transition-colors"
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
