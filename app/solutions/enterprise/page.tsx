import React from "react";
import { Metadata } from "next";
import { Building2, CheckCircle2, ArrowRight, ShieldCheck, Database, Lock } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Enterprise Solutions — Systems & Modernization",
  description:
    "Enterprise platform engineering, internal tooling, automated workflows, and secure legacy migrations.",
};

export default function EnterpriseSolutionPage() {
  const highlights = [
    {
      title: "Strict Governance & Compliance",
      desc: "Built to adhere to OWASP security protocols, role-based access control (RBAC), and enterprise encryption standards.",
    },
    {
      title: "Legacy System Modernization",
      desc: "Upgrading brittle monolithic codebases and fragile desktop databases to modular cloud-native TypeScript architectures.",
    },
    {
      title: "ERP & API Integration Hubs",
      desc: "Secure middleware connectors synchronizing data across Salesforce, SAP, custom internal APIs, and modern dashboards.",
    },
    {
      title: "Observability & Auditability",
      desc: "Detailed telemetry, mutation logging, and automated error reporting tailored for compliance auditing.",
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Solutions", href: "/solutions" },
            { label: "For Enterprise" },
          ]}
        />

        <div className="mb-14 space-y-6">
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            Enterprises & Large Organizations
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-[1.15]">
            Resilient software engineered for enterprise scale & security
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-3xl">
            We help enterprise leaders eliminate obsolete workflows, build bespoke operational platforms, and modernize business applications without disrupting critical ongoing operations.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Button href="/contact" size="lg" variant="primary">
              <span>Initiate Enterprise Inquiry</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button href="/services/enterprise-solutions" size="lg" variant="secondary">
              <span>Enterprise Services Scope</span>
            </Button>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {highlights.map((item, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-surface-card border border-border space-y-3">
              <span className="text-xs font-mono font-bold text-accent">0{idx + 1}</span>
              <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Security & Operational Commitments */}
        <div className="p-8 rounded-xl bg-surface-card border border-border mb-16 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            Enterprise Engagement Standards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-muted">
            <div className="space-y-2">
              <span className="font-semibold text-foreground text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-accent" />
                Data Confidentiality & NDAs
              </span>
              <p className="leading-relaxed">
                We sign mutual non-disclosure agreements before reviewing proprietary system schemas or architecture diagrams.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-semibold text-foreground text-sm flex items-center gap-2">
                <Database className="w-4 h-4 text-accent" />
                Data Locality & Private VPCs
              </span>
              <p className="leading-relaxed">
                Deployments configured inside your AWS, GCP, or private cloud environments so sensitive data never leaves your perimeter.
              </p>
            </div>
          </div>
        </div>
      </div>

      <CTASection
        title="Modernize your enterprise operations"
        description="Speak with our technical leads to discuss architecture audits and phased modernization strategies."
        primaryCtaText="Contact Enterprise Solutions"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
