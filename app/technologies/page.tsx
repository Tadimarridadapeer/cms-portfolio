import React from "react";
import { Metadata } from "next";
import { TechGrid } from "@/components/sections/TechGrid";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { getTechnologies } from "@/lib/data/storage";

export const metadata: Metadata = {
  title: "Technologies & Engineering Stack",
  description:
    "Explore the frameworks, databases, cloud tools, and machine learning models we use to engineer production software.",
};

export const revalidate = 60;

export default async function TechnologiesPage() {
  const technologies = await getTechnologies();

  // Group technologies by category
  const categories = Array.from(new Set(technologies.map((t) => t.category)));

  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Technologies" }]} />

        <div className="mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            Technology Catalogue
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-2 mb-4">
            Production-Tested Engineering Stack
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
            We maintain high standards for technical stack selection. Every framework, database, and library in our toolbox is chosen for type safety, long-term ecosystem stability, active security maintenance, and operational performance.
          </p>
        </div>

        {/* Categories Section */}
        <div className="space-y-12 mb-20">
          {categories.map((cat) => {
            const items = technologies.filter((t) => t.category === cat && t.is_published);
            return (
              <section key={cat} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-border pb-2">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  <h2 className="text-xl font-bold text-foreground">{cat}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((tech) => (
                    <div
                      key={tech.id}
                      className="p-5 rounded-xl bg-surface-card border border-border hover:border-accent/40 transition-colors space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-foreground text-sm">{tech.name}</h3>
                        <span className="text-[10px] font-mono text-muted uppercase">
                          {tech.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <TechGrid />

      <CTASection
        title="Need architecture guidance for your stack?"
        description="We can evaluate your current codebase or design a greenfield tech stack suited to your performance and budget goals."
      />
    </div>
  );
}
