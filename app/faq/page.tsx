import React from "react";
import { Metadata } from "next";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Common questions about our digital product development process, code ownership, project scoping, and technical capabilities.",
};

const FAQS = [
  {
    q: "How does Cross Motive Services price digital product engagements?",
    a: "We structure engagements primarily around milestone-based deliverables or scoped fixed-price phases. Because every digital platform involves distinct integrations, security considerations, and UI complexity, we provide an itemized scoping proposal after an initial discovery discussion rather than generic fixed quotes.",
  },
  {
    q: "Who owns the code and intellectual property once a project is finished?",
    a: "You do. You retain 100% intellectual property ownership of all custom code, design files, architectural documentation, and database schemas created during our engagement upon final delivery.",
  },
  {
    q: "How do you document project architecture and deliverables?",
    a: "Transparency is central to our ethos. Across all our client engagements and case studies, technical specifications, system scopes, and verified deliverables are clearly documented with complete clarity.",
  },
  {
    q: "Can you take over or modernize an existing codebase?",
    a: "Yes. We frequently conduct comprehensive architectural and security audits on existing React, Next.js, Node.js, and Python repositories to assess technical debt, upgrade outdated libraries, and refactor brittle modules.",
  },
  {
    q: "Do you offer post-launch support and ongoing maintenance?",
    a: "Yes. Following launch, we offer structured maintenance retainers for security patches, library upgrades, cloud infrastructure monitoring, and ongoing feature sprints.",
  },
  {
    q: "How do we get started?",
    a: "Submit a project brief through our /contact form or request an initial 30-minute discovery discussion. We will review your requirements, verify feasibility, and schedule an introductory session.",
  },
];

export default function FAQPage() {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Frequently Asked Questions" }]} />

        <div className="mb-14 space-y-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            Clarity & FAQs
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-[1.15]">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-muted leading-relaxed">
            Everything you need to know about how we work, code ownership, project timelines, and engagement structures.
          </p>
        </div>

        <div className="space-y-4 mb-20">
          {FAQS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-surface-card border border-border space-y-2.5 shadow-subtle"
            >
              <h3 className="font-bold text-foreground text-base sm:text-lg flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>{item.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-muted pl-7 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      <CTASection
        title="Still have a question?"
        description="Our engineers are happy to discuss technical details and architectural questions directly."
        primaryCtaText="Contact Us"
        primaryCtaLink="/contact"
      />
    </div>
  );
}
