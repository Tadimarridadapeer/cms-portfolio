"use client";

import React, { useEffect } from "react";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime exception captured:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface-card border border-border rounded-xl p-8 text-center space-y-6 shadow-card">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-rose-500">
            System Notice
          </span>
          <h2 className="text-2xl font-bold text-foreground">
            Something unexpected occurred
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            Our system logged the incident. You can attempt to refresh the view or return to the main homepage.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={() => reset()} variant="primary" size="sm">
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            <span>Try Again</span>
          </Button>
          <Button href="/" variant="outline" size="sm">
            <Home className="w-3.5 h-3.5 mr-1.5" />
            <span>Go Home</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
