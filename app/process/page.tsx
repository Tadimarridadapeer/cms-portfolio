import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CTASection } from "@/components/sections/CTASection";
import { CheckCircle2, ShieldCheck, GitPullRequest, Code2, Users, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Development Methodology & Process",
  description:
    "Learn about our disciplined six-stage digital product development methodology: from discovery to production launch.",
};

export default function ProcessPage() {
  const steps = [
    {
      num: "01",
      name: "Discover",
      summary:
        "Understand the business problem, target audience, core constraints, competitive landscape, and desired technical outcomes.",
      details: [
        "In-depth stakeholder interviews to map business model and success metrics.",
        "User persona definitions and primary user journey pathways.",
        "Technical constraints review: existing databases, compliance, external APIs.",
      ],
      deliverables: ["Product brief", "User persona models", "Technical constraint audit"],
    },
    {
      num: "02",
      name: "Define",
      summary:
        "Establish requirements, precise scope boundaries, milestones, technology architecture, and a realistic delivery timeline.",
      details: [
        "Product Requirement Document (PRD) detailing user stories and acceptance criteria.",
        "Entity Relationship Diagrams (ERDs) and API contract specifications.",
        "Milestone-based delivery roadmap with explicit sprint allocations.",
      ],
      deliverables: ["Requirements document (PRD)", "System architecture blueprint", "Milestone schedule"],
    },
    {
      num: "03",
      name: "Design",
      summary:
        "Create information architecture, wireframes, user flows, design tokens, and clickable interactive Figma prototypes.",
      details: [
        "Wireframing low-fidelity interaction structures to validate flows early.",
        "High-fidelity visual design adhering to our clean monochrome & accent aesthetic.",
        "Interactive prototypes for team review and user testing validation.",
      ],
      deliverables: ["Clickable Figma prototype", "Component design system", "Responsive layout specs"],
    },
    {
      num: "04",
      name: "Engineer",
      summary:
        "Develop frontend components, backend APIs, database schemas, secure integrations, and application infrastructure.",
      details: [
        "Clean TypeScript codebase with strict ESLint and formatting standards.",
        "Modular API endpoints with robust error handling and schema validation.",
        "Staging environments deployed on every pull request for live stakeholder review.",
      ],
      deliverables: ["TypeScript codebase", "Documented REST/GraphQL APIs", "Containerized environments"],
    },
    {
      num: "05",
      name: "Validate",
      summary:
        "Conduct functional testing, cross-device QA, security vulnerability assessments, accessibility checks, and performance tuning.",
      details: [
        "Cross-browser and mobile responsive testing from 320px to large 4K displays.",
        "Lighthouse audits for SEO, Core Web Vitals, and WCAG accessibility standards.",
        "Security checks covering input validation, rate limiting, and SQL/XSS prevention.",
      ],
      deliverables: ["Test automation suites", "Security & OWASP audit", "Lighthouse optimization report"],
    },
    {
      num: "06",
      name: "Launch & Improve",
      summary:
        "Deploy the product to production, hand over source documentation, configure observability telemetry, and plan iteration phases.",
      details: [
        "Zero-downtime production deployment with automated DNS and SSL configuration.",
        "Full repository and administrative handover session with complete technical docs.",
        "Configuring error monitoring (Sentry/logs) to catch and fix edge issues quickly.",
      ],
      deliverables: ["Live deployment", "Repository handover", "Telemetry & monitoring dashboards"],
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Process" }]} />

        <div className="mb-14 space-y-6">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            Disciplined Delivery
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-[1.15]">
            How we take products from concept to production
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-3xl">
            Software projects fail when assumptions remain unexamined and scopes expand uncontrollably. Our 6-stage lifecycle provides clarity, structure, and accountability at every step.
          </p>
        </div>

        {/* Detailed Stages */}
        <div className="space-y-12 mb-20">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-8 rounded-xl bg-surface-card border border-border space-y-6 shadow-subtle"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-3xl font-black text-accent">{step.num}</span>
                  <h2 className="text-2xl font-bold text-foreground">{step.name}</h2>
                </div>
                <span className="text-xs font-mono text-muted uppercase">
                  Lifecycle Phase {step.num}
                </span>
              </div>

              <p className="text-sm text-foreground leading-relaxed font-medium">
                {step.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <h4 className="text-xs uppercase font-mono font-bold text-muted tracking-wider mb-2">
                    Execution Activities
                  </h4>
                  <ul className="space-y-2 text-xs text-muted">
                    {step.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-mono font-bold text-muted tracking-wider mb-2">
                    Delivered Artifacts
                  </h4>
                  <ul className="space-y-2 text-xs text-foreground font-medium">
                    {step.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <FileText className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CTASection
        title="Ready to begin Phase 01: Discover?"
        description="Share your initial requirements. We will organize an initial discovery dialogue to understand your goals."
      />
    </div>
  );
}
