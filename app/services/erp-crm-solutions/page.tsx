import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data/storage";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";

export const metadata: Metadata = {
  title: "ERP & CRM Solutions",
  description:
    "Custom ERP systems, tailored CRM platforms, workflow automation, and centralized data pipelines built for enterprise operations.",
};

export const revalidate = 60;

export default async function ErpCrmSolutionsPage() {
  const service = await getServiceBySlug("erp-crm-solutions");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
