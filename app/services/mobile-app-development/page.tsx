import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data/storage";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";

export const metadata: Metadata = {
  title: "Mobile Application Development",
  description:
    "Cross-platform iOS and Android mobile applications built with React Native and Expo.",
};

export default async function MobileDevPage() {
  const service = await getServiceBySlug("mobile-app-development");
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
