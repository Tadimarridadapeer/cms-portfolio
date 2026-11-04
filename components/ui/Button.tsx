import React from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  isLoading?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs tracking-tight",
    md: "px-5 py-2.5 text-sm tracking-tight",
    lg: "px-6 py-3.5 text-base tracking-tight font-semibold",
  };

  const variantClasses = {
    primary:
      "bg-accent text-white hover:bg-accent-hover shadow-subtle border border-accent/20",
    secondary:
      "bg-surface-card text-foreground hover:bg-surface-muted border border-border shadow-subtle",
    outline:
      "bg-transparent border border-border text-foreground hover:bg-surface-muted",
    ghost:
      "bg-transparent text-foreground hover:bg-surface-muted border-transparent",
    dark:
      "bg-surface-dark text-white hover:bg-black border border-white/10 shadow-card",
  };

  const merged = twMerge(
    clsx(baseClasses, sizeClasses[size], variantClasses[variant], className)
  );

  if (href) {
    return (
      <Link href={href} className={merged}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          children
        )}
      </Link>
    );
  }

  return (
    <button className={merged} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
