import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Cross Motive Services Terms of Service — Engagement frameworks and website usage terms.",
};

export default function TermsPage() {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Terms of Service" }]} />

        <div className="mb-10 space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            Legal & Compliance
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-muted font-mono">
            Last Updated: January 2026 · Cross Motive Services
          </p>
        </div>

        <div className="p-8 rounded-xl bg-surface-card border border-border space-y-6 text-xs sm:text-sm text-muted leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing the website of Cross Motive Services (&ldquo;CMS&rdquo;), you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of this site.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">2. Nature of Services & Proposals</h2>
            <p>
              Information presented on this website does not constitute a binding commercial contract. All formal client engineering engagements are governed by separate Master Services Agreements (MSAs) and detailed Statements of Work (SOWs) executed between Cross Motive Services and the client.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">3. Portfolio Classifications & Concept Transparency</h2>
            <p>
              Cross Motive Services maintains an honest, transparent portfolio. Internal design studies, architecture experiments, and prototypes are explicitly designated as &ldquo;Concept Project&rdquo; or &ldquo;Internal Product&rdquo;. No claims of live commercial user metrics or verified third-party endorsements are made without documented client authorization.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">4. Intellectual Property</h2>
            <p>
              All branding, proprietary text, SVG designs, and architectural layout systems on this website are protected intellectual property of Cross Motive Services. For client projects, custom code and assets created under signed agreements become the property of the client upon final settlement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">5. Limitation of Liability</h2>
            <p>
              Cross Motive Services provides this website &ldquo;as is&rdquo; without warranties of any kind regarding uninterrupted uptime or error-free operation. In no event shall CMS be liable for indirect or consequential damages arising from site access.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
