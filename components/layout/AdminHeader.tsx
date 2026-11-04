"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Bell, Shield, User } from "lucide-react";
import { Badge } from "../ui/Badge";

export function AdminHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="h-16 px-8 bg-surface-card border-b border-border flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-base font-bold text-foreground leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-muted leading-tight">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <Badge variant="outline" size="sm" className="hidden sm:inline-flex">
          Authenticated Session
        </Badge>
        <Link
          href="/"
          target="_blank"
          className="text-xs text-muted hover:text-foreground flex items-center gap-1 font-medium"
        >
          <span>Live Site</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
}
