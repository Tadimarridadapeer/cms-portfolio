"use client";

import React, { useState } from "react";
import { SiteSettings } from "@/lib/types";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";
import { Save } from "lucide-react";

export function SettingsForm({ initialSettings }: { initialSettings: SiteSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSaved(false);
    setError(null);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to update settings");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update settings");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface-card border border-border rounded-xl p-6 sm:p-8 space-y-6 max-w-2xl shadow-subtle">
      {saved && <Alert type="success">Site configuration saved successfully!</Alert>}
      {error && <Alert type="error">{error}</Alert>}

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-2">
          General Brand Identity
        </h3>

        <Input
          label="Company Name"
          value={settings.company_name}
          onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
        />

        <Input
          label="Tagline / Positioning"
          value={settings.tagline}
          onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
        />

        <Input
          label="Supporting Message"
          value={settings.supporting_message}
          onChange={(e) => setSettings({ ...settings, supporting_message: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-2">
          Contact Details
        </h3>

        <Input
          label="Business Contact Email"
          type="email"
          value={settings.email}
          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
        />

        <Input
          label="Contact Phone (Optional)"
          value={settings.phone || ""}
          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
        />

        <Input
          label="Physical / Operating Location"
          value={settings.location}
          onChange={(e) => setSettings({ ...settings, location: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-2">
          Social Links (Must be real & verified)
        </h3>

        <Input
          label="GitHub Profile / Org"
          placeholder="https://github.com/..."
          value={settings.github_url || ""}
          onChange={(e) => setSettings({ ...settings, github_url: e.target.value })}
        />

        <Input
          label="LinkedIn Company Page"
          placeholder="https://linkedin.com/company/..."
          value={settings.linkedin_url || ""}
          onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
        />

        <Input
          label="X (Twitter) Profile"
          placeholder="https://x.com/..."
          value={settings.twitter_url || ""}
          onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
        />
      </div>

      <div className="pt-2">
        <Button type="submit" variant="primary" isLoading={isLoading}>
          <Save className="w-3.5 h-3.5 mr-1.5" />
          <span>Save Settings</span>
        </Button>
      </div>
    </form>
  );
}
