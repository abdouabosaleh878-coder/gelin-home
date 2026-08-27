import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";
import { SettingsForm } from "./settings-form";

export const metadata: Metadata = { title: "Settings" };

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-3xl text-navy-900">Website Settings</h1>
        <p className="mt-1 text-sm text-ink-500">Update your brand, contact info, and delivery settings.</p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
