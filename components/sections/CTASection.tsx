"use client";

import React from "react";
import Link from "next/link";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
}

export function CTASection({
  title = "Have a challenge worth solving?",
  description = "Tell us what you want to build, improve or make possible. Let's explore the right way to move it forward.",
  primaryCtaText = "Talk to our team",
  primaryCtaLink = "/contact",
}: CTASectionProps) {
  return (
    <section className="contact" id="contact">
      <div className="wrap contact-inner">
        <div>
          <div className="mono text-white/80">06 / Start a conversation</div>
          <h2>
            Have a challenge
            <br />
            worth <em>solving?</em>
          </h2>
        </div>

        <div className="contact-copy">
          <p>{description}</p>
          <Link
            className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-sm tracking-tight shadow-[0_4px_18px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_26px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
            href={primaryCtaLink}
          >
            <span>{primaryCtaText}</span>
            <span className="text-base font-bold transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
