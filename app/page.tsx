import React from "react";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TechGrid } from "@/components/sections/TechGrid";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CTASection } from "@/components/sections/CTASection";
import { getProjects } from "@/lib/data/storage";

export const revalidate = 60;

export default async function HomePage() {
  const projects = await getProjects(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ServicesGrid />
      <TechGrid />
      <FeaturedProjects initialProjects={projects} />
      <WhatWeBuild />
      <ProcessTimeline />
      <CTASection />
    </div>
  );
}
