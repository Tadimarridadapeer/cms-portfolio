"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/lib/types";

interface FeaturedProjectsProps {
  initialProjects?: Project[];
  showAllLink?: boolean;
  title?: string;
  subtitle?: string;
}

export function FeaturedProjects({
  initialProjects = [],
  showAllLink = true,
  title = "Built for real business challenges.",
  subtitle = "We work across product types and industries. These are examples of the solution spaces we can help you move forward in.",
}: FeaturedProjectsProps) {
  // Active project for 3D Cube Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<{
    category: string;
    title: string;
    description: string;
    tags: string[];
    slug?: string;
  } | null>(null);

  const openProjectModal = (proj: {
    category: string;
    title: string;
    description: string;
    tags: string[];
    slug?: string;
  }) => {
    setActiveModalProject(proj);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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

  const hasProjects = initialProjects && initialProjects.length > 0;
  const p1 = hasProjects ? initialProjects[0] : null;
  const p2 = hasProjects && initialProjects.length > 1 ? initialProjects[1] : null;
  const p3 = hasProjects && initialProjects.length > 2 ? initialProjects[2] : null;

  return (
    <section className="section work depth-section" id="work">
      <div className="wrap">
        <div className="section-top mono">03 / Where we create impact</div>
        <div className="section-heading">
          <h2>
            {title.includes("challenges") ? (
              <>
                Built for real
                <br />
                <em>business challenges.</em>
              </>
            ) : (
              title
            )}
          </h2>
          <p>{subtitle}</p>
        </div>

        {hasProjects && p1 ? (
          /* Signature Dynamic Projects Grid */
          <div className="work-grid">
            {/* Feature Card 1 */}
            <article
              className="work-feature project-trigger"
              tabIndex={0}
              role="button"
              aria-label={`Open ${p1.title} project details`}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onClick={() =>
                openProjectModal({
                  category: `01 / ${p1.category?.toUpperCase() || "SAAS & DIGITAL PLATFORMS"}`,
                  title: p1.title,
                  description: p1.summary || p1.description,
                  tags: p1.technologies || [],
                  slug: p1.slug,
                })
              }
            >
              <div className="work-label">01 / {p1.category || "Digital Platform"}</div>
              <h3>{p1.title}</h3>
              <p>{p1.summary}</p>
              <div className="screen-ui">
                <div className="screen-head">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="screen-content">
                  <div className="screen-side" />
                  <div className="screen-main">
                    <div className="screen-title" />
                    <div className="screen-cards">
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Right Stack: Secondary Cards */}
            <div className="work-stack">
              {p2 && (
                <article
                  className="work-small project-trigger"
                  tabIndex={0}
                  role="button"
                  aria-label={`Open ${p2.title} project details`}
                  onPointerMove={handlePointerMove}
                  onPointerLeave={handlePointerLeave}
                  onClick={() =>
                    openProjectModal({
                      category: `02 / ${p2.category?.toUpperCase() || "MOBILE PRODUCTS"}`,
                      title: p2.title,
                      description: p2.summary || p2.description,
                      tags: p2.technologies || [],
                      slug: p2.slug,
                    })
                  }
                >
                  <div className="work-label">02 / {p2.category || "Mobile Product"}</div>
                  <h3>{p2.title}</h3>
                  <p>{p2.summary}</p>
                  <div className="mini-phone">
                    <div className="phone-block" />
                    <div className="phone-lines" />
                  </div>
                </article>
              )}

              {p3 && (
                <article
                  className="work-small project-trigger"
                  tabIndex={0}
                  role="button"
                  aria-label={`Open ${p3.title} project details`}
                  onPointerMove={handlePointerMove}
                  onPointerLeave={handlePointerLeave}
                  onClick={() =>
                    openProjectModal({
                      category: `03 / ${p3.category?.toUpperCase() || "ENTERPRISE & OPERATIONS"}`,
                      title: p3.title,
                      description: p3.summary || p3.description,
                      tags: p3.technologies || [],
                      slug: p3.slug,
                    })
                  }
                >
                  <div className="work-label">03 / {p3.category || "Operations"}</div>
                  <h3>{p3.title}</h3>
                  <p>{p3.summary}</p>
                  <div className="dash-mini">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </article>
              )}
            </div>
          </div>
        ) : (
          /* Portfolio Refreshing State */
          <div className="py-16 px-8 rounded-2xl bg-[#141e28] border border-[var(--line)] text-center max-w-3xl mx-auto my-6">
            <div className="mono text-xs text-[var(--blue)] uppercase tracking-wider mb-3">
              PORTFOLIO UPDATE IN PROGRESS
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              New Client Systems &amp; Case Studies Coming Soon
            </h3>
            <p className="text-[#aab6c2] text-sm leading-relaxed max-w-xl mx-auto mb-8">
              We are updating our portfolio with our latest custom ERP &amp; CRM implementations, high-traffic web applications, and enterprise systems. In the meantime, explore our core capabilities or contact our engineering team to review relevant project architectures.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/services" className="btn-primary inline-flex items-center gap-2 text-xs font-bold">
                Explore Core Services <span>↗</span>
              </Link>
              <Link
                href="/contact"
                className="mono inline-flex items-center gap-2 text-xs text-[#aab6c2] hover:text-white px-5 py-3 border border-[var(--line)] rounded-lg transition-colors"
              >
                Request Work References &amp; Case Studies <span>→</span>
              </Link>
            </div>
          </div>
        )}

        {/* View All Projects Portfolio Link */}
        {showAllLink && hasProjects && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-[var(--line)] pt-8 gap-4">
            <div className="mono text-xs text-[#62717c]">
              SHOWCASING {initialProjects.length} PORTFOLIO {initialProjects.length === 1 ? "PROJECT" : "PROJECTS"}
            </div>
            <Link
              href="/work"
              className="btn-primary inline-flex items-center gap-4 text-xs font-bold"
            >
              Explore all {initialProjects.length} portfolio projects <span>↗</span>
            </Link>
          </div>
        )}
      </div>

      {/* 3D Isometric Cube Project Modal */}
      <div
        className={`project-modal ${modalOpen ? "open" : ""}`}
        id="projectModal"
        aria-hidden={!modalOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="projectTitle">
          <div className="project-dialog-head">
            <span>CROSS MOTIVE SERVICES / PROJECT</span>
            <button
              className="project-close"
              id="projectClose"
              aria-label="Close project details"
              onClick={closeModal}
            >
              ×
            </button>
          </div>
          {activeModalProject && (
            <div className="project-dialog-body">
              <div className="mono text-[#667da9]" id="projectCategory">
                {activeModalProject.category}
              </div>
              <h3 id="projectTitle">{activeModalProject.title}</h3>
              <p id="projectDescription">{activeModalProject.description}</p>

              <div className="project-scene">
                <div className="project-cube">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="project-dialog-meta mb-8" id="projectMeta">
                {activeModalProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              {activeModalProject.slug && (
                <div className="pt-4 border-t border-[var(--line)] flex justify-end">
                  <Link
                    href={`/work/${activeModalProject.slug}`}
                    className="btn-primary"
                    onClick={closeModal}
                  >
                    View Full Case Study <span>↗</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
