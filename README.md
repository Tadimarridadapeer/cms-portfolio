# Cross Motive Services — Complete Digital Product Agency Platform

A modern, production-grade company website, portfolio case-study platform, and content management studio for **Cross Motive Services** — a technology and digital product development studio that turns ideas into functional digital products.

Built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **Supabase PostgreSQL** (with automatic zero-config persistent local fallback).

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy the example environment configuration:
```bash
cp .env.example .env.local
```

### 3. Run Locally (Development)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public site.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🔐 Administrator Studio (`/admin`)

The platform includes a protected administrative studio for managing projects, services, technologies, site settings, and client enquiries:

- **URL:** `/admin` (Redirects to `/admin/login` if unauthenticated)
- **Default Email:** `admin@crossmotiveservices.com`
- **Default Password:** `ChangeMeInProduction2026!`

---

## 🧭 Site Architecture & Implemented Routes

| Route | Purpose | Description |
|---|---|---|
| `/` | Homepage | Hero, capabilities, audience solutions, selected projects, services, stack, process, why us, CTA |
| `/work` | Portfolio | Filterable project gallery with live category pills & text search |
| `/work/[slug]` | Case Studies | 16-section deep-dive case studies with architectural diagrams & transparent concept labeling |
| `/services` | Services Overview | Matrix of all 8 digital engineering capabilities |
| `/services/web-development` | Service Detail | Web applications & SaaS platforms |
| `/services/mobile-app-development`| Service Detail | Cross-platform iOS & Android mobile apps |
| `/services/ai-product-development`| Service Detail | AI products, LLMs, and RAG pipelines |
| `/services/ui-ux-design` | Service Detail | Product design & Figma design systems |
| `/services/enterprise-solutions` | Service Detail | Enterprise platforms & business modernization |
| `/services/mvp-development` | Service Detail | Startup MVP scoping & rapid execution |
| `/solutions` | Solutions Hub | Industry & customer stage solutions |
| `/solutions/startups` | Solution Detail | For startup founders & MVPs |
| `/solutions/enterprise` | Solution Detail | For enterprises & governance |
| `/solutions/businesses` | Solution Detail | For established SMBs & operations |
| `/solutions/individuals` | Solution Detail | For solo creators & personal products |
| `/technologies` | Tech Stack | Categorized engineering stack catalogue |
| `/process` | Methodology | Six-stage disciplined development lifecycle (01-06) |
| `/about` | Company | Company principles, approach & honest portfolio stance |
| `/contact` | Lead Generation | Comprehensive enquiry form with unique reference code generation (`CMS-2026-XXXX`) |
| `/faq` | FAQs | Transparent answers on pricing, code ownership, and scoping |
| `/privacy` | Privacy Policy | Data protection and confidentiality commitments |
| `/terms` | Terms of Service | Commercial terms and portfolio transparency |
| `/admin` | Admin Dashboard | Studio overview, metrics, pipeline summary |
| `/admin/login` | Admin Sign In | Secure cryptographic session authentication |
| `/admin/projects` | Project CRUD | Create, edit, publish, draft, archive, and delete case studies |
| `/admin/enquiries` | Lead Pipeline | Status updates (New, Contacted, Qualified, Proposal Sent, Won, Lost) & notes |
| `/admin/services` | Service Management| Publishing controls & display order |
| `/admin/technologies` | Tech Catalogue | Manage supported frameworks & databases |
| `/admin/settings` | Site Settings | Brand configuration, contact info, and social links |

---

## 🎨 Visual Design System

- **Primary Background:** `#F7F7F5`
- **Primary Text:** `#171717`
- **Dark Surface:** `#101114`
- **Secondary Text:** `#66686D`
- **Border:** `#E4E4E1`
- **Accent:** `#5B6CFF`
- **Typography:** Modern clean sans-serif with monospace accents and high contrast.
- **Craft:** Subtle technical grid patterns, crisp line borders, responsive mockups, and zero cheesy 3D distractions.

---

## 📂 Seed Portfolio Projects

The platform is pre-seeded with 9 projects:
1. **Writersthing** — Independent author & reader community publishing platform.
2. **P’STYLST** — AI personal styling assistant with facial analysis & wardrobe curation.
3. **Intrly** — AI mock interview room with real-time voice probing & rubric scoring.
4. **The Gathering Co.** — Event planning and verified vendor marketplace directory.
5. **YoKarna** — Pure-vegetarian food delivery platform with kitchen segregation audits.
6. **VizTech India** — Enterprise digital transformation & brand service portal.
7. **Alpha Fitness Pro** — Strength training analytics and progressive overload telemetry.
8. **Book My Advocate** — Legal advocate discovery, compliance intake, and consultation booking.
9. **TapAi** — System-wide keyboard HUD and contextual AI productivity macro assistant.

*All concept projects and internal builds are explicitly labeled to guarantee honesty and prevent unverified commercial claims.*

---

## 🛠️ Complete Documentation

Detailed guides are located in the `docs/` folder:
- [DEPLOYMENT.md](file:///d:/Antigravity/cms%20portfolio/docs/DEPLOYMENT.md) — Production Vercel deployment, domains, environment variables.
- [SUPABASE_SETUP.md](file:///d:/Antigravity/cms%20portfolio/docs/SUPABASE_SETUP.md) — PostgreSQL migrations, RLS policies, storage bucket configuration.
- [ADMIN_GUIDE.md](file:///d:/Antigravity/cms%20portfolio/docs/ADMIN_GUIDE.md) — Administrator authentication, project publishing, and lead status management.
- [ARCHITECTURE.md](file:///d:/Antigravity/cms%20portfolio/docs/ARCHITECTURE.md) — Detailed technical architecture and data flow documentation.
