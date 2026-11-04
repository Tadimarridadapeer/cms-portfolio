import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, Eye, Trash2, ArrowUpRight } from "lucide-react";
import { getAdminSession } from "@/lib/auth";
import { getProjects } from "@/lib/data/storage";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const revalidate = 0;

export default async function AdminProjectsListPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const projects = await getProjects(true);

  return (
    <div className="flex w-full min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title="Project Management"
          subtitle="Manage portfolio case studies, concept prototypes, and live platforms."
        />

        <main className="p-6 sm:p-8 space-y-6 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">All Projects ({projects.length})</h2>
              <p className="text-xs text-muted">
                Create, edit case-study sections, and toggle visibility.
              </p>
            </div>

            <Button href="/admin/projects/new" variant="primary" size="sm">
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>Add New Project</span>
            </Button>
          </div>

          <div className="bg-surface-card border border-border rounded-xl overflow-hidden shadow-subtle">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-muted/50 border-b border-border text-muted font-mono uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Title & Slug</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Classification</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Visibility</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-muted">
                        No projects in portfolio yet. Click &quot;Add New Project&quot; above to create one.
                      </td>
                    </tr>
                  ) : (
                    projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-surface-muted/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-foreground text-sm block">
                          {proj.title}
                        </span>
                        <span className="font-mono text-[11px] text-muted">/{proj.slug}</span>
                      </td>
                      <td className="py-3.5 px-4 text-foreground font-medium">
                        {proj.category}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            proj.engagement_type === "Concept Project"
                              ? "concept"
                              : proj.engagement_type === "Internal Product"
                              ? "internal"
                              : "live"
                          }
                        >
                          {proj.engagement_type}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            proj.status === "Live"
                              ? "live"
                              : proj.status === "Draft"
                              ? "draft"
                              : "warning"
                          }
                        >
                          {proj.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-muted">
                        {proj.visibility}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/work/${proj.slug}`}
                            target="_blank"
                            className="p-1.5 rounded hover:bg-surface-muted text-muted hover:text-foreground"
                            title="View on public site"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/projects/${proj.id}`}
                            className="p-1.5 rounded hover:bg-surface-muted text-accent font-semibold"
                            title="Edit project"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
