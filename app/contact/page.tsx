import React from "react";
import { Metadata } from "next";
import { Mail, Clock, ShieldCheck, MessageSquare, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EnquiryForm } from "@/components/contact/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact Us & Project Enquiry",
  description:
    "Start a project or request a discovery call with Cross Motive Services. Share your timeline, budget, and requirements for a direct engineer response.",
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Contact & Project Enquiry" }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
                Start The Dialogue
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-[1.15]">
                Let&apos;s build something exceptional.
              </h1>
              <p className="text-base text-muted leading-relaxed">
                Tell us about the digital platform, MVP, mobile app, or automation system you are planning. Every submission is reviewed directly by our technical leads.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-surface-card border border-border flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-muted font-semibold">
                    Direct Email
                  </h4>
                  <a
                    href="mailto:sahith@crossmotiveservices.com"
                    className="text-sm font-bold text-foreground hover:text-accent transition-colors mt-0.5 block break-all"
                  >
                    sahith@crossmotiveservices.com
                  </a>
                  <p className="text-xs text-muted mt-1">
                    Send detailed RFPs, requirements decks, or brief specifications.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-surface-card border border-border flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-muted font-semibold">
                    Turnaround Commitment
                  </h4>
                  <p className="text-sm font-bold text-foreground mt-0.5">
                    Within 24 to 48 business hours
                  </p>
                  <p className="text-xs text-muted mt-1">
                    You receive an initial technical assessment and scoping availability.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-surface-card border border-border flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-muted font-semibold">
                    Privacy & Confidentiality
                  </h4>
                  <p className="text-sm font-bold text-foreground mt-0.5">
                    100% Confidential
                  </p>
                  <p className="text-xs text-muted mt-1">
                    We never sell personal details or share project scopes without explicit authorization.
                  </p>
                </div>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="p-6 rounded-xl bg-surface-muted border border-border/80 space-y-3">
              <h4 className="text-xs uppercase font-mono font-bold text-foreground tracking-wider">
                What happens after you submit:
              </h4>
              <ol className="space-y-2 text-xs text-muted list-decimal list-inside">
                <li>Your submission is assigned a unique reference code.</li>
                <li>A technical architect reviews your goals and platform constraints.</li>
                <li>We schedule an intro discovery call or provide an initial scope breakdown.</li>
              </ol>
            </div>
          </div>

          {/* Right Column: Full Enquiry Form */}
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
