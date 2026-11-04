import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data/storage";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";

export const metadata: Metadata = {
  title: "Startup MVP Development",
  description:
    "Rapid, high-craft Minimum Viable Products designed to validate core hypotheses, engage early users, and impress investors.",
};

export default async function MVPDevPage() {
  const service = await getServiceBySlug("mvp-development");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
