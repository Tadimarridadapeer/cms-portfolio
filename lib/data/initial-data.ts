import { Project, Service, Technology, SiteSettings } from "../types";

export const initialSiteSettings: SiteSettings = {
  company_name: "Cross Motive Services",
  tagline: "We turn ideas into digital products.",
  supporting_message:
    "From early-stage startup concepts to enterprise-grade platforms, we design, engineer, and launch digital experiences built for real-world impact.",
  email: "sahith@crossmotiveservices.com",
  phone: "",
  location: "Engineering Hub & Distributed Teams",
  github_url: "https://github.com",
  linkedin_url: "https://linkedin.com",
  twitter_url: "https://x.com",
  updated_at: new Date().toISOString(),
};

export const initialProjects: Project[] = [];

export const initialServices: Service[] = [
  {
    id: "srv-7",
    title: "ERP & CRM Solutions",
    slug: "erp-crm-solutions",
    summary:
      "Custom ERP architectures, tailor-made CRM pipelines, multi-department automation, and unified data systems built for operational scale.",
    description:
      "We engineer robust Enterprise Resource Planning (ERP) and Customer Relationship Management (CRM) solutions tailored specifically to your organization's workflows. From unifying fragmented data silos and sales pipelines to automating multi-stage approvals, inventory tracking, and financial reporting, our custom systems scale with your operational demands.",
    deliverables: [
      "Custom ERP & CRM system architecture with scalable relational database design",
      "Tailored sales pipelines, lead management, and customer lifecycle tracking",
      "Inventory control, multi-warehouse tracking, and supplier procurement modules",
      "Automated approval workflows, document routing, and internal communication channels",
      "Enterprise Role-Based Access Control (RBAC), SSO, and immutable audit logging",
      "Seamless API integrations with third-party providers (Accounting, Billing, Logistics, Payments)",
    ],
    use_cases: [
      "Growing enterprises outgrowing rigid off-the-shelf CRM/ERP subscriptions",
      "Multi-location operations requiring unified inventory and centralized billing",
      "High-touch sales organizations needing custom pipeline stages and automated reporting",
      "Legacy spreadsheet and manual paper workflow digital transformation",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "NestJS", "PostgreSQL", "Prisma ORM", "Docker"],
    faq: [
      {
        question: "Why build a custom ERP or CRM instead of buying an existing off-the-shelf product?",
        answer:
          "Off-the-shelf platforms like Salesforce or SAP charge steep per-user monthly subscription fees and force your company to adapt its unique operational processes to their rigid constraints. A custom ERP/CRM gives you 100% intellectual property ownership, zero per-seat licensing fees, and bespoke workflows mapped exactly to how your business operates.",
      },
      {
        question: "Can you migrate data from our existing systems and legacy spreadsheets?",
        answer:
          "Yes. We engineer secure data validation and migration pipelines that sanitize, deduplicate, and import historical customer data, sales records, and inventory ledgers into your new database with zero disruption to daily business operations.",
      },
      {
        question: "How do you enforce security and data isolation across teams?",
        answer:
          "We implement granular Role-Based Access Control (RBAC), multi-factor authentication (MFA), encrypted database storage, and complete audit logging for every record creation, view, update, and deletion.",
      },
    ],
    is_published: true,
    display_order: 7,
    created_at: "2026-03-01T00:00:00.000Z",
    updated_at: "2026-03-01T00:00:00.000Z",
  },

  {
    id: "srv-1",
    title: "Web Application Development",
    slug: "web-development",
    summary:
      "Modern web applications, SaaS platforms, customer portals, and internal tools engineered with Next.js, React, and TypeScript.",
    description:
      "We design and build fast, reliable, and scalable web applications tailored to your business operations. Our engineering methodology emphasizes clean component architectures, robust API integrations, responsive layouts, and performance optimization.",
    deliverables: [
      "Production-ready Next.js / React application codebase",
      "Component library and responsive layout implementation",
      "RESTful / GraphQL API integration and state management",
      "Authentication, authorization, and role-based access control",
      "Comprehensive automated test coverage and documentation",
      "CI/CD deployment pipeline configuration",
    ],
    use_cases: [
      "B2B and B2C Software-as-a-Service (SaaS) platforms",
      "Client portals and self-service account management dashboards",
      "Interactive data visualization and reporting interfaces",
      "Custom business management platforms and admin consoles",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    faq: [
      {
        question: "How do you ensure web application performance and SEO?",
        answer:
          "We use modern frameworks like Next.js with Server-Side Rendering (SSR) and Static Site Generation (SSG), optimized image handling, minimal third-party scripts, and rigorous Lighthouse performance audits.",
      },
      {
        question: "Can you modernize an existing legacy web application?",
        answer:
          "Yes. We frequently conduct architectural audits and execute phased migration strategies to upgrade legacy stacks to modern TypeScript and component frameworks without disrupting live operations.",
      },
      {
        question: "Who owns the code and intellectual property?",
        answer:
          "You retain 100% intellectual property ownership of all custom software code, repositories, and assets created during our engagement upon delivery.",
      },
    ],
    is_published: true,
    display_order: 1,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "srv-2",
    title: "Mobile Application Development",
    slug: "mobile-app-development",
    summary:
      "Cross-platform applications and mobile-first digital experiences engineered for iOS and Android using React Native and Expo.",
    description:
      "We build intuitive, fluid mobile applications that share business logic across iOS and Android while respecting native platform design guidelines and hardware features.",
    deliverables: [
      "Cross-platform React Native / Expo codebase",
      "Native device integration (camera, biometrics, push notifications, offline storage)",
      "App Store and Google Play deployment preparation and store assets",
      "API integration and offline-first data caching",
      "Telemetry, error logging, and user analytics setup",
    ],
    use_cases: [
      "Consumer utility and on-demand service applications",
      "Field operations and inventory scanning mobile tools",
      "Member community and lifestyle companion apps",
      "Companion mobile apps for existing web platforms",
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "SQLite", "Firebase / Supabase"],
    faq: [
      {
        question: "Why do you recommend React Native for mobile apps?",
        answer:
          "React Native allows a single, maintainable TypeScript codebase to target both iOS and Android natively, cutting delivery timelines and maintenance overhead in half while delivering near-native performance.",
      },
      {
        question: "Do you assist with Apple App Store and Google Play Store submission?",
        answer:
          "Yes. We manage app provisioning, test flight builds, compliance guidelines, privacy disclosures, and submission review processes through to live approval.",
      },
    ],
    is_published: true,
    display_order: 2,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "srv-3",
    title: "AI Product Development",
    slug: "ai-product-development",
    summary:
      "AI-powered features, intelligent workflows, retrieval-augmented generation (RAG), and custom LLM integrations.",
    description:
      "We turn machine learning and modern large language models into practical, cost-effective product features. From document analysis and automated categorization to domain-specific conversational assistants, we build AI solutions grounded in accuracy and security.",
    deliverables: [
      "LLM orchestration architecture (FastAPI, Python, LangChain, or direct API integration)",
      "Retrieval-Augmented Generation (RAG) pipelines with vector database indexing",
      "Context-aware system prompt engineering and structured JSON output parsers",
      "Streaming user interface components with low-latency feedback",
      "Cost management, token rate-limiting, and evaluation telemetry",
    ],
    use_cases: [
      "Domain-specific conversational assistants and customer support automation",
      "Automated document processing, invoice parsing, and structured extraction",
      "Contextual recommendation engines and intelligent search filters",
      "AI-assisted workflow macros and generative productivity tools",
    ],
    technologies: ["Python", "FastAPI", "OpenAI APIs", "LangChain", "Pinecone / pgvector", "TypeScript"],
    faq: [
      {
        question: "How do you protect proprietary data when using AI models?",
        answer:
          "We use enterprise API agreements that do not train on customer inputs, implement strict data sanitization, and utilize self-hosted or private vector databases with Row Level Security.",
      },
      {
        question: "How do you mitigate AI hallucinations?",
        answer:
          "We utilize RAG to ground the model strictly in verified source documents, implement structured schema enforcement (e.g. Zod/Pydantic), and provide clear attribution sources.",
      },
    ],
    is_published: true,
    display_order: 3,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "srv-4",
    title: "UI/UX and Product Design",
    slug: "ui-ux-design",
    summary:
      "User research, information architecture, wireframing, interactive prototypes, and production-ready design systems.",
    description:
      "Great software begins with clear thinking. We turn complex user journeys and business logic into intuitive, visually refined digital interfaces that reduce user friction and elevate brand perception.",
    deliverables: [
      "User journey maps, personas, and information architecture diagrams",
      "Interactive Figma wireframes and high-fidelity clickable prototypes",
      "Complete design system with reusable components, design tokens, and style guidelines",
      "Responsive breakpoint specifications (mobile, tablet, desktop)",
      "Developer handoff documentation with asset exports",
    ],
    use_cases: [
      "Complete end-to-end product design for new MVPs and startups",
      "Design modernization and usability overhaul for legacy software",
      "Creation of unified design systems across web and mobile ecosystems",
      "User testing and interface conversion optimization",
    ],
    technologies: ["Figma", "Design Systems", "Prototyping", "Tailwind Tokens", "User Testing"],
    faq: [
      {
        question: "Do your designers understand frontend development constraints?",
        answer:
          "Yes. Our designers work hand-in-hand with our software engineers, ensuring every component, token, and grid layout translates cleanly into semantic HTML, CSS, and component libraries.",
      },
      {
        question: "What design files do we receive at project completion?",
        answer:
          "You receive organized Figma source files, vector assets (SVG), complete design token documentation, and interactive prototype links.",
      },
    ],
    is_published: true,
    display_order: 4,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "srv-5",
    title: "Enterprise Software Development",
    slug: "enterprise-solutions",
    summary:
      "Internal business applications, secure data platforms, automated workflows, and system modernizations.",
    description:
      "We help established organizations modernize obsolete workflows and build resilient enterprise systems. We engineer software that respects enterprise governance, audit requirements, role-based access, and existing software integrations.",
    deliverables: [
      "Secure enterprise platform architecture tailored to compliance requirements",
      "Role-Based Access Control (RBAC) and SSO / SAML integration",
      "Enterprise database design with audit logging and encryption at rest",
      "Legacy system migration and API middleware connectors",
      "Internal documentation and team knowledge transfer",
    ],
    use_cases: [
      "Centralized operational dashboards and workflow orchestration",
      "Employee portals, approval chains, and resource management tools",
      "Data integration hubs connecting ERP, CRM, and bespoke tools",
      "Modernization of legacy spreadsheets and desktop databases",
    ],
    technologies: ["NestJS", "Node.js", "PostgreSQL", "Next.js", "Docker", "AWS"],
    faq: [
      {
        question: "How do you handle enterprise security and compliance?",
        answer:
          "We follow OWASP security standards, implement encrypted transport and storage, enforce strict least-privilege RBAC, and produce comprehensive audit logs for all sensitive system mutations.",
      },
      {
        question: "Can your solutions integrate with our existing ERP or CRM?",
        answer:
          "Yes. We design secure API middleware and webhook connectors that seamlessly sync data between your existing systems (such as Salesforce, SAP, HubSpot, or legacy SQL databases) and new applications.",
      },
    ],
    is_published: true,
    display_order: 5,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "srv-6",
    title: "Startup MVP Development",
    slug: "mvp-development",
    summary:
      "Rapid, high-craft Minimum Viable Products designed to validate core hypotheses, engage early users, and impress investors.",
    description:
      "We partner with startup founders to turn early concepts into functional, market-ready MVPs. We help you define the essential core scope, eliminate unnecessary bloat, and build on a scalable foundation that will not need to be rewritten after launch.",
    deliverables: [
      "MVP scoping, feature prioritization, and delivery roadmap",
      "High-fidelity clickable prototypes for early investor feedback",
      "Full-stack production web or mobile application",
      "Integrated payments, authentication, and core database",
      "Basic product analytics and error tracking instrumentation",
      "Founder handover session with architecture documentation",
    ],
    use_cases: [
      "Early-stage venture-backed or bootstrapped SaaS startups",
      "Product hypothesis testing and user validation experiments",
      "Demo-ready products for seed fundraising rounds",
      "First customer pilot deployments",
    ],
    technologies: ["Next.js", "React Native", "TypeScript", "Supabase", "Tailwind CSS", "Stripe"],
    faq: [
      {
        question: "How quickly can an MVP be built?",
        answer:
          "Depending on the technical scope, most MVPs are designed, engineered, and delivered in structured 6 to 10-week milestones. We help prioritize features ruthlessly so you launch quickly.",
      },
      {
        question: "Will the MVP code need to be thrown away when we scale?",
        answer:
          "No. We build on industry-standard TypeScript stacks (Next.js, PostgreSQL, clean API boundaries) that scale gracefully from your first 10 users to 100,000+ without structural rewrites.",
      },
    ],
    is_published: true,
    display_order: 6,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
  },
];

export const initialTechnologies: Technology[] = [
  // Frontend
  { id: "tech-1", name: "Next.js", category: "Frontend", description: "Production React framework with SSR, SSG, and App Router architecture.", display_order: 1, is_published: true },
  { id: "tech-2", name: "React", category: "Frontend", description: "Declarative component-driven UI library for building rich interactive web interfaces.", display_order: 2, is_published: true },
  { id: "tech-3", name: "TypeScript", category: "Frontend", description: "Statically typed JavaScript for robust codebases and fewer runtime defects.", display_order: 3, is_published: true },
  { id: "tech-4", name: "Tailwind CSS", category: "Frontend", description: "Utility-first CSS framework enabling rapid, consistent design system execution.", display_order: 4, is_published: true },
  { id: "tech-5", name: "HTML5 & CSS3", category: "Frontend", description: "Semantic, accessible markup and modern CSS standards.", display_order: 5, is_published: true },

  // Mobile
  { id: "tech-6", name: "React Native", category: "Mobile", description: "Native cross-platform mobile app development framework for iOS and Android.", display_order: 6, is_published: true },
  { id: "tech-7", name: "Expo", category: "Mobile", description: "Managed workflow platform for building, previewing, and deploying React Native apps.", display_order: 7, is_published: true },
  { id: "tech-8", name: "Cross-Platform Tools", category: "Mobile", description: "Shared business logic, offline caching, and responsive native UI patterns.", display_order: 8, is_published: true },

  // Backend
  { id: "tech-9", name: "Node.js", category: "Backend", description: "High-performance JavaScript runtime for scalable network applications and APIs.", display_order: 9, is_published: true },
  { id: "tech-10", name: "NestJS", category: "Backend", description: "Progressive TypeScript framework for building structured, maintainable enterprise backends.", display_order: 10, is_published: true },
  { id: "tech-11", name: "FastAPI", category: "Backend", description: "High-performance Python web framework for asynchronous APIs and ML services.", display_order: 11, is_published: true },
  { id: "tech-12", name: "REST & GraphQL", category: "Backend", description: "Modern API design architectures with strict schema contracts and versioning.", display_order: 12, is_published: true },

  // Databases
  { id: "tech-13", name: "PostgreSQL", category: "Databases", description: "Industry-standard relational database with advanced JSON, indexing, and transactional integrity.", display_order: 13, is_published: true },
  { id: "tech-14", name: "Supabase", category: "Databases", description: "Open source Firebase alternative providing PostgreSQL, Auth, and instant APIs.", display_order: 14, is_published: true },
  { id: "tech-15", name: "Prisma ORM", category: "Databases", description: "Type-safe database ORM and query builder for TypeScript and Node.js.", display_order: 15, is_published: true },
  { id: "tech-16", name: "MongoDB", category: "Databases", description: "Document-oriented NoSQL database for flexible data schemas and rapid prototypes.", display_order: 16, is_published: true },

  // AI & Integrations
  { id: "tech-17", name: "OpenAI APIs", category: "AI & Integrations", description: "GPT and embedding model integrations for conversational and analytical capabilities.", display_order: 17, is_published: true },
  { id: "tech-18", name: "RAG & Vector Search", category: "AI & Integrations", description: "Retrieval-Augmented Generation using pgvector, Pinecone, and document chunking.", display_order: 18, is_published: true },
  { id: "tech-19", name: "Document Parsing", category: "AI & Integrations", description: "Automated extraction pipelines for PDFs, images, invoices, and unstructured text.", display_order: 19, is_published: true },
  { id: "tech-20", name: "Third-party APIs", category: "AI & Integrations", description: "Reliable webhook and REST integrations with payment, messaging, and CRM providers.", display_order: 20, is_published: true },

  // Cloud & DevOps
  { id: "tech-21", name: "AWS", category: "Cloud & DevOps", description: "Scalable cloud infrastructure (S3, EC2, ECS, RDS, CloudFront, Lambda).", display_order: 21, is_published: true },
  { id: "tech-22", name: "Docker", category: "Cloud & DevOps", description: "Containerized application packaging ensuring consistency across dev and production.", display_order: 22, is_published: true },
  { id: "tech-23", name: "Vercel", category: "Cloud & DevOps", description: "Edge-optimized global hosting platform with seamless Next.js deployments.", display_order: 23, is_published: true },
  { id: "tech-24", name: "CI/CD Pipelines", category: "Cloud & DevOps", description: "Automated GitHub Actions workflows for testing, linting, and continuous deployment.", display_order: 24, is_published: true },

  // Design & Product
  { id: "tech-25", name: "Figma", category: "Design & Product", description: "Collaborative design environment for wireframes, design systems, and prototypes.", display_order: 25, is_published: true },
  { id: "tech-26", name: "Design Systems", category: "Design & Product", description: "Tokenized UI component systems ensuring visual cohesion and dev velocity.", display_order: 26, is_published: true },
  { id: "tech-27", name: "UX Research", category: "Design & Product", description: "User journey mapping, usability testing, and data-driven workflow validation.", display_order: 27, is_published: true },
];
