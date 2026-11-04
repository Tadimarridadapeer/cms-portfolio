import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getSiteSettings } from "@/lib/data/storage";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const settings = await getSiteSettings();

  return (
    <div className="flex w-full min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title="Site Settings & Brand"
          subtitle="Configure business details, communication emails, and company metadata."
        />

        <main className="p-6 sm:p-8 flex-1">
          <SettingsForm initialSettings={settings} />
        </main>
      </div>
    </div>
  );
}
