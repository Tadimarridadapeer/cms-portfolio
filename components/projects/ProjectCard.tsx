import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/types";
import { Badge } from "../ui/Badge";

export function ProjectCard({ project }: { project: Project }) {
  const getEngagementBadgeVariant = (type: string) => {
    switch (type) {
      case "Concept Project":
        return "concept";
      case "Internal Product":
        return "internal";
      case "Work in Progress":
        return "warning";
      case "Client Project":
        return "live";
      default:
        return "default";
    }
  };

  return (
    <article className="group flex flex-col bg-surface-card border border-border rounded-xl overflow-hidden hover:border-accent/40 hover:shadow-card transition-all duration-300">
      {/* Thumbnail Container */}
      <Link href={`/work/${project.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden bg-surface-dark">
        <Image
          src={project.cover_image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge variant={getEngagementBadgeVariant(project.engagement_type)}>
            {project.engagement_type}
          </Badge>
          <Badge variant="outline" className="bg-black/60 backdrop-blur-sm text-white border-white/20">
            {project.category}
          </Badge>
        </div>
      </Link>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-mono text-muted uppercase tracking-wider mb-1">
                {project.project_type}
              </p>
              <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                <Link href={`/work/${project.slug}`}>{project.title}</Link>
              </h3>
            </div>
            <Link
              href={`/work/${project.slug}`}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted group-hover:border-accent group-hover:text-accent transition-colors shrink-0"
              aria-label={`View case study for ${project.title}`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-sm text-muted leading-relaxed line-clamp-2">
            {project.summary}
          </p>

          {/* Key Deliverables/Services */}
          <div className="pt-2">
            <p className="text-[10px] uppercase font-semibold text-muted tracking-wider mb-1.5">
              Services Delivered:
            </p>
            <div className="flex flex-wrap gap-1">
              {project.services.slice(0, 3).map((srv) => (
                <span
                  key={srv}
                  className="text-[11px] px-2 py-0.5 rounded bg-surface-muted text-foreground border border-border/50"
                >
                  {srv}
                </span>
              ))}
              {project.services.length > 3 && (
                <span className="text-[11px] px-1.5 py-0.5 text-muted">
                  +{project.services.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tech Stack Strip & Footer */}
        <div className="pt-5 mt-5 border-t border-border/60 flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <span className="font-mono text-[10px] text-muted shrink-0">Stack:</span>
            <div className="truncate text-[11px] font-medium text-foreground">
              {project.technologies.slice(0, 4).join(" · ")}
            </div>
          </div>
          <span className="text-[11px] font-mono shrink-0 pl-2">
            Status: <span className="font-semibold">{project.status}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
