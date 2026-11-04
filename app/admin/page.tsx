import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FolderGit2,
  Inbox,
  Wrench,
  Cpu,
  ArrowUpRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Database,
} from "lucide-react";
import { getAdminSession } from "@/lib/auth";
import { getProjects, getEnquiries, getServices, getTechnologies } from "@/lib/data/storage";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const revalidate = 0; // Always fresh in admin

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [projects, enquiries, services, technologies] = await Promise.all([
    getProjects(true),
    getEnquiries(),
    getServices(),
    getTechnologies(),
  ]);

  const newEnquiriesCount = enquiries.filter((e) => e.status === "New").length;
  const liveProjectsCount = projects.filter((p) => p.status === "Live").length;
  const inProgressProjectsCount = projects.filter((p) => p.status === "In Progress").length;

  return (
    <div className="flex w-full min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title="Dashboard Overview"
          subtitle={`Signed in as ${session.email}`}
        />

        <main className="p-6 sm:p-8 space-y-8 flex-1">
          {/* Top System Status Banner */}
          <div className="p-4 rounded-xl bg-surface-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-surface-muted flex items-center justify-center text-accent">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-xs text-foreground block">
                  Data Persistence Engine:{" "}
                  <strong className={isSupabaseConfigured ? "text-emerald-500" : "text-accent"}>
                    {isSupabaseConfigured ? "Supabase Cloud Database" : "Local File Store (Production Ready Fallback)"}
                  </strong>
                </span>
                <p className="text-[11px] text-muted">
                  {isSupabaseConfigured
                    ? "Connected to remote PostgreSQL instance via Supabase client."
                    : "Active in dev/local mode. All CRUD operations and enquiry submissions persist immediately to data/store.json."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button href="/admin/projects/new" size="sm" variant="primary">
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>New Project</span>
              </Button>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-surface-card border border-border space-y-2">
              <div className="flex items-center justify-between text-muted">
                <span className="text-xs font-mono uppercase font-semibold">Total Projects</span>
                <FolderGit2 className="w-4 h-4 text-accent" />
              </div>
              <p className="text-3xl font-extrabold text-foreground">{projects.length}</p>
              <p className="text-[11px] text-muted font-mono">
                {liveProjectsCount} Live · {inProgressProjectsCount} In Progress
              </p>
            </div>

            <div className="p-5 rounded-xl bg-surface-card border border-border space-y-2">
              <div className="flex items-center justify-between text-muted">
                <span className="text-xs font-mono uppercase font-semibold">New Enquiries</span>
                <Inbox className="w-4 h-4 text-rose-500" />
              </div>
              <p className="text-3xl font-extrabold text-foreground">{newEnquiriesCount}</p>
              <p className="text-[11px] text-muted font-mono">
                {enquiries.length} Total recorded submissions
              </p>
            </div>

            <div className="p-5 rounded-xl bg-surface-card border border-border space-y-2">
              <div className="flex items-center justify-between text-muted">
                <span className="text-xs font-mono uppercase font-semibold">Services</span>
                <Wrench className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-3xl font-extrabold text-foreground">{services.length}</p>
              <p className="text-[11px] text-muted font-mono">Published offerings</p>
            </div>

            <div className="p-5 rounded-xl bg-surface-card border border-border space-y-2">
              <div className="flex items-center justify-between text-muted">
                <span className="text-xs font-mono uppercase font-semibold">Tech Stacks</span>
                <Cpu className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-3xl font-extrabold text-foreground">{technologies.length}</p>
              <p className="text-[11px] text-muted font-mono">Catalogue items</p>
            </div>
          </div>

          {/* Recent Enquiries Section */}
          <div className="bg-surface-card border border-border rounded-xl p-6 space-y-4 shadow-subtle">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">Recent Project Enquiries</h3>
                <p className="text-xs text-muted">
                  Client submissions from the public /contact form.
                </p>
              </div>
              <Button href="/admin/enquiries" variant="outline" size="sm">
                View All Enquiries
              </Button>
            </div>

            {enquiries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border text-muted font-mono uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Reference</th>
                      <th className="py-2.5 px-3">Contact</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Type & Platform</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Received</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {enquiries.slice(0, 5).map((enq) => (
                      <tr key={enq.id} className="hover:bg-surface-muted/40 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-accent">
                          {enq.reference_code}
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-foreground block">{enq.full_name}</span>
                          <span className="text-[11px] text-muted">{enq.email}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded bg-surface-muted text-muted font-medium">
                            {enq.client_category}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-foreground font-medium block">{enq.project_type}</span>
                          <span className="text-[11px] text-muted">{enq.platform}</span>
                        </td>
                        <td className="py-3 px-3">
                          <Badge
                            variant={
                              enq.status === "New"
                                ? "warning"
                                : enq.status === "Won"
                                ? "live"
                                : "default"
                            }
                          >
                            {enq.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-muted">
                          {new Date(enq.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <Link
                            href="/admin/enquiries"
                            className="text-xs font-semibold text-accent hover:underline"
                          >
                            Manage
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-10 text-center text-xs text-muted">
                No client enquiries recorded yet. Submissions to <Link href="/contact" className="text-accent underline">/contact</Link> will appear here.
              </div>
            )}
          </div>

          {/* Quick Portfolio Status Grid */}
          <div className="bg-surface-card border border-border rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">Projects in Portfolio</h3>
                <p className="text-xs text-muted">
                  Case studies, concept projects, and live products published on the site.
                </p>
              </div>
              <Button href="/admin/projects" variant="outline" size="sm">
                Manage Projects
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.slice(0, 6).map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-lg bg-surface-muted/40 border border-border/80 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-muted uppercase">
                        {proj.category}
                      </span>
                      <Badge size="sm" variant={proj.status === "Live" ? "live" : "concept"}>
                        {proj.status}
                      </Badge>
                    </div>
                    <h4 className="font-bold text-sm text-foreground">{proj.title}</h4>
                    <p className="text-xs text-muted line-clamp-2">{proj.summary}</p>
                  </div>

                  <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px]">
                    <span className="font-mono text-muted">{proj.engagement_type}</span>
                    <Link
                      href={`/admin/projects/${proj.id}`}
                      className="font-semibold text-accent hover:underline"
                    >
                      Edit Case
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
