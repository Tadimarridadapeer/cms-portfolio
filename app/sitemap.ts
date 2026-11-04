import { MetadataRoute } from "next";
import { getProjects, getServices } from "@/lib/data/storage";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://crossmotiveservices.com";
  const now = new Date();

  // Core static routes
  const staticRoutes = [
    "",
    "/work",
    "/services",
    "/services/web-development",
    "/services/mobile-app-development",
    "/services/erp-crm-solutions",
    "/services/ai-product-development",
    "/services/ui-ux-design",
    "/services/enterprise-solutions",
    "/services/mvp-development",
    "/solutions",
    "/solutions/startups",
    "/solutions/enterprise",
    "/solutions/businesses",
    "/solutions/individuals",
    "/technologies",
    "/process",
    "/about",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.9 : 0.8,
  }));

  // Dynamic projects routes
  const projects = await getProjects(false);
  const projectRoutes = projects.map((proj) => ({
    url: `${baseUrl}/work/${proj.slug}`,
    lastModified: new Date(proj.updated_at || proj.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...projectRoutes];
}
