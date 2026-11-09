export type ProjectCategory =
  | "All"
  | "Web Applications"
  | "Mobile Apps"
  | "AI Products"
  | "SaaS"
  | "Enterprise Systems"
  | "UI/UX Design";

export type ProjectStatus = "Draft" | "In Progress" | "Live" | "Archived";
export type ProjectVisibility = "Public" | "Unlisted" | "Private";

export type EngagementType =
  | "Concept Project"
  | "Internal Product"
  | "Work in Progress"
  | "Client Project";

export type ClientType =
  | "Startup"
  | "Enterprise"
  | "Business"
  | "Individual"
  | "Internal";

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: ProjectCategory;
  project_type: string;
  client_type: ClientType;
  engagement_type: EngagementType;
  status: ProjectStatus;
  visibility: ProjectVisibility;
  services: string[];
  technologies: string[];
  cover_image: string;
  gallery: string[];
  live_url?: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  challenges: string;
  outcomes: string;
  outcomes_verified: boolean;
  target_audience: string;
  product_objectives: string[];
  scope_of_work: string[];
  design_approach: string;
  learnings_and_next_steps: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  deliverables: string[];
  use_cases: string[];
  technologies: string[];
  faq: ServiceFAQ[];
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type TechCategory =
  | "Frontend"
  | "Mobile"
  | "Backend"
  | "Databases"
  | "AI & Integrations"
  | "Cloud & DevOps"
  | "Design & Product";

export interface Technology {
  id: string;
  name: string;
  category: TechCategory;
  description: string;
  website_url?: string;
  display_order: number;
  is_published: boolean;
}

export type EnquiryStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal Sent"
  | "Won"
  | "Lost";

export type ClientCategory =
  | "Startup"
  | "Enterprise"
  | "Business"
  | "Individual"
  | "Other";

export type PlatformType = "Web" | "Mobile" | "Both" | "AI" | "Not Sure";

export interface Enquiry {
  id: string;
  reference_code: string;
  full_name: string;
  email: string;
  company_name?: string;
  client_category: ClientCategory;
  project_type: string;
  platform: PlatformType;
  description: string;
  budget_range: string;
  timeline: string;
  contact_method: string;
  status: EnquiryStatus;
  privacy_consent: boolean;
  meeting_date?: string | null;
  meeting_time?: string | null;
  timezone?: string | null;
  meeting_notes?: string | null;
  admin_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  company_name: string;
  tagline: string;
  supporting_message: string;
  email: string;
  phone?: string;
  location: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  updated_at: string;
}
