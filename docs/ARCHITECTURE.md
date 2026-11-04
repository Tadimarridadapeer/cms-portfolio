# System Architecture — Cross Motive Services

This document details the code structure, data persistence models, and security boundaries implemented in Cross Motive Services.

---

## 1. Directory Structure

```text
├── app/
│   ├── layout.tsx               # Root layout, metadata, JSON-LD Organization schema, Nav & Footer
│   ├── page.tsx                 # Full homepage experience
│   ├── not-found.tsx            # Custom 404 page
│   ├── loading.tsx              # Page loading state
│   ├── error.tsx                # Error boundary handler
│   ├── robots.ts                # robots.txt configuration
│   ├── sitemap.ts               # Dynamic XML sitemap
│   ├── work/                    # Portfolio gallery & filter system
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx      # Comprehensive 16-section case-study view
│   ├── services/                # Services overview and 6 dedicated offering routes
│   │   ├── page.tsx
│   │   ├── web-development/page.tsx
│   │   ├── mobile-app-development/page.tsx
│   │   ├── ai-product-development/page.tsx
│   │   ├── ui-ux-design/page.tsx
│   │   ├── enterprise-solutions/page.tsx
│   │   └── mvp-development/page.tsx
│   ├── solutions/               # Solutions overview and audience pages
│   │   ├── page.tsx
│   │   ├── startups/page.tsx
│   │   ├── enterprise/page.tsx
│   │   ├── businesses/page.tsx
│   │   └── individuals/page.tsx
│   ├── technologies/page.tsx    # Categorized technology catalogue
│   ├── process/page.tsx         # Six-stage product development methodology
│   ├── about/page.tsx           # Company overview, principles & collaboration model
│   ├── contact/page.tsx         # Comprehensive lead form & discovery call flow
│   ├── faq/page.tsx             # Frequently asked questions
│   ├── privacy/page.tsx         # Privacy policy
│   ├── terms/page.tsx           # Terms of service
│   ├── admin/                   # Protected content management studio
│   │   ├── login/page.tsx       # Secure administrator login
│   │   ├── page.tsx             # Dashboard overview & recent inquiries
│   │   ├── projects/            # Project CRUD management (List, New, Edit)
│   │   ├── enquiries/page.tsx   # Lead pipeline and status updater
│   │   ├── services/page.tsx    # Service offering management
│   │   ├── technologies/page.tsx# Tech stack management
│   │   └── settings/page.tsx    # Site configuration & social links
│   └── api/                     # Server-side API route handlers
│       ├── auth/                # Login, logout, session verification
│       ├── enquiries/           # Rate-limited public submit & admin status patch
│       ├── projects/            # Project mutations and retrieval
│       ├── services/            # Service updates
│       ├── technologies/        # Tech catalogue updates
│       └── settings/            # Site settings update
├── components/
│   ├── ui/                      # Reusable atoms (Button, Badge, Input, Select, etc.)
│   ├── layout/                  # Navbar, Footer, AdminSidebar, AdminHeader
│   ├── sections/                # Homepage sections (Hero, WhatWeBuild, TechGrid, etc.)
│   ├── projects/                # ProjectCard, filters, case study blocks
│   ├── contact/                 # EnquiryForm
│   └── admin/                   # ProjectForm, EnquiryManager, SettingsForm
├── lib/
│   ├── types.ts                 # TypeScript interfaces for all domain entities
│   ├── auth.ts                  # Cryptographic session cookie authentication
│   ├── data/
│   │   ├── initial-data.ts      # Seed data (9 initial portfolio projects, services, tech)
│   │   └── storage.ts           # Resilient dual-mode storage (Supabase / local fallback)
│   ├── supabase/
│   │   ├── client.ts            # Client-side Supabase client
│   │   └── server.ts            # Server-side Supabase client
│   └── validations/
│       ├── enquiry.ts           # Zod schema for client and server form validation
│       └── project.ts           # Zod schema for project entity mutations
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql # Complete PostgreSQL DDL with RLS policies & indexes
└── docs/                        # Complete operational documentation
```

---

## 2. Security Highlights

1. **Least-Privilege Database Access:**
   - Public visitors can only perform an `INSERT` on the `enquiries` table; they cannot read other people's submissions.
   - Draft projects are filtered on the server and blocked from public queries.

2. **Server-Side Authorization:**
   - Every protected API mutation (`/api/projects`, `/api/services`, `/api/enquiries`) invokes `getAdminSession()` and verifies the HMAC SHA-256 signature on the session cookie.
   - Client-side navigation guards are backed by server-side verification.

3. **No Secret Leaks:**
   - Supabase service-role keys and session secrets are never prefixed with `NEXT_PUBLIC_` and never bundled into client JavaScript.
   - Public-facing errors display safe, generic descriptions.
