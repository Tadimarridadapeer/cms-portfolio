"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Inbox,
  Wrench,
  Cpu,
  Settings,
  LogOut,
  ArrowUpRight,
  Shield,
} from "lucide-react";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects & Cases", href: "/admin/projects", icon: FolderGit2 },
  { label: "Enquiries & Leads", href: "/admin/enquiries", icon: Inbox },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Tech Catalogue", href: "/admin/technologies", icon: Cpu },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch {
      window.location.href = "/admin/login";
    }
  };

  return (
    <aside className="w-64 bg-surface-dark text-white border-r border-white/10 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-accent text-white flex items-center justify-center font-bold text-xs tracking-wider">
              CMS
            </div>
            <div>
              <span className="font-bold text-sm text-white block leading-tight">
                Admin Studio
              </span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                Cross Motive
              </span>
            </div>
          </Link>
          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Connected"></span>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-white font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
            <span>View Public Site</span>
          </span>
          <span className="text-[10px] font-mono text-zinc-500">Live</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out Admin</span>
        </button>
      </div>
    </aside>
  );
}
