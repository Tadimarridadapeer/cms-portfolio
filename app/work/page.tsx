import React from "react";
import { Metadata } from "next";
import { getProjects } from "@/lib/data/storage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description:
    "Explore our engineering case studies, systems architectures, and enterprise platforms across web, mobile, and AI.",
};

export const revalidate = 60;

export default async function WorkPage() {
  const projects = await getProjects(false);

  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Work & Case Studies" }]} />

        <div className="mb-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            Digital Engineering Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-2 mb-4">
            Selected Work &amp; Case Studies
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
            A comprehensive look at our design systems, scalable web applications, mobile apps, ERP &amp; CRM solutions, and enterprise platforms.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="my-16 py-16 px-6 rounded-2xl bg-surface-card border border-border text-center max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 text-accent mx-auto flex items-center justify-center mb-5">
              <span className="font-mono text-xl font-bold">CMS</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Portfolio Refresh in Progress</h2>
            <p className="text-muted text-sm leading-relaxed mb-6">
              We are currently preparing and updating our latest client deployments, ERP &amp; CRM implementations, and enterprise software case studies. Check back shortly, or reach out to request tailored references.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button href="/services" variant="primary">
                Explore Engineering Services
              </Button>
              <Button href="/contact" variant="secondary">
                Request Work References
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      <CTASection
        title="Ready to build your product?"
        description="Whether you have an early design or a detailed technical specification, we can help engineer your next digital platform."
      />
    </div>
  );
}
