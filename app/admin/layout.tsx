import React from "react";
import { getAdminSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export const metadata = {
  title: "Admin Dashboard | Cross Motive Services",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {children}
    </div>
  );
}
