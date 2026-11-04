import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data/storage";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";

export const metadata: Metadata = {
  title: "UI/UX & Product Design",
  description:
    "User research, information architecture, wireframing, interactive prototypes, and production design systems.",
};

export default async function DesignPage() {
  const service = await getServiceBySlug("ui-ux-design");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
