"use client";

import React from "react";
import Link from "next/link";

const AUDIENCE_CARDS = [
  {
    no: "01 / STARTUPS",
    title: "From idea to MVP.",
    desc: "Validate faster, launch with focus and build a foundation that can scale.",
    href: "/solutions/startups",
  },
  {
    no: "02 / BUSINESSES",
    title: "Make operations smarter.",
    desc: "Modernise workflows, connect systems and create better customer experiences.",
    href: "/solutions/businesses",
  },
  {
    no: "03 / ENTERPRISE",
    title: "Bring complexity together.",
    desc: "Build secure, dependable platforms that support teams and processes.",
    href: "/solutions/enterprise",
  },
  {
    no: "04 / FOUNDERS & INDIVIDUALS",
    title: "Build the thing you believe in.",
    desc: "Get a thoughtful technical partner for a personal project or new venture.",
    href: "/solutions/individuals",
  },
];

export function WhatWeBuild() {
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * 3;
    const ry = (x - 0.5) * 4;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <section className="section audience depth-section">
      <div className="wrap">
        <div className="section-top mono">04 / Who we work with</div>
        <div className="section-heading">
          <h2>
            The right build
            <br />
            for <em>your stage.</em>
          </h2>
          <p>
            Whether you are validating an idea or modernising a business-critical system, we shape
            the engagement around your goals.
          </p>
        </div>

        <div className="audience-grid">
          {AUDIENCE_CARDS.map((card) => (
            <Link
              key={card.no}
              href={card.href}
              className="audience-card block group"
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
            >
              <span className="mono group-hover:text-[var(--blue)] transition-colors">
                {card.no}
              </span>
              <h3 className="group-hover:text-[var(--blue)] transition-colors">{card.title}</h3>
              <p>{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
