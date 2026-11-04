"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { X, CheckCircle, ArrowRight, Sparkles } from "lucide-react";

export function ContactPopupModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const hasTriggeredRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mountTimeRef = useRef(Date.now());

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    project_type: "Web Application Development",
    budget_range: "₹25,000 - ₹50,000",
    description: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{ reference_code: string } | null>(null);

  useEffect(() => {
    // Never trigger on admin dashboard or contact page
    if (!pathname || pathname.startsWith("/admin") || pathname === "/contact") {
      return;
    }

    // Reset mount time on path change
    mountTimeRef.current = Date.now();

    // Check if dismissed in this session
    try {
      if (sessionStorage.getItem("cms_contact_popup_dismissed") === "true") {
        return;
      }
    } catch {}

    const triggerPopup = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      setIsOpen(true);
    };

    const handleScroll = () => {
      if (hasTriggeredRef.current) return;

      try {
        if (sessionStorage.getItem("cms_contact_popup_dismissed") === "true") {
          return;
        }
      } catch {}

      // Check if user scrolled at all
      if (window.scrollY > 20) {
        const elapsed = Date.now() - mountTimeRef.current;
        const remaining = Math.max(0, 5000 - elapsed);

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          triggerPopup();
        }, remaining);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [pathname]);

  // Handle escape key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem("cms_contact_popup_dismissed", "true");
    } catch {}
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.full_name || formData.full_name.trim().length < 2) {
      errors.full_name = "Please enter your name.";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.description || formData.description.trim().length < 10) {
      errors.description = "Please provide at least 10 characters describing what you need.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          company_name: "Website Popup Enquiry",
          client_category: "Startup",
          project_type: formData.project_type,
          platform: "Web",
          budget_range: formData.budget_range,
          timeline: "1-2 Months",
          contact_method: "Email",
          privacy_consent: true,
          description: formData.description,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setSubmissionResult({ reference_code: data.reference_code });
    } catch (err: any) {
      setSubmitError(err.message || "Failed to send enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-lg bg-[#0e1620] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200 text-white"
      >
        {/* Close 'X' Button */}
        <button
          onClick={closeModal}
          type="button"
          aria-label="Close contact popup"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#c9e56a] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submissionResult ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Thank You for Reaching Out!</h3>
              <p className="text-xs text-white/70 max-w-xs mx-auto">
                Your enquiry has been securely received. Our engineering team will review your requirements and respond within 24–48 hours.
              </p>
            </div>
            <div className="inline-block p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/60">Reference Code</p>
              <p className="text-sm font-mono font-bold text-[#c9e56a]">{submissionResult.reference_code}</p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Header */}
            <div className="space-y-1.5 pr-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c9e56a]/15 text-[#c9e56a] text-[11px] font-mono uppercase tracking-wider font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Start A Project</span>
              </div>
              <h3 id="modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Let&apos;s build something exceptional.
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Tell us about your digital product or automation idea. An engineer will follow up within 24 to 48 hours.
              </p>
            </div>

            {submitError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {submitError}
              </div>
            )}

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-white/80 mb-1">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jane Doe"
                  value={formData.full_name}
                  onChange={(e) => {
                    setFormData({ ...formData, full_name: e.target.value });
                    if (fieldErrors.full_name) setFieldErrors({ ...fieldErrors, full_name: "" });
                  }}
                  className={`w-full px-3 py-2 text-xs bg-white/5 border rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#c9e56a] transition-colors ${
                    fieldErrors.full_name ? "border-rose-500" : "border-white/15"
                  }`}
                />
                {fieldErrors.full_name && (
                  <p className="text-[10px] text-rose-400 mt-0.5">{fieldErrors.full_name}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-white/80 mb-1">
                  Business Email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
                  }}
                  className={`w-full px-3 py-2 text-xs bg-white/5 border rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#c9e56a] transition-colors ${
                    fieldErrors.email ? "border-rose-500" : "border-white/15"
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-[10px] text-rose-400 mt-0.5">{fieldErrors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-white/80 mb-1">Service / Project</label>
                <select
                  value={formData.project_type}
                  onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#17232f] border border-white/15 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-[#c9e56a]"
                >
                  <option value="Web Application Development">Web Application Development</option>
                  <option value="Mobile Application Development">Mobile Application Development</option>
                  <option value="ERP & CRM Solutions">ERP & CRM Solutions</option>
                  <option value="AI Product Development">AI & Automation</option>
                  <option value="Startup MVP Development">Startup MVP Development</option>
                  <option value="Enterprise Solutions">Enterprise Software</option>
                  <option value="UI/UX Product Design">UI/UX & Product Design</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-white/80 mb-1">Estimated Budget (INR)</label>
                <select
                  value={formData.budget_range}
                  onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#17232f] border border-white/15 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-[#c9e56a]"
                >
                  <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                  <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                  <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                  <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000</option>
                  <option value="₹5,00,000+">₹5,00,000+</option>
                  <option value="Flexible / To Be Scoped">Flexible / To Be Scoped</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-white/80 mb-1">
                Project Overview <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe what you're looking to build or solve..."
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (fieldErrors.description) setFieldErrors({ ...fieldErrors, description: "" });
                }}
                className={`w-full px-3 py-2 text-xs bg-white/5 border rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#c9e56a] transition-colors resize-none ${
                  fieldErrors.description ? "border-rose-500" : "border-white/15"
                }`}
              />
              {fieldErrors.description && (
                <p className="text-[10px] text-rose-400 mt-0.5">{fieldErrors.description}</p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="text-xs text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                Not right now
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#c9e56a] hover:bg-[#d8f07e] text-[#0b1219] font-bold text-xs tracking-tight shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Submit Enquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
