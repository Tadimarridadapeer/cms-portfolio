import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  HelpCircle,
  Layers,
  ArrowRight,
  ShieldCheck,
  Code2,
} from "lucide-react";
import { Service } from "@/lib/types";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import { Button } from "../ui/Button";
import { CTASection } from "../sections/CTASection";

interface ServiceDetailViewProps {
  service: Service;
}

export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: service.title },
          ]}
        />

        {/* Hero Section of Service */}
        <header className="mb-14 space-y-6">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            Service Capability
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.15]">
            {service.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted leading-relaxed font-normal max-w-3xl">
            {service.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Button href="/contact" size="lg" variant="primary">
              <span>Request Service Discovery</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button href="/work" size="lg" variant="secondary">
              <span>View Related Projects</span>
            </Button>
          </div>
        </header>

        {/* Technology Strip */}
        <div className="p-6 rounded-xl bg-surface-card border border-border mb-16 space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted font-semibold">
            Primary Technology Stack & Toolchain
          </span>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 text-xs font-medium rounded-md bg-surface-muted text-foreground border border-border"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted pt-2 border-t border-border/60">
            Note: We select libraries and infrastructure depending on your specific project requirements, compliance mandates, and scaling budget.
          </p>
        </div>

        {/* Deliverables & Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Deliverables */}
          <div className="bg-surface-card border border-border rounded-xl p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold text-foreground">
                Scope & Deliverables
              </h2>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Every engagement is structured around tangible, production-ready deliverables rather than vague advisory hours.
            </p>
            <ul className="space-y-3 pt-2">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div className="bg-surface-card border border-border rounded-xl p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold text-foreground">
                Typical Use Cases
              </h2>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Scenarios where this service provides the highest technical ROI and business leverage.
            </p>
            <ul className="space-y-3 pt-2">
              {service.use_cases.map((useCase, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground leading-relaxed">
                  <span className="w-4 h-4 rounded-full bg-accent/10 text-accent font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How We Deliver This Service */}
        <section className="mb-16 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              Our Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              How we execute {service.title}
            </h2>
            <p className="text-sm text-muted max-w-2xl">
              We employ a milestone-based engagement model with frequent preview releases and clear communication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-surface-card border border-border space-y-2">
              <span className="font-mono text-xs text-accent font-bold">Stage 1</span>
              <h3 className="font-bold text-foreground text-base">Discovery & Schema</h3>
              <p className="text-xs text-muted leading-relaxed">
                Defining exact interfaces, data models, user stories, and third-party API requirements.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-surface-card border border-border space-y-2">
              <span className="font-mono text-xs text-accent font-bold">Stage 2</span>
              <h3 className="font-bold text-foreground text-base">Engineering Sprints</h3>
              <p className="text-xs text-muted leading-relaxed">
                Iterative full-stack development with staged PR reviews and staging environments for testing.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-surface-card border border-border space-y-2">
              <span className="font-mono text-xs text-accent font-bold">Stage 3</span>
              <h3 className="font-bold text-foreground text-base">Handover & Deploy</h3>
              <p className="text-xs text-muted leading-relaxed">
                Production rollout, telemetry configuration, documentation transfer, and repository handover.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        {service.faq && service.faq.length > 0 && (
          <section className="mb-16 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                Common Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {service.faq.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-surface-card border border-border space-y-2"
                >
                  <h4 className="font-bold text-foreground text-base flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-accent shrink-0 mt-1" />
                    <span>{item.question}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-muted pl-6 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <CTASection
        title={`Ready to start your ${service.title.toLowerCase()}?`}
        description="Share your timeline and technical requirements. We will prepare a practical project roadmap and scoping discussion."
        primaryCtaText="Discuss This Service"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
