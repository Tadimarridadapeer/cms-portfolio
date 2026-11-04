import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data/storage";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";

export const metadata: Metadata = {
  title: "Enterprise Software Solutions",
  description:
    "Internal business applications, secure data platforms, automated workflows, and system modernizations.",
};

export default async function EnterpriseDevPage() {
  const service = await getServiceBySlug("enterprise-solutions");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
