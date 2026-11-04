import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-surface-muted border border-border flex items-center justify-center mx-auto text-accent shadow-subtle">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            404 Error · Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Lost in digital space
          </h1>
          <p className="text-sm text-muted leading-relaxed">
            The page or case study you are looking for does not exist, has been archived, or was moved during our system architecture migration.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md">
            <Home className="w-4 h-4 mr-2" />
            <span>Return to Home</span>
          </Button>
          <Button href="/work" variant="outline" size="md">
            <span>Explore Case Studies</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
