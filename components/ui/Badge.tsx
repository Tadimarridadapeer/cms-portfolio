import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline" | "concept" | "internal" | "live" | "draft" | "warning";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  const base = "inline-flex items-center font-medium rounded tracking-wide uppercase transition-colors";

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px] leading-tight",
    md: "px-2.5 py-1 text-xs",
  };

  const variantClasses = {
    default: "bg-surface-muted text-muted border border-border",
    accent: "bg-accent/10 text-accent border border-accent/20 font-semibold",
    outline: "bg-transparent text-foreground border border-border",
    concept: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold",
    internal: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-semibold",
    live: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold",
    draft: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/20 font-semibold",
    warning: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-semibold",
  };

  return (
    <span
      className={twMerge(clsx(base, sizeClasses[size], variantClasses[variant], className))}
      {...props}
    >
      {children}
    </span>
  );
}
