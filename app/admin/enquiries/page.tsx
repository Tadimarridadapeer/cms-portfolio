import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getEnquiries } from "@/lib/data/storage";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { EnquiryManager } from "@/components/admin/EnquiryManager";

export const revalidate = 0;

export default async function AdminEnquiriesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const enquiries = await getEnquiries();

  return (
    <div className="flex w-full min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title="Lead & Enquiry Management"
          subtitle="Track project enquiries, discovery call requests, and pipeline stages."
        />

        <main className="p-6 sm:p-8 flex-1">
          <EnquiryManager initialEnquiries={enquiries} />
        </main>
      </div>
    </div>
  );
}
