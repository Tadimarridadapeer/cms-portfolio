# Deployment Guide — Cross Motive Services

This guide provides step-by-step instructions for deploying the **Cross Motive Services** web application to production on **Vercel** with **Supabase PostgreSQL**.

---

## 1. Prerequisites

- A GitHub repository containing this codebase.
- A [Vercel](https://vercel.com) account.
- A [Supabase](https://supabase.com) account and project.
- Node.js 18+ and npm installed locally.

---

## 2. Environment Variables Checklist

Configure these environment variables in your Vercel Project Settings under **Settings > Environment Variables**:

| Variable Name | Environment | Description | Example / Default |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production, Preview | Canonical domain of the website | `https://crossmotiveservices.com` |
| `NEXT_PUBLIC_COMPANY_NAME` | Production, Preview | Brand wordmark | `Cross Motive Services` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Production, Preview | Public inquiry inbox | `contact@crossmotiveservices.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview | Supabase project URL | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview | Supabase client anon key | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Production (Secret) | Server-only admin key (Never expose to client) | `eyJhbGciOi...` |
| `ADMIN_DEFAULT_EMAIL` | Production | Admin login email | `admin@crossmotiveservices.com` |
| `ADMIN_DEFAULT_PASSWORD` | Production (Secret) | Strong custom password for admin portal | `YourSecurePassword2026!` |
| `ADMIN_SESSION_SECRET` | Production (Secret) | 32+ character random secret for signing session cookies | `random-32-char-salt-string` |

> [!IMPORTANT]
> Never expose `SUPABASE_SERVICE_ROLE_KEY` or `ADMIN_SESSION_SECRET` with a `NEXT_PUBLIC_` prefix.

---

## 3. Database Migration

1. In your Supabase Dashboard, navigate to the **SQL Editor**.
2. Open `supabase/migrations/001_initial_schema.sql` from this codebase.
3. Paste the contents into the SQL Editor and click **Run**.
4. This will create:
   - `projects` table with search indexes and RLS policies
   - `services` table
   - `technologies` catalogue table
   - `enquiries` table with write-only insertion for public users
   - `site_settings` table

---

## 4. Deploying to Vercel

### Option A: Using Vercel Dashboard (Recommended)
1. Push your repository to GitHub.
2. In Vercel, click **Add New > Project** and import the GitHub repo.
3. Framework Preset: **Next.js**
4. Root Directory: `./`
5. In the **Environment Variables** section, add the variables from Section 2.
6. Click **Deploy**.

### Option B: Using Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 5. Domain & SSL Setup
1. In the Vercel Dashboard, go to **Settings > Domains**.
2. Add `crossmotiveservices.com` and `www.crossmotiveservices.com`.
3. Configure the provided DNS CNAME and A records at your domain registrar.
4. Vercel will provision free automated SSL certificates.

---

## 6. Verification Checklist
- [ ] Visit `https://your-domain.com/` and check homepage rendering.
- [ ] Test the `/work` portfolio filter by category and search.
- [ ] Click through to individual case studies (e.g. `/work/writersthing`).
- [ ] Test the `/contact` form with a sample submission and verify that the unique `CMS-2026-XXXX` reference code is generated.
- [ ] Visit `/admin/login` and authenticate with your admin credentials.
- [ ] Check `/admin` dashboard to confirm the newly submitted enquiry appears.
