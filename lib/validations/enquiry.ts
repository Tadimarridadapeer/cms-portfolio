import { z } from "zod";

export const enquirySchema = z.object({
  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),
  email: z
    .string()
    .email("Please provide a valid business email address"),
  company_name: z.string().max(100).optional(),
  client_category: z.enum(
    ["Startup", "Enterprise", "Business", "Individual", "Other"],
    {
      required_error: "Please select your client category",
    }
  ),
  project_type: z
    .string()
    .min(2, "Please specify your project type")
    .max(100),
  platform: z.enum(["Web", "Mobile", "Both", "AI", "Not Sure"], {
    required_error: "Please select the target platform",
  }),
  description: z
    .string()
    .min(20, "Please provide at least 20 characters describing your idea or requirements")
    .max(3000, "Description cannot exceed 3000 characters"),
  budget_range: z
    .string()
    .min(1, "Please select an estimated budget range"),
  timeline: z
    .string()
    .min(1, "Please select your target timeline"),
  contact_method: z
    .string()
    .min(1, "Please select a preferred contact method"),
  privacy_consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the privacy policy to proceed" }),
  }),
  meeting_date: z.string().optional().nullable(),
  meeting_time: z.string().optional().nullable(),
  timezone: z.string().optional().nullable(),
  meeting_notes: z.string().max(1000).optional().nullable(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
