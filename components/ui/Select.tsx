import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-muted">
            {label} {props.required && <span className="text-rose-500">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={inputId}
            ref={ref}
            className={twMerge(
              clsx(
                "w-full px-3.5 py-2.5 text-sm rounded-md bg-surface-light border border-border text-foreground transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent disabled:opacity-50 disabled:bg-surface-muted appearance-none pr-10",
                error && "border-rose-500 focus:ring-rose-500 focus:border-rose-500",
                className
              )
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-muted">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
