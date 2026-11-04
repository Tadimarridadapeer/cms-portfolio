import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function AdminNewProjectPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex w-full min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title="Create New Project"
          subtitle="Add a case study or concept prototype to the Cross Motive portfolio."
        />

        <main className="p-6 sm:p-8 flex-1">
          <ProjectForm isEdit={false} />
        </main>
      </div>
    </div>
  );
}
