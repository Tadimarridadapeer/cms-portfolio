import React from "react";
import { Metadata } from "next";
import { Store, CheckCircle2, ArrowRight, Laptop, Users, BarChart3 } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Business Solutions — Digital Transformation & Portals",
  description:
    "We help growing businesses replace manual spreadsheets with custom web portals, booking tools, and automated customer portals.",
};

export default function BusinessesSolutionPage() {
  const highlights = [
    {
      title: "Self-Service Customer Portals",
      desc: "Empower your clients to view invoices, manage orders, submit requests, and track project status 24/7 without calling support.",
    },
    {
      title: "Operational Automation",
      desc: "Eliminate repetitive manual data entry by connecting spreadsheets, email forms, and external systems into an automated workflow.",
    },
    {
      title: "Custom Storefronts & Bookings",
      desc: "High-conversion commerce experiences and scheduling applications designed specifically around your unique business operations.",
    },
    {
      title: "Modern Business Websites",
      desc: "Fast, search-optimized web presences engineered with Next.js that communicate brand credibility and drive qualified customer inquiries.",
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Solutions", href: "/solutions" },
            { label: "For Businesses" },
          ]}
        />

        <div className="mb-14 space-y-6">
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
            <Store className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            Established Businesses & Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-[1.15]">
            Digitize your business operations and elevate customer experience
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-3xl">
            Generic off-the-shelf software often forces you to change how your business operates. We build tailored digital systems that conform to your business workflows, saving hours of manual labor every week.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Button href="/contact" size="lg" variant="primary">
              <span>Discuss Business Automation</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button href="/services/web-development" size="lg" variant="secondary">
              <span>Web Applications Scope</span>
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
        title="Ready to automate your business workflows?"
        description="Let's review where manual bottlenecks slow your team down and engineer a custom digital tool."
        primaryCtaText="Get Started"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
