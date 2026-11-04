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
            className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#c9e56a] hover:bg-[#d8f07e] text-[#0b1219] font-semibold text-sm tracking-tight shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
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
