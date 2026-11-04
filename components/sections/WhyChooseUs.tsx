import React from "react";
import { Check, ShieldCheck, Target, GitPullRequest, Code2, Users2, Layers } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";

const PRINCIPLES = [
  {
    icon: Target,
    title: "Product thinking before coding",
    description:
      "We interrogate the core business problem and user incentives before writing a single line of code, preventing costly pivots and unnecessary features.",
  },
  {
    icon: GitPullRequest,
    title: "Design and engineering working together",
    description:
      "Our UI/UX designers and full-stack software engineers collaborate from day one, ensuring aesthetic elegance aligns seamlessly with technical feasibility.",
  },
  {
    icon: ShieldCheck,
    title: "Clear scope & realistic communication",
    description:
      "We believe in candid discussions about timelines, trade-offs, and technical debt. No surprise scope creep or unfulfillable delivery promises.",
  },
  {
    icon: Code2,
    title: "Practical, scalable architecture",
    description:
      "We build with clean TypeScript abstractions and standard relational models that give you speed today without forcing a total rewrite tomorrow.",
  },
  {
    icon: Users2,
    title: "Transparent delivery milestones",
    description:
      "You receive regular staging previews, sprint demos, and direct access to task tracking so you always know exactly what is in progress.",
  },
  {
    icon: Layers,
    title: "Testing & maintainable codebases",
    description:
      "We deliver thoroughly documented codebases with automated checks, clean repository structures, and easy-to-follow developer setup guides.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-[#F7F7F5] dark:bg-[#101114] border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Cross Motive Services"
          title="Engineering clarity over agency fluff"
          description="We are not a high-volume agency outsourcing your code to anonymous contractors. We are a deliberate product studio focused on craftsmanship, honest communication, and solid execution."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRINCIPLES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-surface-card border border-border rounded-xl p-6 hover:shadow-subtle transition-all"
              >
                <div className="w-9 h-9 rounded-md bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
