import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Smartphone,
  ShieldAlert,
  Code,
  Calendar,
  Sparkles,
} from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/data/storage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";
import { ProjectCard } from "@/components/projects/ProjectCard";

interface CaseStudyProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug, true);
  if (!project) return { title: "Case Study Not Found" };

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Case Study | Cross Motive Services`,
      description: project.summary,
      images: [{ url: project.cover_image }],
    },
  };
}

export const revalidate = 60;

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const project = await getProjectBySlug(params.slug, true);
  if (!project) {
    notFound();
  }

  const allProjects = await getProjects(false);
  const relatedProjects = allProjects
    .filter((p) => p.slug !== project.slug && (p.category === project.category || p.client_type === project.client_type))
    .slice(0, 2);

  const isConcept = project.engagement_type === "Concept Project";

  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Work", href: "/work" },
            { label: project.title },
          ]}
        />

        {/* 1. Project Overview & Header */}
        <header className="mb-12 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={
                project.engagement_type === "Concept Project"
                  ? "concept"
                  : project.engagement_type === "Internal Product"
                  ? "internal"
                  : "live"
              }
              size="md"
            >
              {project.engagement_type}
            </Badge>
            <Badge variant="outline" size="md">
              {project.category}
            </Badge>
            <span className="text-xs font-mono text-muted">
              Client Category: {project.client_type}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted leading-relaxed font-normal">
            {project.summary}
          </p>

          {/* Quick Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-surface-card border border-border text-xs">
            <div>
              <span className="block font-mono text-muted uppercase text-[10px]">Project Type</span>
              <span className="font-semibold text-foreground text-sm">{project.project_type}</span>
            </div>
            <div>
              <span className="block font-mono text-muted uppercase text-[10px]">Engagement</span>
              <span className="font-semibold text-foreground text-sm">{project.engagement_type}</span>
            </div>
            <div>
              <span className="block font-mono text-muted uppercase text-[10px]">Current Status</span>
              <span className="font-semibold text-accent text-sm">{project.status}</span>
            </div>
            <div>
              <span className="block font-mono text-muted uppercase text-[10px]">Primary Tech</span>
              <span className="font-semibold text-foreground text-sm">{project.technologies[0] || "TypeScript"}</span>
            </div>
          </div>
        </header>

        {/* Concept / Transparency Notice */}
        {isConcept && (
          <div className="mb-12 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5">Concept & Architectural Study Notice:</span>
              <span>
                This project represents a validated internal concept and technical architecture prototype designed by Cross Motive Services. All metrics, flows, and performance evaluations refer to architectural benchmarks and simulations rather than live third-party commercial guarantees.
              </span>
            </div>
          </div>
        )}

        {/* Cover Image Feature (11. Responsive interface screenshot) */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-surface-dark border border-border shadow-elevated mb-16">
          <Image
            src={project.cover_image}
            alt={`${project.title} interface preview`}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Case Study Core Body */}
        <div className="space-y-16">
          {/* 2. Product Context & 3. Problem Statement */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
            <div className="space-y-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                02. Product Context
              </span>
              <h2 className="text-2xl font-bold text-foreground">
                Background & Motivation
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-500">
                03. Problem Statement
              </span>
              <h2 className="text-2xl font-bold text-foreground">
                The Core Friction
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {project.problem}
              </p>
            </div>
          </section>

          {/* 4. Target Audience & 5. Objectives */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
            <div className="space-y-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                04. Target Audience
              </span>
              <h2 className="text-2xl font-bold text-foreground">
                User Personas & Beneficiaries
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {project.target_audience}
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                05. Product Objectives
              </span>
              <h2 className="text-2xl font-bold text-foreground">
                Core Success Metrics
              </h2>
              <ul className="space-y-2">
                {project.product_objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 6. Scope of Work & 7. Design Approach */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
            <div className="space-y-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                06. Scope of Work
              </span>
              <h2 className="text-2xl font-bold text-foreground">
                Delivered Engineering Tracks
              </h2>
              <ul className="space-y-2">
                {project.scope_of_work.map((scope, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{scope}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                07. Design Approach
              </span>
              <h2 className="text-2xl font-bold text-foreground">
                UI & Interaction Philosophy
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {project.design_approach}
              </p>
            </div>
          </section>

          {/* 8. Technical Architecture */}
          <section className="pt-8 border-t border-border space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-accent" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                08. Technical Architecture & System Design
              </span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Under the Hood Architecture
            </h2>
            <div className="p-6 rounded-xl bg-surface-card border border-border space-y-3">
              <p className="text-sm text-muted leading-relaxed">
                {project.architecture}
              </p>
              <div className="pt-3 border-t border-border/60 flex flex-wrap gap-2 text-xs font-mono">
                {project.technologies.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded bg-surface-muted text-foreground border border-border">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* 9. Main Features */}
          <section className="pt-8 border-t border-border space-y-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              09. Product Capabilities
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Main Functional Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feat, i) => (
                <div key={i} className="p-4 rounded-lg bg-surface-card border border-border flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent/10 text-accent font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-xs text-foreground font-medium leading-relaxed">
                    {feat}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 11. Interface Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="pt-8 border-t border-border space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                11. Interface Previews & Schematics
              </span>
              <h2 className="text-2xl font-bold text-foreground">
                Screen Gallery & Flow Telemetry
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.gallery.map((img, i) => (
                  <div key={i} className="relative aspect-[16/10] rounded-xl overflow-hidden bg-surface-dark border border-border shadow-card">
                    <Image
                      src={img}
                      alt={`${project.title} view ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 12. Challenges & 13. Status */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
            <div className="space-y-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                12. Technical Trade-offs & Challenges
              </span>
              <h2 className="text-2xl font-bold text-foreground">
                Engineering Constraints
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {project.challenges}
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                13. Development Status & Verification
              </span>
              <h2 className="text-2xl font-bold text-foreground">
                Current Stage & Outcomes
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {project.outcomes}
              </p>
              <div className="pt-2">
                <span className="text-xs font-mono text-muted">
                  Verified Commercial Outcome:{" "}
                  <strong className={project.outcomes_verified ? "text-emerald-500" : "text-amber-500"}>
                    {project.outcomes_verified ? "Yes (Client Verified)" : "No (Concept / Internal Prototype)"}
                  </strong>
                </span>
              </div>
            </div>
          </section>

          {/* 14. Learnings & Next Steps */}
          <section className="pt-8 border-t border-border space-y-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              14. Learnings & Next Steps
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Evolution & Roadmap
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              {project.learnings_and_next_steps}
            </p>
          </section>

          {/* 15. Related Projects */}
          {relatedProjects.length > 0 && (
            <section className="pt-12 border-t border-border space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                    15. Related Exploration
                  </span>
                  <h3 className="text-2xl font-bold text-foreground">
                    More Projects in Similar Stacks
                  </h3>
                </div>
                <Button href="/work" variant="outline" size="sm">
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedProjects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* 16. Contact CTA */}
      <div className="mt-20">
        <CTASection
          title={`Interested in building a product like ${project.title}?`}
          description="We work with founders and enterprise leaders to architect, engineer, and ship production-ready digital products."
          primaryCtaText="Discuss Your Requirements"
          primaryCtaLink="/contact"
        />
      </div>
    </div>
  );
}
