import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface AlertProps {
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Alert({ type = "info", title, children, className }: AlertProps) {
  const styles = {
    info: "bg-accent/5 border-accent/20 text-foreground",
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-950 dark:text-emerald-200",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-950 dark:text-amber-200",
    error: "bg-rose-500/10 border-rose-500/20 text-rose-950 dark:text-rose-200",
  };

  return (
    <div
      role="alert"
      className={twMerge(
        clsx("p-4 rounded-md border text-sm leading-relaxed", styles[type], className)
      )}
    >
      {title && <h5 className="font-semibold text-sm mb-1">{title}</h5>}
      <div>{children}</div>
    </div>
  );
}
