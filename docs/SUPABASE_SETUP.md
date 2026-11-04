# Supabase Configuration Guide — Cross Motive Services

This guide walks through configuring Supabase PostgreSQL, Row Level Security, and Storage for the Cross Motive Services platform.

---

## 1. Create a Supabase Project

1. Log in to [supabase.com](https://supabase.com).
2. Click **New Project**.
3. Choose a project name (e.g. `cross-motive-services`), secure database password, and regional data center.

---

## 2. Execute SQL Migrations

1. Go to **SQL Editor** in your Supabase dashboard.
2. Open the file `supabase/migrations/001_initial_schema.sql` located in this repository.
3. Paste the complete script and click **Run**.
4. Confirm in the **Table Editor** that the following tables exist:
   - `projects`
   - `services`
   - `technologies`
   - `enquiries`
   - `site_settings`

---

## 3. Row Level Security (RLS) Rules

The database migration automatically configures least-privilege security policies:

| Table | Operation | Public Role | Authenticated / Service Role |
|---|---|---|---|
| `projects` | SELECT | Only `status != 'Draft' AND visibility = 'Public'` | All rows (including drafts) |
| `projects` | INSERT / UPDATE / DELETE | Blocked | Allowed |
| `services` | SELECT | Only `is_published = TRUE` | All rows |
| `enquiries` | INSERT | **Allowed** (For public form submissions) | Allowed |
| `enquiries` | SELECT / UPDATE / DELETE | **Strictly Blocked** (Public cannot read existing submissions) | **Allowed** (Admins only) |
| `site_settings` | SELECT | Allowed | Allowed |
| `site_settings` | UPDATE | Blocked | Allowed |

---

## 4. Storage Bucket Setup (For Project Screenshots & Attachments)

1. In Supabase, go to **Storage > Create a new bucket**.
2. Name: `project-assets`.
3. Set to **Public** for public portfolio screenshots, or **Private** with signed URLs for confidential attachments.
4. Set allowed MIME types: `image/png`, `image/jpeg`, `image/webp`, `image/svg+xml`.
5. Max file size: `5MB`.

---

## 5. Local Fallback Resilience

If Supabase is not configured (e.g. in offline development or before cloud setup), the Cross Motive Services application automatically utilizes the built-in resilient file repository at `data/store.json`. All CRUD mutations, enquiry submissions, and status changes persist across server restarts.
