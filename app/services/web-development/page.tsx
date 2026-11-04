import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data/storage";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";

export const metadata: Metadata = {
  title: "Web Application Development",
  description:
    "Modern web applications, SaaS platforms, customer portals, and internal tools engineered with Next.js, React, and TypeScript.",
};

export default async function WebDevPage() {
  const service = await getServiceBySlug("web-development");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
