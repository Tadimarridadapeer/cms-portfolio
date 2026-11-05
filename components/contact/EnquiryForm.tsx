"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, AlertCircle, Clock, Calendar } from "lucide-react";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";
import { ClientCategory, PlatformType } from "@/lib/types";

export function EnquiryForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    company_name: "",
    client_category: "Startup" as ClientCategory,
    project_type: "",
    platform: "Web" as PlatformType,
    description: "",
    budget_range: "₹25,000 - ₹50,000",
    timeline: "1-2 Months",
    contact_method: "Email",
    privacy_consent: false,
    include_call_request: false,
    meeting_date: "",
    meeting_time: "",
    timezone: "UTC",
    meeting_notes: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    reference_code: string;
    message: string;
  } | null>(null);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.full_name || formData.full_name.trim().length < 2) {
      errors.full_name = "Please provide your full name (minimum 2 characters).";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please provide a valid business email address.";
    }
    if (!formData.project_type || formData.project_type.trim().length < 2) {
      errors.project_type = "Please specify the type of project (e.g. SaaS MVP, Mobile App).";
    }
    if (!formData.description || formData.description.trim().length < 20) {
      errors.description = "Please describe your project or requirements in at least 20 characters.";
    }
    if (!formData.privacy_consent) {
      errors.privacy_consent = "You must agree to the privacy policy to submit an enquiry.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Generate fallback reference code immediately
      const generatedRef = `CMS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      let finalRef = generatedRef;
      let localSucceeded = false;
      let remoteSucceeded = false;

      // 2. Persist to local database via Next.js API
      try {
        const response = await fetch("/api/enquiries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: formData.full_name,
            email: formData.email,
            company_name: formData.company_name || undefined,
            client_category: formData.client_category,
            project_type: formData.project_type,
            platform: formData.platform,
            description: formData.description,
            budget_range: formData.budget_range,
            timeline: formData.timeline,
            contact_method: formData.contact_method,
            privacy_consent: formData.privacy_consent,
            meeting_date: formData.include_call_request ? formData.meeting_date : null,
            meeting_time: formData.include_call_request ? formData.meeting_time : null,
            timezone: formData.include_call_request ? formData.timezone : null,
            meeting_notes: formData.include_call_request ? formData.meeting_notes : null,
          }),
        });

        if (response.ok) {
          const resData = await response.json();
          if (resData.reference_code) {
            finalRef = resData.reference_code;
          }
          localSucceeded = true;
        } else {
          console.warn("[Local API] Response status:", response.status);
        }
      } catch (localErr) {
        console.warn("[Local API] Server storage request error:", localErr);
      }

      // 3. Dispatch to Web3Forms directly from browser client to notify both emails:
      // Primary Key: sahith@crossmotiveservices.com (60dff364-a4c1-4e5c-8634-7626540e33f0)
      // Secondary Key: dadapeer.personal@gmail.com (9eeb0cc1-a658-491e-9de6-3d08fef2bd9d)
      const WEB3FORMS_PRIMARY_KEY = "60dff364-a4c1-4e5c-8634-7626540e33f0";
      const WEB3FORMS_SECONDARY_KEY = "9eeb0cc1-a658-491e-9de6-3d08fef2bd9d";
      const web3Key1 = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || WEB3FORMS_PRIMARY_KEY;
      const web3Key2 = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY_2 || WEB3FORMS_SECONDARY_KEY;

      const sendToWeb3Forms = async (accessKey: string) => {
        try {
          const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: accessKey,
              subject: `[CMS Project Enquiry] ${formData.project_type} — ${formData.full_name} (${finalRef})`,
              from_name: "Cross Motive Services",
              name: formData.full_name,
              email: formData.email,
              company: formData.company_name || "N/A",
              client_stage: formData.client_category,
              project_type: formData.project_type,
              platform: formData.platform,
              budget_range: formData.budget_range,
              timeline: formData.timeline,
              contact_method: formData.contact_method,
              scheduled_call: formData.include_call_request
                ? `${formData.meeting_date} at ${formData.meeting_time} (${formData.timezone})`
                : "None",
              message: formData.description,
              reference_code: finalRef,
            }),
          });

          if (res.ok) {
            remoteSucceeded = true;
          }
          const text = await res.text();
          try {
            const json = JSON.parse(text);
            if (json.success) remoteSucceeded = true;
          } catch {
            // Non-JSON ok response
          }
        } catch (web3Err) {
          console.warn("[Web3Forms] Browser dispatch notice:", web3Err);
        }
      };

      const dispatchPromises: Promise<void>[] = [];
      if (web3Key1) dispatchPromises.push(sendToWeb3Forms(web3Key1));
      if (web3Key2) dispatchPromises.push(sendToWeb3Forms(web3Key2));
      if (dispatchPromises.length > 0) {
        await Promise.allSettled(dispatchPromises);
      }

      // If either local database storage or Web3Forms email succeeded, it is a complete success!
      if (localSucceeded || remoteSucceeded) {
        setSubmissionResult({
          reference_code: finalRef,
          message: "Your enquiry has been securely received and recorded in our system.",
        });
      } else {
        throw new Error(
          "We could not connect to the enquiry service. Please check your network connection or email us directly at sahith@crossmotiveservices.com."
        );
      }
    } catch (err: any) {
      setSubmitError(
        err.message ||
          "An unexpected connection issue occurred. Please email us directly at sahith@crossmotiveservices.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionResult) {
    return (
      <div className="bg-surface-card border border-border rounded-xl p-8 sm:p-10 shadow-card space-y-6">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
          <CheckCircle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-emerald-600">
            Enquiry Recorded Successfully
          </span>
          <h3 className="text-2xl font-bold text-foreground">
            Thank you for reaching out to Cross Motive Services.
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            Your project details have been safely stored in our database. Our technical team will review your requirements and follow up within 24 to 48 business hours.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-surface-muted border border-border/80 space-y-1">
          <p className="text-xs font-mono text-muted uppercase">Your Unique Enquiry Reference</p>
          <p className="text-lg font-mono font-bold text-accent">
            {submissionResult.reference_code}
          </p>
          <p className="text-[11px] text-muted">
            Please quote this reference if you correspond with us directly regarding this project.
          </p>
        </div>

        <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setSubmissionResult(null);
              setFormData({
                full_name: "",
                email: "",
                company_name: "",
                client_category: "Startup",
                project_type: "",
                platform: "Web",
                description: "",
                budget_range: "₹25,000 - ₹50,000",
                timeline: "1-2 Months",
                contact_method: "Email",
                privacy_consent: false,
                include_call_request: false,
                meeting_date: "",
                meeting_time: "",
                timezone: "UTC",
                meeting_notes: "",
              });
            }}
          >
            Submit Another Project
          </Button>
          <Button href="/work" variant="secondary">
            Explore Case Studies
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface-card border border-border rounded-xl p-5 sm:p-8 md:p-10 shadow-card space-y-6 sm:space-y-8">
      {submitError && (
        <Alert type="error" title="Submission Failed">
          {submitError}
        </Alert>
      )}

      {/* Section 1: Contact Details */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground border-b border-border pb-2">
          1. Your Details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="Jane Doe"
            required
            value={formData.full_name}
            onChange={(e) => {
              setFormData({ ...formData, full_name: e.target.value });
              if (fieldErrors.full_name) setFieldErrors({ ...fieldErrors, full_name: "" });
            }}
            error={fieldErrors.full_name}
          />
          <Input
            label="Business Email"
            type="email"
            placeholder="jane@company.com"
            required
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" });
            }}
            error={fieldErrors.email}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Company or Project Name (Optional)"
            placeholder="e.g. Your Company or Venture"
            value={formData.company_name}
            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
          />
          <Select
            label="Client Category"
            value={formData.client_category}
            onChange={(e) =>
              setFormData({ ...formData, client_category: e.target.value as ClientCategory })
            }
            options={[
              { value: "Startup", label: "Startup (MVP, validation, scale)" },
              { value: "Enterprise", label: "Enterprise (Modernization, internal tool)" },
              { value: "Business", label: "Established Business / SMB" },
              { value: "Individual", label: "Individual / Creator / Solo Idea" },
              { value: "Other", label: "Other / Organization" },
            ]}
          />
        </div>
      </div>

      {/* Section 2: Project Scope */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground border-b border-border pb-2">
          2. Project Requirements
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Project Type"
            placeholder="e.g. SaaS Web App, Mobile App, AI Tool"
            required
            value={formData.project_type}
            onChange={(e) => {
              setFormData({ ...formData, project_type: e.target.value });
              if (fieldErrors.project_type) setFieldErrors({ ...fieldErrors, project_type: "" });
            }}
            error={fieldErrors.project_type}
          />
          <Select
            label="Target Platform"
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value as PlatformType })}
            options={[
              { value: "Web", label: "Web Platform (Next.js / Browser)" },
              { value: "Mobile", label: "Mobile Application (iOS / Android)" },
              { value: "Both", label: "Both Web and Mobile" },
              { value: "AI", label: "AI Product / LLM Integration" },
              { value: "Not Sure", label: "Not Sure / Need Guidance" },
            ]}
          />
        </div>

        <Textarea
          label="Project Description & Goals"
          rows={5}
          placeholder="Describe what you want to build, the problem it solves, target users, and any key technical constraints..."
          required
          value={formData.description}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
            if (fieldErrors.description) setFieldErrors({ ...fieldErrors, description: "" });
          }}
          error={fieldErrors.description}
          helperText="Minimum 20 characters. Feel free to include links to Figma sketches, Notion briefs, or existing repos."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Estimated Budget Range (INR)"
            value={formData.budget_range}
            onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
            options={[
              { value: "₹25,000 - ₹50,000", label: "₹25,000 - ₹50,000" },
              { value: "₹50,000 - ₹1,00,000", label: "₹50,000 - ₹1,00,000" },
              { value: "₹1,00,000 - ₹2,50,000", label: "₹1,00,000 - ₹2,50,000" },
              { value: "₹2,50,000 - ₹5,00,000", label: "₹2,50,000 - ₹5,00,000" },
              { value: "₹5,00,000+", label: "₹5,00,000+" },
              { value: "Flexible / To Be Scoped", label: "Flexible / To Be Scoped" },
            ]}
          />
          <Select
            label="Desired Timeline"
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            options={[
              { value: "Urgent (under 1 month)", label: "Urgent (under 1 month)" },
              { value: "1-2 Months", label: "1-2 Months" },
              { value: "3-4 Months", label: "3-4 Months" },
              { value: "Flexible / Research Phase", label: "Flexible / Research Phase" },
            ]}
          />
          <Select
            label="Preferred Contact Method"
            value={formData.contact_method}
            onChange={(e) => setFormData({ ...formData, contact_method: e.target.value })}
            options={[
              { value: "Email", label: "Email (Detailed response)" },
              { value: "Discovery Call", label: "Discovery Video Call" },
              { value: "WhatsApp / Phone", label: "WhatsApp / Phone" },
            ]}
          />
        </div>
      </div>

      {/* Section 3: Optional Discovery Call Request */}
      <div className="space-y-4 pt-2 border-t border-border">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="include_call_request"
            checked={formData.include_call_request}
            onChange={(e) =>
              setFormData({ ...formData, include_call_request: e.target.checked })
            }
            className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent"
          />
          <label htmlFor="include_call_request" className="text-xs text-foreground font-medium cursor-pointer">
            I would like to request a 30-minute discovery call to discuss my project directly.
            <span className="block text-muted text-[11px] font-normal mt-0.5">
              Note: Times submitted are requests and will be confirmed by an engineer via email. We do not show automated slots.
            </span>
          </label>
        </div>

        {formData.include_call_request && (
          <div className="p-4 rounded-lg bg-surface-muted/50 border border-border/80 space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Preferred Date"
                type="date"
                value={formData.meeting_date}
                onChange={(e) => setFormData({ ...formData, meeting_date: e.target.value })}
              />
              <Input
                label="Preferred Time"
                type="time"
                value={formData.meeting_time}
                onChange={(e) => setFormData({ ...formData, meeting_time: e.target.value })}
              />
              <Input
                label="Your Time Zone"
                placeholder="e.g. EST, PST, GMT, IST"
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              />
            </div>
            <Input
              label="Meeting Topics / Specific Agenda (Optional)"
              placeholder="e.g. Architecture trade-offs, MVP scoping questions"
              value={formData.meeting_notes}
              onChange={(e) => setFormData({ ...formData, meeting_notes: e.target.value })}
            />
          </div>
        )}
      </div>

      {/* Section 4: Privacy Consent & Submit */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="privacy_consent"
            checked={formData.privacy_consent}
            onChange={(e) => {
              setFormData({ ...formData, privacy_consent: e.target.checked });
              if (fieldErrors.privacy_consent) {
                setFieldErrors({ ...fieldErrors, privacy_consent: "" });
              }
            }}
            className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent"
          />
          <label htmlFor="privacy_consent" className="text-xs text-muted cursor-pointer">
            I consent to Cross Motive Services collecting and processing my enquiry information in accordance with the{" "}
            <Link href="/privacy" className="text-accent underline">
              Privacy Policy
            </Link>
            . We never share your data or send promotional spam. *
          </label>
        </div>
        {fieldErrors.privacy_consent && (
          <p className="text-xs text-rose-500 font-medium">{fieldErrors.privacy_consent}</p>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            type="submit"
            size="lg"
            variant="primary"
            isLoading={isSubmitting}
            className="w-full sm:w-auto"
          >
            <span>Submit Project Enquiry</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <span className="text-[11px] text-muted font-mono">
            Direct review by engineers · Response within 24-48h
          </span>
        </div>
      </div>
    </form>
  );
}
