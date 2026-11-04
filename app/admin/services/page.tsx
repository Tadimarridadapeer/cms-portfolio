import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getAdminSession } from "@/lib/auth";
import { getServices } from "@/lib/data/storage";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Badge } from "@/components/ui/Badge";

export const revalidate = 0;

export default async function AdminServicesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const services = await getServices();

  return (
    <div className="flex w-full min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title="Services Management"
          subtitle="Manage service scopes, deliverables, and technical offerings."
        />

        <main className="p-6 sm:p-8 space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-6 rounded-xl bg-surface-card border border-border space-y-4 shadow-subtle flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted">Order: #{srv.display_order}</span>
                    <Badge variant={srv.is_published ? "live" : "draft"}>
                      {srv.is_published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{srv.title}</h3>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {srv.summary}
                  </p>

                  <div className="pt-2">
                    <p className="text-[10px] font-mono uppercase text-muted font-semibold mb-1">
                      Deliverables ({srv.deliverables.length})
                    </p>
                    <ul className="space-y-1">
                      {srv.deliverables.slice(0, 3).map((d, i) => (
                        <li key={i} className="text-xs text-muted flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                  <span className="font-mono text-muted">/{srv.slug}</span>
                  <Link
                    href={`/services/${srv.slug}`}
                    target="_blank"
                    className="font-semibold text-accent hover:underline flex items-center gap-1"
                  >
                    <span>View Public Page</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
