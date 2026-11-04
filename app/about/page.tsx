import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Shield, Target, Code, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About Cross Motive Services",
  description:
    "We are a digital product engineering studio turning ideas into functional, scalable software.",
};

export default function AboutPage() {
  const principles = [
    {
      title: "Pragmatism Over Hype",
      desc: "We don't chase every fleeting frontend framework or buzzword. We build on battle-tested TypeScript, PostgreSQL, and cloud standards that run reliably for years.",
    },
    {
      title: "Radical Transparency",
      desc: "We never conceal technical hurdles or promise unrealistic timelines. If a feature will add complexity or delay launch, we explain why clearly.",
    },
    {
      title: "Design Meets Engineering",
      desc: "Great interfaces require deep collaboration between UI designers and software engineers from the start. We reject silos and isolated handoffs.",
    },
    {
      title: "Client Code Ownership",
      desc: "Upon delivery, you own 100% of all repositories, design files, deployment configurations, and intellectual property without licensing encumbrances.",
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "About" }]} />

        {/* Hero Section */}
        <div className="mb-14 space-y-6">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            Company Overview
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-[1.15]">
            We turn ideas into digital products.
          </h1>
          <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-3xl font-normal">
            From early-stage startup concepts to enterprise-grade platforms, Cross Motive Services designs, engineers, and launches digital experiences built for real-world impact.
          </p>
        </div>

        {/* Studio Background & Story */}
        <section className="p-8 rounded-xl bg-surface-card border border-border mb-16 space-y-6 shadow-subtle">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              Our Perspective
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Built for substance, not agency theatrics
            </h2>
          </div>

          <div className="space-y-4 text-sm text-muted leading-relaxed">
            <p>
              Cross Motive Services was founded on a simple observation: too many digital agencies prioritize fancy pitch decks and bloated project overhead over actual software craftsmanship. Founders and enterprise leaders often find themselves waiting months for prototypes that fail to scale once real users arrive.
            </p>
            <p>
              We took a different approach. We structured our studio around senior product designers and full-stack software engineers working directly with clients. There are no layers of non-technical account managers filtering communication. When you work with us, you speak directly with the architects writing your code and designing your user flows.
            </p>
            <p>
              We engineer high-performance digital products, ERP &amp; CRM architectures, scalable web applications, and enterprise platforms. We believe in software craftsmanship, engineering transparency, and delivering systems built for long-term scalability and business impact.
            </p>
          </div>
        </section>

        {/* Principles Grid */}
        <section className="mb-16 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              Core Values
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              The principles guiding our engineering
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-surface-card border border-border space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
                </div>
                <p className="text-xs text-muted leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Collaboration Model */}
        <section className="p-8 rounded-xl bg-surface-dark text-white border border-white/10 mb-16 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              Operating Model
            </span>
            <h2 className="text-2xl font-bold text-white">
              Distributed, focused, and directly accessible
            </h2>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
            Our engineers and designers work across distributed hubs, collaborating via shared GitHub repositories, Figma workspaces, and direct Slack/Discord channels with your team. We maintain weekly sprint demos, shared task boards, and continuous integration previews so you always inspect actual working software at every stage.
          </p>
          <div className="pt-2">
            <Button href="/contact" size="md" variant="primary">
              <span>Initiate a Conversation</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </div>

      <CTASection
        title="Ready to partner with Cross Motive Services?"
        description="Tell us about the digital platform or MVP you are planning to build."
      />
    </div>
  );
}
