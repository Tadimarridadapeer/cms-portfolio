"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2, ArrowUpRight } from "lucide-react";
import { Project, ProjectCategory, ClientType, EngagementType, ProjectStatus, ProjectVisibility } from "@/lib/types";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";

interface ProjectFormProps {
  initialData?: Project;
  isEdit?: boolean;
}

export function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    summary: initialData?.summary || "",
    description: initialData?.description || "",
    category: (initialData?.category || "Web Applications") as ProjectCategory,
    project_type: initialData?.project_type || "SaaS Platform",
    client_type: (initialData?.client_type || "Startup") as ClientType,
    engagement_type: (initialData?.engagement_type || "Concept Project") as EngagementType,
    status: (initialData?.status || "In Progress") as ProjectStatus,
    visibility: (initialData?.visibility || "Public") as ProjectVisibility,
    servicesText: initialData?.services.join(", ") || "Web Application Development, UI/UX and Product Design",
    technologiesText: initialData?.technologies.join(", ") || "Next.js, TypeScript, Tailwind CSS, PostgreSQL",
    cover_image: initialData?.cover_image || "",
    problem: initialData?.problem || "",
    solution: initialData?.solution || "",
    featuresText: initialData?.features.join("\n") || "Feature 1\nFeature 2\nFeature 3",
    architecture: initialData?.architecture || "",
    challenges: initialData?.challenges || "",
    outcomes: initialData?.outcomes || "",
    outcomes_verified: initialData?.outcomes_verified ?? false,
    target_audience: initialData?.target_audience || "Founders, teams, and users.",
    design_approach: initialData?.design_approach || "Clean editorial typography with accessible hierarchy.",
    learnings_and_next_steps: initialData?.learnings_and_next_steps || "Refining performance under concurrent load.",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      // Auto-generate slug if new project
      slug: !isEdit
        ? val
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")
        : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const services = formData.servicesText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const technologies = formData.technologiesText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const features = formData.featuresText
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title,
        slug: formData.slug,
        summary: formData.summary,
        description: formData.description,
        category: formData.category,
        project_type: formData.project_type,
        client_type: formData.client_type,
        engagement_type: formData.engagement_type,
        status: formData.status,
        visibility: formData.visibility,
        services,
        technologies,
        cover_image: formData.cover_image,
        gallery: initialData?.gallery || [formData.cover_image],
        problem: formData.problem,
        solution: formData.solution,
        features: features.length > 0 ? features : ["Core functional platform"],
        architecture: formData.architecture,
        challenges: formData.challenges,
        outcomes: formData.outcomes,
        outcomes_verified: formData.outcomes_verified,
        target_audience: formData.target_audience,
        product_objectives: initialData?.product_objectives || [
          "Validate core product workflow",
          "Deliver responsive, high-performance UI",
        ],
        scope_of_work: services,
        design_approach: formData.design_approach,
        learnings_and_next_steps: formData.learnings_and_next_steps,
        published_at: initialData?.published_at || new Date().toISOString(),
      };

      const endpoint = isEdit && initialData
        ? `/api/projects/${initialData.id}`
        : "/api/projects";

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || "Failed to save project");
      }

      setSuccess("Project successfully saved!");
      setTimeout(() => {
        router.push("/admin/projects");
        router.refresh();
      }, 800);
    } catch (err: any) {
      setError(err.message || "Failed to save project");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData) return;
    if (!confirm(`Are you sure you want to permanently delete "${initialData.title}"?`)) return;

    try {
      setIsLoading(true);
      const res = await fetch(`/api/projects/${initialData.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Error deleting project");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <Button href="/admin/projects" variant="outline" size="sm">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Back to Projects</span>
        </Button>

        <div className="flex items-center gap-3">
          {isEdit && initialData && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="text-rose-500 hover:bg-rose-500/10 border-rose-500/30"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              <span>Delete</span>
            </Button>
          )}

          <Button type="submit" size="sm" variant="primary" isLoading={isLoading}>
            <Save className="w-3.5 h-3.5 mr-1.5" />
            <span>{isEdit ? "Update Project" : "Publish Project"}</span>
          </Button>
        </div>
      </div>

      {error && <Alert type="error">{error}</Alert>}
      {success && <Alert type="success">{success}</Alert>}

      {/* Basic Metadata */}
      <div className="p-6 rounded-xl bg-surface-card border border-border space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
          1. Basic Project Identity
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Project Title"
            required
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          <Input
            label="URL Slug (lowercase-hyphens)"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
        </div>

        <Textarea
          label="One-Sentence Summary"
          rows={2}
          required
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          helperText="Displayed on cards and meta descriptions."
        />

        <Textarea
          label="Full Context / Description"
          rows={4}
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      {/* Classification & Status */}
      <div className="p-6 rounded-xl bg-surface-card border border-border space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
          2. Classification & Transparency Status
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Portfolio Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
            options={[
              { value: "Web Applications", label: "Web Applications" },
              { value: "Mobile Apps", label: "Mobile Apps" },
              { value: "AI Products", label: "AI Products" },
              { value: "SaaS", label: "SaaS" },
              { value: "Enterprise Systems", label: "Enterprise Systems" },
              { value: "UI/UX Design", label: "UI/UX Design" },
            ]}
          />

          <Select
            label="Engagement Classification"
            value={formData.engagement_type}
            onChange={(e) => setFormData({ ...formData, engagement_type: e.target.value as EngagementType })}
            options={[
              { value: "Concept Project", label: "Concept Project (Proposed)" },
              { value: "Internal Product", label: "Internal Product (CMS build)" },
              { value: "Work in Progress", label: "Work in Progress" },
              { value: "Client Project", label: "Client Project (Only if verified)" },
            ]}
          />

          <Select
            label="Client Type"
            value={formData.client_type}
            onChange={(e) => setFormData({ ...formData, client_type: e.target.value as ClientType })}
            options={[
              { value: "Startup", label: "Startup" },
              { value: "Enterprise", label: "Enterprise" },
              { value: "Business", label: "Business / SMB" },
              { value: "Individual", label: "Individual / Creator" },
              { value: "Internal", label: "Internal" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Project Type Tag"
            placeholder="e.g. AI Styling Assistant"
            value={formData.project_type}
            onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
          />

          <Select
            label="Lifecycle Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
            options={[
              { value: "Draft", label: "Draft (Hidden from public)" },
              { value: "In Progress", label: "In Progress" },
              { value: "Live", label: "Live" },
              { value: "Archived", label: "Archived" },
            ]}
          />

          <Select
            label="Visibility"
            value={formData.visibility}
            onChange={(e) => setFormData({ ...formData, visibility: e.target.value as ProjectVisibility })}
            options={[
              { value: "Public", label: "Public" },
              { value: "Unlisted", label: "Unlisted" },
              { value: "Private", label: "Private" },
            ]}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="outcomes_verified"
            checked={formData.outcomes_verified}
            onChange={(e) => setFormData({ ...formData, outcomes_verified: e.target.checked })}
            className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
          />
          <label htmlFor="outcomes_verified" className="text-xs text-foreground font-medium cursor-pointer">
            Verified Commercial Outcome (Leave unchecked for concept or internal prototypes to prevent false claims)
          </label>
        </div>
      </div>

      {/* Tech Stack & Assets */}
      <div className="p-6 rounded-xl bg-surface-card border border-border space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
          3. Tech Stack & Media
        </h3>

        <Input
          label="Services (Comma separated)"
          value={formData.servicesText}
          onChange={(e) => setFormData({ ...formData, servicesText: e.target.value })}
          helperText="e.g. Web Application Development, UI/UX and Product Design, Cloud Architecture"
        />

        <Input
          label="Technologies (Comma separated)"
          value={formData.technologiesText}
          onChange={(e) => setFormData({ ...formData, technologiesText: e.target.value })}
          helperText="e.g. Next.js, TypeScript, PostgreSQL, Prisma ORM, Tailwind CSS"
        />

        <Input
          label="Cover Image Path or URL"
          value={formData.cover_image}
          onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
          helperText="e.g. /images/projects/project-cover.svg or https://..."
        />
      </div>

      {/* Case Study Details */}
      <div className="p-6 rounded-xl bg-surface-card border border-border space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
          4. Detailed Case Study Content
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Textarea
            label="Problem Statement"
            rows={3}
            value={formData.problem}
            onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
          />
          <Textarea
            label="Solution Statement"
            rows={3}
            value={formData.solution}
            onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
          />
        </div>

        <Textarea
          label="Main Features (One per line)"
          rows={4}
          value={formData.featuresText}
          onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
        />

        <Textarea
          label="Technical Architecture"
          rows={3}
          value={formData.architecture}
          onChange={(e) => setFormData({ ...formData, architecture: e.target.value })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Textarea
            label="Challenges & Trade-offs"
            rows={3}
            value={formData.challenges}
            onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
          />
          <Textarea
            label="Outcomes / Current Delivery Status"
            rows={3}
            value={formData.outcomes}
            onChange={(e) => setFormData({ ...formData, outcomes: e.target.value })}
          />
        </div>
      </div>
    </form>
  );
}
