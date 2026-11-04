"use client";

import React, { useState } from "react";
import { Enquiry, EnquiryStatus } from "@/lib/types";
import { Badge } from "../ui/Badge";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { Clock, Mail, Calendar, MessageSquare, Building2, Layers, DollarSign } from "lucide-react";

export function EnquiryManager({ initialEnquiries }: { initialEnquiries: Enquiry[] }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(
    initialEnquiries[0] || null
  );
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [adminNotes, setAdminNotes] = useState<string>(selectedEnquiry?.admin_notes || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const filtered = enquiries.filter(
    (e) => statusFilter === "All" || e.status === statusFilter
  );

  const handleStatusChange = async (newStatus: EnquiryStatus) => {
    if (!selectedEnquiry) return;
    setIsUpdating(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedEnquiry.id,
          status: newStatus,
          admin_notes: adminNotes,
        }),
      });

      const updated = await res.json();
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === updated.id ? updated : e))
        );
        setSelectedEnquiry(updated);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setIsUpdating(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedEnquiry.id,
          status: selectedEnquiry.status,
          admin_notes: adminNotes,
        }),
      });
      const updated = await res.json();
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === updated.id ? updated : e))
        );
        setSelectedEnquiry(updated);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border text-xs">
        {["All", "New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === s
                ? "bg-accent text-white"
                : "bg-surface-card text-muted hover:text-foreground border border-border"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: List */}
        <div className="lg:col-span-5 bg-surface-card border border-border rounded-xl overflow-hidden divide-y divide-border/60 max-h-[800px] overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((enq) => {
              const isSelected = selectedEnquiry?.id === enq.id;
              return (
                <div
                  key={enq.id}
                  onClick={() => {
                    setSelectedEnquiry(enq);
                    setAdminNotes(enq.admin_notes || "");
                  }}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected ? "bg-accent/10 border-l-4 border-l-accent" : "hover:bg-surface-muted/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-accent">
                      {enq.reference_code}
                    </span>
                    <Badge
                      size="sm"
                      variant={
                        enq.status === "New"
                          ? "warning"
                          : enq.status === "Won"
                          ? "live"
                          : "default"
                      }
                    >
                      {enq.status}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-foreground text-sm">{enq.full_name}</h4>
                  <p className="text-xs text-muted truncate">{enq.project_type}</p>
                  <div className="flex items-center justify-between text-[11px] text-muted mt-2 pt-2 border-t border-border/40 font-mono">
                    <span>{enq.client_category}</span>
                    <span>{new Date(enq.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-muted">
              No enquiries match the selected filter.
            </div>
          )}
        </div>

        {/* Right: Detail View */}
        <div className="lg:col-span-7">
          {selectedEnquiry ? (
            <div className="bg-surface-card border border-border rounded-xl p-6 sm:p-8 space-y-6 shadow-subtle">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <span className="font-mono text-xs text-muted uppercase">
                    Enquiry Reference: <strong className="text-accent">{selectedEnquiry.reference_code}</strong>
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mt-0.5">
                    {selectedEnquiry.full_name}
                  </h3>
                  <p className="text-xs text-muted font-mono">{selectedEnquiry.email}</p>
                </div>

                {/* Status Updater */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted font-semibold block">
                    Update Pipeline Status
                  </label>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => handleStatusChange(e.target.value as EnquiryStatus)}
                    disabled={isUpdating}
                    className="text-xs px-3 py-1.5 rounded-md bg-surface-muted border border-border font-semibold text-foreground focus:ring-1 focus:ring-accent"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-surface-muted/50 border border-border/60">
                  <span className="text-[10px] font-mono text-muted uppercase block">Client Category</span>
                  <span className="font-semibold text-foreground">{selectedEnquiry.client_category}</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-muted/50 border border-border/60">
                  <span className="text-[10px] font-mono text-muted uppercase block">Target Platform</span>
                  <span className="font-semibold text-foreground">{selectedEnquiry.platform}</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-muted/50 border border-border/60">
                  <span className="text-[10px] font-mono text-muted uppercase block">Budget</span>
                  <span className="font-semibold text-foreground">{selectedEnquiry.budget_range}</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-muted/50 border border-border/60">
                  <span className="text-[10px] font-mono text-muted uppercase block">Timeline</span>
                  <span className="font-semibold text-foreground">{selectedEnquiry.timeline}</span>
                </div>
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
                  Project Description & Goals
                </h4>
                <div className="p-4 rounded-lg bg-surface-muted/40 border border-border/60 text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.description}
                </div>
              </div>

              {/* Discovery Call Request (if included) */}
              {selectedEnquiry.meeting_date && (
                <div className="p-4 rounded-lg bg-accent/5 border border-accent/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-accent">
                    <Calendar className="w-4 h-4" />
                    <span>Requested Discovery Call Time</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-muted block">Date</span>
                      <span className="font-semibold">{selectedEnquiry.meeting_date}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted block">Time</span>
                      <span className="font-semibold">{selectedEnquiry.meeting_time}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted block">Timezone</span>
                      <span className="font-semibold">{selectedEnquiry.timezone}</span>
                    </div>
                  </div>
                  {selectedEnquiry.meeting_notes && (
                    <p className="text-xs text-muted pt-1 border-t border-accent/10">
                      Notes: {selectedEnquiry.meeting_notes}
                    </p>
                  )}
                </div>
              )}

              {/* Admin Internal Notes */}
              <div className="space-y-2 pt-2 border-t border-border">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
                  Internal Engineering Notes
                </h4>
                <textarea
                  rows={3}
                  placeholder="Record follow-up notes, call summaries, or next sprint allocations..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full p-3 text-xs rounded-md bg-surface-light border border-border text-foreground focus:ring-1 focus:ring-accent"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSaveNotes}
                  isLoading={isUpdating}
                >
                  Save Notes
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-muted bg-surface-card border border-border rounded-xl">
              Select an enquiry on the left to view full requirements.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
