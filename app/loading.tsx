import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-border"></div>
        <div className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted">
        Loading Cross Motive Services...
      </p>
    </div>
  );
}
