import React from "react";
import { redirect, notFound } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getProjectById } from "@/lib/data/storage";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { ProjectForm } from "@/components/admin/ProjectForm";

interface EditProjectPageProps {
  params: { id: string };
}

export default async function AdminEditProjectPage({ params }: EditProjectPageProps) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const project = await getProjectById(params.id);
  if (!project) notFound();

  return (
    <div className="flex w-full min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title={`Edit: ${project.title}`}
          subtitle={`Slug: /work/${project.slug}`}
        />

        <main className="p-6 sm:p-8 flex-1">
          <ProjectForm initialData={project} isEdit={true} />
        </main>
      </div>
    </div>
  );
}
