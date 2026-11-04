import React from "react";
import { Metadata } from "next";
import { UserCheck, CheckCircle2, ArrowRight, Sparkles, Layout, Compass } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Individual & Creator Solutions",
  description:
    "We design and build bespoke digital platforms, creator products, and high-craft portfolio applications for solo entrepreneurs.",
};

export default function IndividualsSolutionPage() {
  const highlights = [
    {
      title: "Author & Creator Publishing",
      desc: "Distraction-free reading experiences, serial newsletters, and digital storefronts tailored to creator monetization.",
    },
    {
      title: "Personal Authority Portfolios",
      desc: "Editorial websites that showcase your work, publications, speaking, and client case studies with serious craftsmanship.",
    },
    {
      title: "Micro-SaaS & Side Ventures",
      desc: "Transforming your niche spreadsheet or API tool into an automated subscription SaaS platform you can monetize.",
    },
    {
      title: "Full Code Ownership",
      desc: "You own all code, repositories, and credentials from day one. No vendor lock-in or proprietary website builder restrictions.",
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Solutions", href: "/solutions" },
            { label: "For Individuals" },
          ]}
        />

        <div className="mb-14 space-y-6">
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            Solo Founders, Creators & Domain Experts
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-[1.15]">
            Build your personal product or creator platform with engineering depth
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-3xl">
            You don&apos;t have to settle for cookie-cutter website builders. We engineer custom digital products and high-performance web platforms that help solo creators and experts build defensible digital assets.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Button href="/contact" size="lg" variant="primary">
              <span>Discuss Your Personal Project</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button href="/work" size="lg" variant="secondary">
              <span>Explore Prototypes</span>
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
      </div>

      <CTASection
        title="Ready to build your independent product?"
        description="Tell us about the tool, newsletter, or platform you want to create."
        primaryCtaText="Start Project"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
