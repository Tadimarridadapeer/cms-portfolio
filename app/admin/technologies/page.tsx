import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getTechnologies } from "@/lib/data/storage";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Badge } from "@/components/ui/Badge";

export const revalidate = 0;

export default async function AdminTechnologiesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const technologies = await getTechnologies();

  return (
    <div className="flex w-full min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title="Technology Catalogue"
          subtitle="Catalogue of supported frameworks, databases, and architectural stacks."
        />

        <main className="p-6 sm:p-8 space-y-6 flex-1">
          <div className="bg-surface-card border border-border rounded-xl overflow-hidden shadow-subtle">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-muted/50 border-b border-border text-muted font-mono uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Technology</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Order</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {technologies.map((t) => (
                    <tr key={t.id} className="hover:bg-surface-muted/30 transition-colors">
                      <td className="py-3 px-4 font-bold text-foreground">{t.name}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-surface-muted text-muted font-medium">
                          {t.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted max-w-md truncate">{t.description}</td>
                      <td className="py-3 px-4 font-mono text-muted">#{t.display_order}</td>
                      <td className="py-3 px-4 text-right">
                        <Badge size="sm" variant={t.is_published ? "live" : "draft"}>
                          {t.is_published ? "Active" : "Hidden"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
