import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data/storage";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";

export const metadata: Metadata = {
  title: "AI Product Development",
  description:
    "AI-powered features, intelligent workflows, retrieval-augmented generation (RAG), and custom LLM integrations.",
};

export default async function AIDevPage() {
  const service = await getServiceBySlug("ai-product-development");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
