"use client";

import React from "react";
import Link from "next/link";

const SERVICES_DATA = [
  {
    num: "01 / WEB",
    icon: "⌘",
    title: "Web applications",
    desc: "Scalable platforms, SaaS products, customer portals and custom business applications.",
    href: "/services/web-development",
  },
  {
    num: "02 / MOBILE",
    icon: "▣",
    title: "Mobile applications",
    desc: "Thoughtful iOS and Android products built for performance and everyday use.",
    href: "/services/mobile-app-development",
  },
  {
    num: "03 / ERP & CRM",
    icon: "⊞",
    title: "ERP & CRM Solutions",
    desc: "Custom ERP systems, tailored CRM pipelines, inventory tracking and operational workflow automation.",
    href: "/services/erp-crm-solutions",
  },
  {
    num: "04 / ENTERPRISE",
    icon: "◫",
    title: "Enterprise solutions",
    desc: "Admin systems, CMS platforms, dashboards and enterprise workflow automation.",
    href: "/services/enterprise-solutions",
  },
  {
    num: "05 / INTELLIGENCE",
    icon: "◎",
    title: "AI & automation",
    desc: "Practical AI features and intelligent workflows that improve real products.",
    href: "/services/ai-product-development",
  },
  {
    num: "06 / MVP",
    icon: "⚡",
    title: "Startup MVP development",
    desc: "Rapid, production-ready MVPs built to validate concepts, acquire users, and scale.",
    href: "/services/mvp-development",
  },
  {
    num: "07 / PRODUCT",
    icon: "✳",
    title: "Product design",
    desc: "Research, UX architecture, interface systems and interactive prototypes.",
    href: "/services/ui-ux-design",
  },
  {
    num: "08 / PLATFORM",
    icon: "⌁",
    title: "Backend & cloud",
    desc: "APIs, databases, integrations, cloud infrastructure and secure architecture.",
    href: "/services/enterprise-solutions",
  },
];

const SERVICE_PILLARS = [
  {
    title: "100% IP & Repo Ownership",
    desc: "Complete source code, schemas, and design token transfer with zero vendor lock-in.",
  },
  {
    title: "Bespoke ERP & CRM Workflows",
    desc: "Custom operational software engineered around your logic without recurring per-seat fees.",
  },
  {
    title: "Direct Senior Architect Access",
    desc: "Work directly with full-stack engineers and designers — no middle account layers.",
  },
  {
    title: "Production-Grade Engineering",
    desc: "Type-safe codebases, automated testing, scalable cloud deployment, and strict security.",
  },
];

interface ServicesGridProps {
  showAllButton?: boolean;
}

export function ServicesGrid({ showAllButton }: ServicesGridProps = {}) {
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * 4;
    const ry = (x - 0.5) * 5;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <section className="section services depth-section" id="services">
      <div className="wrap">
        <div className="section-top mono">01 / What we deliver</div>
        <div className="section-heading">
          <h2>
            One partner.
            <br />
            <em>Every layer</em> of digital.
          </h2>
          <p>
            From a focused MVP to a connected enterprise ecosystem, we bring the people and
            capabilities needed to take your product from concept to production.
          </p>
        </div>

        <div className="service-layout">
          <div className="service-intro">
            <h3>Technology should solve the hard parts — not add to them.</h3>
            <p>
              We combine product thinking, considered design and solid engineering to create solutions
              that make a measurable difference to the way you work.
            </p>
            <Link href="/services" className="mono hover:text-[var(--blue)] transition-colors">
              CROSS-FUNCTIONAL BY DESIGN ↗
            </Link>

            {/* Engineering Pillars */}
            <div className="service-pillars">
              {SERVICE_PILLARS.map((p, idx) => (
                <div key={idx} className="service-pillar-item">
                  <span className="service-pillar-icon">✓</span>
                  <div className="service-pillar-body">
                    <strong>{p.title}</strong>
                    <span>{p.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Discovery CTA Box */}
            <div className="service-discovery-card">
              <div className="mono text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider mb-1.5">
                TECHNICAL DISCOVERY
              </div>
              <h4 className="text-sm font-bold text-[#17232f] mb-1.5">
                Have a project or system to modernize?
              </h4>
              <p className="text-xs text-[#75807c] leading-relaxed mb-3.5">
                Speak directly with an architect to review technical feasibility, timeline, and deliverables.
              </p>
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2 text-xs font-bold py-2 px-3.5"
              >
                Schedule Architecture Call <span>↗</span>
              </Link>
            </div>
          </div>

          <div className="service-grid">
            {SERVICES_DATA.map((service) => (
              <Link
                key={service.num}
                href={service.href}
                className="service-card block"
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
              >
                <div className="service-card-top">
                  <span className="service-icon">{service.icon}</span>
                  <span className="num">{service.num}</span>
                </div>
                <h4>{service.title}</h4>
                <p>{service.desc}</p>
                <span className="card-arrow">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
