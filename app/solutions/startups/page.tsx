import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Rocket, CheckCircle2, ArrowRight, Layers, Zap, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Startup Solutions — MVP & Product Validation",
  description:
    "We help startup founders validate hypotheses, design intuitive interfaces, and launch production-ready MVPs that scale.",
};

export default function StartupsSolutionPage() {
  const highlights = [
    {
      title: "Ruthless MVP Scoping",
      desc: "We help you strip non-essential features and prioritize the single core value loop needed to test customer willingness to pay.",
    },
    {
      title: "Scalable TypeScript Stacks",
      desc: "Built on Next.js, PostgreSQL, and clean APIs so you don't have to throw away code when your user base begins to grow.",
    },
    {
      title: "Speed to Market",
      desc: "Structured milestone delivery designed to get functional software into customer hands in weeks, not quarters.",
    },
    {
      title: "Investor-Ready Polish",
      desc: "High-craft design systems and smooth interactions that give early backers and pilot users confidence in your product.",
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Solutions", href: "/solutions" },
            { label: "For Startups" },
          ]}
        />

        <div className="mb-14 space-y-6">
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
            <Rocket className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            Founders & Venture Studios
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-[1.15]">
            Turn your startup idea into a validated digital product
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-3xl">
            You don&apos;t need a bloated engineering department to test your thesis. We act as your fractional product engineering team — designing, building, and shipping your MVP with clean code and no technical baggage.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Button href="/contact" size="lg" variant="primary">
              <span>Start an MVP Discussion</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button href="/work" size="lg" variant="secondary">
              <span>View Startup Prototypes</span>
            </Button>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {highlights.map((item, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-surface-card border border-border space-y-3">
              <span className="text-xs font-mono font-bold text-accent">0{idx + 1}</span>
              <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Detailed Startup Deliverables */}
        <div className="p-8 rounded-xl bg-surface-card border border-border mb-16 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            What is included in a Startup MVP package
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-muted">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Product architecture blueprint and entity relationship diagrams</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Figma clickable interactive prototypes for user testing</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Full-stack web or mobile application with authentication & permissions</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Payment gateway integration (Stripe / custom provider)</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>CI/CD automated testing and preview environment configuration</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Complete repository ownership handover and architecture documentation</span>
            </div>
          </div>
        </div>
      </div>

      <CTASection
        title="Ready to validate your startup product?"
        description="Schedule a technical scoping session to review your core hypothesis and MVP milestones."
        primaryCtaText="Discuss Your Startup Project"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
