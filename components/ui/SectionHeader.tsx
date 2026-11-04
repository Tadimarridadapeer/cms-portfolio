import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={twMerge(
        clsx(
          "max-w-3xl mb-12",
          isCenter && "mx-auto text-center",
          className
        )
      )}
    >
      {eyebrow && (
        <div
          className={clsx(
            "text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2",
            isCenter && "justify-center",
            isDark ? "text-accent" : "text-accent"
          )}
        >
          <span className="w-2 h-2 rounded-full bg-accent inline-block"></span>
          <span>{eyebrow}</span>
        </div>
      )}
      <h2
        className={clsx(
          "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-[1.15]",
          isDark ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "text-base sm:text-lg leading-relaxed",
            isDark ? "text-muted-foreground" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
