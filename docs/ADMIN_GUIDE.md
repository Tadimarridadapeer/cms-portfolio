# Administrator Guide — Cross Motive Services

This guide explains how to access, navigate, and manage the protected **Cross Motive Studio Admin Portal**.

---

## 1. Accessing the Admin Area

- **URL:** `/admin` (Redirects to `/admin/login` if not authenticated)
- **Default Development Email:** `admin@crossmotiveservices.com`
- **Default Development Password:** `ChangeMeInProduction2026!`

To customize these in production, set the following environment variables:
```bash
ADMIN_DEFAULT_EMAIL=your-email@yourdomain.com
ADMIN_DEFAULT_PASSWORD=YourCustomStrongPassword!
ADMIN_SESSION_SECRET=a-secure-random-32-byte-hex-string
```

Sessions are issued using cryptographically signed, HTTP-only, SameSite cookies that persist for 7 days.

---

## 2. Managing Projects & Case Studies (`/admin/projects`)

### Creating a Project
1. Navigate to `/admin/projects/new`.
2. Enter the project title (e.g. `New Product Name`). The slug will auto-populate (e.g. `new-product-name`).
3. Select the **Engagement Classification**:
   - `Concept Project`: For internal design or architectural prototypes. Clearly labels the case study on the public site to ensure transparency.
   - `Internal Product`: For tools built by Cross Motive Services.
   - `Work in Progress`: For active, unreleased builds.
   - `Client Project`: For verified commercial client deliverables.
4. Set the **Lifecycle Status**:
   - `Draft`: Hidden from all public routes and sitemaps.
   - `In Progress`: Displayed with an in-progress badge.
   - `Live`: Displayed as a production system.
   - `Archived`: Hidden from main search.
5. Provide detailed case study sections:
   - Problem statement
   - Solution statement
   - Main features (one per line)
   - Technical architecture
   - Challenges & trade-offs
   - Current outcomes
6. Click **Publish Project**.

### Editing or Deleting
- Navigate to `/admin/projects` and click the edit icon on any row to modify its parameters or permanently delete the entry.

---

## 3. Managing Inquiries & Leads (`/admin/enquiries`)

When prospective clients submit the `/contact` form:
1. Each enquiry is automatically assigned a unique reference code (e.g. `CMS-2026-8492`).
2. Submissions appear in the `/admin/enquiries` pipeline.
3. Supported pipeline statuses:
   - `New`: Unreviewed submission.
   - `Contacted`: Initial outreach or email sent.
   - `Qualified`: Requirements and budget validated.
   - `Proposal Sent`: SOW / proposal dispatched.
   - `Won`: Client contract signed.
   - `Lost`: Not moving forward.
4. Administrators can add internal engineering notes to track meeting summaries and next steps.

---

## 4. Services & Technology Catalogue

- `/admin/services`: Review deliverables and toggle published status.
- `/admin/technologies`: Manage framework and database listings.
- `/admin/settings`: Update public business email, phone, location, and verified social URLs.
