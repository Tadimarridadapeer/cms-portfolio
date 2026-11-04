import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Industry & Audience Solutions",
  description:
    "Tailored digital product engineering solutions for startups, enterprises, small businesses, and individual creators.",
};

export default function SolutionsOverviewPage() {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Solutions" }]} />

        <div className="mb-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            Audience & Industry Frameworks
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-2 mb-4">
            Engineering Solutions Matched to Your Stage
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
            Different organizational stages require fundamentally different technical architectures. We tailor our engagement cadence, documentation depth, and technology selections to match your operational speed and risk profile.
          </p>
        </div>
      </div>

      <WhatWeBuild />

      <CTASection
        title="Find the right solution for your organization"
        description="Schedule a technical discovery session to review your scope and architectural constraints."
      />
    </div>
  );
}
