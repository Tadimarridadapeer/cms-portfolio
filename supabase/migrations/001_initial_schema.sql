-- ====================================================================
-- Cross Motive Services — Production Database Schema Migration
-- Compatible with Supabase PostgreSQL
-- ====================================================================

-- 1. Create Enums
CREATE TYPE project_status AS ENUM ('Draft', 'In Progress', 'Live', 'Archived');
CREATE TYPE project_visibility AS ENUM ('Public', 'Unlisted', 'Private');
CREATE TYPE engagement_type AS ENUM ('Concept Project', 'Internal Product', 'Work in Progress', 'Client Project');
CREATE TYPE enquiry_status AS ENUM ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost');

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  project_type TEXT NOT NULL,
  client_type TEXT NOT NULL,
  engagement_type engagement_type NOT NULL DEFAULT 'Concept Project',
  status project_status NOT NULL DEFAULT 'In Progress',
  visibility project_visibility NOT NULL DEFAULT 'Public',
  services JSONB NOT NULL DEFAULT '[]'::jsonb,
  technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
  cover_image TEXT NOT NULL,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  problem TEXT NOT NULL,
  solution TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  architecture TEXT NOT NULL,
  challenges TEXT NOT NULL,
  outcomes TEXT NOT NULL,
  outcomes_verified BOOLEAN NOT NULL DEFAULT FALSE,
  target_audience TEXT NOT NULL DEFAULT '',
  product_objectives JSONB NOT NULL DEFAULT '[]'::jsonb,
  scope_of_work JSONB NOT NULL DEFAULT '[]'::jsonb,
  design_approach TEXT NOT NULL DEFAULT '',
  learnings_and_next_steps TEXT NOT NULL DEFAULT '',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

-- 3. Services Table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
  use_cases JSONB NOT NULL DEFAULT '[]'::jsonb,
  technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
  faq JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);

-- 4. Technologies Table
CREATE TABLE IF NOT EXISTS technologies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  website_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_technologies_category ON technologies(category);

-- 5. Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  reference_code TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  client_category TEXT NOT NULL,
  project_type TEXT NOT NULL,
  platform TEXT NOT NULL,
  description TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  timeline TEXT NOT NULL,
  contact_method TEXT NOT NULL,
  status enquiry_status NOT NULL DEFAULT 'New',
  privacy_consent BOOLEAN NOT NULL DEFAULT TRUE,
  meeting_date TEXT,
  meeting_time TEXT,
  timezone TEXT,
  meeting_notes TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email);
CREATE INDEX IF NOT EXISTS idx_enquiries_reference ON enquiries(reference_code);

-- 6. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Row Level Security (RLS) Configuration
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Projects Policies
-- Public can view active public projects
CREATE POLICY "Public visitors can view public non-draft projects"
  ON projects FOR SELECT
  USING (status != 'Draft' AND visibility = 'Public');

-- Service role and authenticated admins have full access
CREATE POLICY "Admins full access on projects"
  ON projects FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- Services Policies
CREATE POLICY "Public visitors can view published services"
  ON services FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Admins full access on services"
  ON services FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- Technologies Policies
CREATE POLICY "Public visitors can view published technologies"
  ON technologies FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Admins full access on technologies"
  ON technologies FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- Enquiries Policies: LEAST PRIVILEGE
-- Public visitors can ONLY INSERT their enquiry. They can NEVER SELECT existing submissions.
CREATE POLICY "Public can insert project enquiries"
  ON enquiries FOR INSERT
  WITH CHECK (true);

-- Only authenticated admins or service-role can read or update enquiries
CREATE POLICY "Admins can view and manage all enquiries"
  ON enquiries FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- Site Settings Policies
CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can modify site settings"
  ON site_settings FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);
