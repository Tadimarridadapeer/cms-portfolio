import React from "react";
import { Metadata } from "next";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Engineering Services",
  description:
    "Explore our full-stack engineering services: web applications, mobile apps, AI products, UI/UX design, enterprise software, and MVP development.",
};

export default function ServicesPage() {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Services" }]} />

        <div className="mb-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            Core Capabilities
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-2 mb-4">
            Digital Product Engineering Services
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
            From validating early startup hypotheses to modernizing enterprise platforms, our multidisciplinary team handles full product lifecycles — architecture, interface design, backend infrastructure, and scalable deployments.
          </p>
        </div>
      </div>

      <ServicesGrid showAllButton={false} />

      <CTASection
        title="Need a custom technical solution?"
        description="Every product has unique constraints. Contact our engineering team for an in-depth discovery discussion."
      />
    </div>
  );
}
