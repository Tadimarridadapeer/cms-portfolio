import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Cross Motive Services Privacy Policy — Information on how we collect, store, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <div className="mb-10 space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            Legal & Compliance
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-muted font-mono">
            Last Updated: January 2026 · Cross Motive Services
          </p>
        </div>

        <div className="p-8 rounded-xl bg-surface-card border border-border space-y-6 text-xs sm:text-sm text-muted leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">1. Introduction</h2>
            <p>
              Cross Motive Services (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy and is committed to protecting the personal and project information you provide to us through our website and digital services. This policy outlines how information is collected, stored, and utilized.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">2. Information We Collect</h2>
            <p>
              When you submit a project enquiry or request a discovery discussion through our website, we collect:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Full name and business email address</li>
              <li>Company name and organizational category (Startup, Enterprise, Business, Individual)</li>
              <li>Project scope, target platform, timeline, and budget parameters</li>
              <li>Meeting preference times and optional project notes</li>
            </ul>
            <p>
              We do not track unnecessary personal identifiers, nor do we sell or monetize contact records to third-party marketing brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">3. How Information is Used</h2>
            <p>
              The information you submit is strictly utilized to:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Assess technical feasibility and prepare customized scoping roadmaps</li>
              <li>Communicate directly regarding project proposals and discovery calls</li>
              <li>Maintain internal customer relationship records and follow-ups</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">4. Data Security & Storage</h2>
            <p>
              Submissions are stored in encrypted database repositories protected by strict Row Level Security (RLS) policies. Only authorized administrators with authenticated sessions can inspect enquiry submissions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">5. Your Data Rights</h2>
            <p>
              You have the right to request access to the data we hold regarding your project enquiry, or to request its permanent deletion from our records. To exercise these rights, email us at <strong className="text-foreground">sahith@crossmotiveservices.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
