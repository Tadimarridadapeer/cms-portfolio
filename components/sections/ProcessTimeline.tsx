"use client";

import React from "react";
import Link from "next/link";

const PROCESS_STEPS = [
  {
    step: "01 — DISCOVER",
    title: "Understand the problem",
    desc: "Align on users, business goals, constraints and what a successful outcome looks like.",
  },
  {
    step: "02 — DEFINE",
    title: "Shape the solution",
    desc: "Map the experience, define the architecture and agree on a practical roadmap.",
  },
  {
    step: "03 — ENGINEER",
    title: "Build with intent",
    desc: "Develop in focused iterations, validate continuously and keep you close to progress.",
  },
  {
    step: "04 — DELIVER",
    title: "Launch and evolve",
    desc: "Prepare for production, support the handover and improve as real usage grows.",
  },
];

export function ProcessTimeline() {
  return (
    <section className="section process depth-section" id="approach">
      <div className="wrap">
        <div className="section-top mono">05 / How we work</div>
        <div className="section-heading">
          <h2>
            Clear steps.
            <br />
            <em>No black boxes.</em>
          </h2>
          <p>
            We keep the process collaborative and transparent, so you know what is happening, why it
            matters and what comes next.
          </p>
        </div>

        <div className="process-grid">
          {PROCESS_STEPS.map((step) => (
            <article key={step.step} className="process-step">
              <span className="step-no">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-end">
          <Link href="/process" className="text-link">
            Learn more about our methodology & sprint cadence ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
