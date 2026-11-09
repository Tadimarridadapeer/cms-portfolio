"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const ARCH_LAYERS = [
  { no: "01", name: "Experience layer", tech: "Web · iOS · Android" },
  { no: "02", name: "Application layer", tech: "APIs · Services · Auth" },
  { no: "03", name: "Data & intelligence", tech: "Databases · AI · Search" },
  { no: "04", name: "Infrastructure layer", tech: "Cloud · CI/CD · Security" },
];

const AUDIENCE_CARDS = [
  {
    no: "01 / STARTUPS",
    title: "From idea to MVP.",
    desc: "Validate faster, launch with focus and build a foundation that can scale.",
    href: "/solutions/startups",
  },
  {
    no: "02 / BUSINESSES",
    title: "Make operations smarter.",
    desc: "Modernise workflows, connect systems and create better customer experiences.",
    href: "/solutions/businesses",
  },
  {
    no: "03 / ENTERPRISE",
    title: "Bring complexity together.",
    desc: "Build secure, dependable platforms that support teams and processes.",
    href: "/solutions/enterprise",
  },
  {
    no: "04 / FOUNDERS & INDIVIDUALS",
    title: "Build the thing you believe in.",
    desc: "Get a thoughtful technical partner for a personal project or new venture.",
    href: "/solutions/individuals",
  },
];

const PROCESS_STEPS = [
  {
    step: "01 — DISCOVER",
    title: "Understand the problem",
    desc: "Align on users, business goals, constraints and what a successful outcome looks like.",
  },
  {
    step: "02 — DEFINE",
    title: "Shape the solution",
    desc: "Map the experience, define the architecture and agree on a practical roadmap.",
  },
  {
    step: "03 — ENGINEER",
    title: "Build with intent",
    desc: "Develop in focused iterations, validate continuously and keep you close to progress.",
  },
  {
    step: "04 — DELIVER",
    title: "Launch and evolve",
    desc: "Prepare for production, support the handover and improve as real usage grows.",
  },
];

interface ProductItem {
  id: number;
  title: string;
  category: string;
  type: "cms" | "saas";
  typeLabel: string;
  desc: string;
  stack: string[];
  security: string;
  deploy: string;
}

const PRODUCTS_DATA: Record<number, ProductItem> = {
  1: {
    id: 1,
    title: "Web applications",
    category: "WEB PLATFORMS",
    type: "cms",
    typeLabel: "01 / WEB",
    desc: "Scalable platforms, SaaS products, customer portals and custom business applications.",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "REST & GraphQL"],
    security: "SOC-2 Ready & OWASP Compliant",
    deploy: "2-4 Weeks",
  },
  2: {
    id: 2,
    title: "Mobile applications",
    category: "MOBILE SUITE",
    type: "saas",
    typeLabel: "02 / MOBILE",
    desc: "Thoughtful iOS and Android products built for performance and everyday use.",
    stack: ["Swift (iOS)", "Kotlin (Android)", "React Native", "Flutter"],
    security: "AES-256 Bit Encryption",
    deploy: "3-5 Weeks",
  },
  3: {
    id: 3,
    title: "ERP & CRM Solutions",
    category: "ENTERPRISE SYSTEMS",
    type: "cms",
    typeLabel: "03 / ERP & CRM",
    desc: "Custom ERP systems, tailored CRM pipelines, inventory tracking and operational workflow automation.",
    stack: ["PostgreSQL", "Node.js", "Docker", "Custom Dashboards"],
    security: "Role-Based Access & Audit Logs",
    deploy: "3-6 Weeks",
  },
  4: {
    id: 4,
    title: "Enterprise solutions",
    category: "MANAGEMENT SYSTEMS",
    type: "saas",
    typeLabel: "04 / ENTERPRISE",
    desc: "Admin systems, CMS platforms, dashboards and enterprise workflow automation.",
    stack: ["Microservices", "Go", "Redis", "Kafka"],
    security: "SAML 2.0 & Enterprise SSO",
    deploy: "4-6 Weeks",
  },
  5: {
    id: 5,
    title: "AI & automation",
    category: "INTELLIGENT WORKFLOWS",
    type: "saas",
    typeLabel: "05 / INTELLIGENCE",
    desc: "Practical AI features and intelligent workflows that improve real products.",
    stack: ["Python", "OpenAI / Anthropic APIs", "Vector DBs", "LangChain"],
    security: "Zero Data Retention SLA",
    deploy: "2-3 Weeks",
  },
  6: {
    id: 6,
    title: "Startup MVP development",
    category: "RAPID LAUNCH",
    type: "saas",
    typeLabel: "06 / MVP",
    desc: "Rapid, production-ready MVPs built to validate concepts, acquire users, and scale.",
    stack: ["Full-Stack Next.js", "Supabase / PostgreSQL", "Stripe", "Vercel"],
    security: "Production-Grade Clean Architecture",
    deploy: "2-3 Weeks",
  },
  7: {
    id: 7,
    title: "Product design",
    category: "DESIGN SYSTEMS",
    type: "cms",
    typeLabel: "07 / PRODUCT",
    desc: "Research, UX architecture, interface systems and interactive prototypes.",
    stack: ["Figma Systems", "Design Tokens", "Wireframing", "User Journeys"],
    security: "WCAG 2.1 AA Accessible",
    deploy: "1-2 Weeks",
  },
  8: {
    id: 8,
    title: "Backend & cloud",
    category: "INFRASTRUCTURE",
    type: "saas",
    typeLabel: "08 / PLATFORM",
    desc: "APIs, databases, integrations, cloud infrastructure and secure architecture.",
    stack: ["AWS", "Kubernetes", "Terraform", "PostgreSQL Clusters"],
    security: "Zero-Trust & VPC Hardened",
    deploy: "2-4 Weeks",
  },
};

type StudioDomain = "web" | "mobile" | "erp" | "ai";

const STUDIO_DOMAINS: Record<
  StudioDomain,
  {
    title: string;
    tag: string;
    category: string;
    description: string;
    metrics: { label: string; value: string }[];
    highlights: string[];
    compliance: string;
  }
> = {
  web: {
    title: "Web applications",
    tag: "01 // WEB PLATFORMS",
    category: "SCALABLE PLATFORMS",
    description:
      "Scalable platforms, SaaS products, customer portals and custom business applications built with Next.js, TypeScript, and high-performance edge networks.",
    metrics: [
      { label: "Global Edge Latency", value: "<12ms" },
      { label: "Throughput Capacity", value: "45k req/s" },
      { label: "SLA Guarantee", value: "99.99%" },
    ],
    highlights: [
      "Next.js 14 SSR & Edge CDN Routing",
      "Dynamic GraphQL & REST API Gateways",
      "Headless CMS & Custom Portal Architecture",
    ],
    compliance: "100% IP & Repo Ownership",
  },
  mobile: {
    title: "Mobile applications",
    tag: "02 // MOBILE SUITE",
    category: "IOS & ANDROID NATIVE",
    description:
      "Thoughtful iOS and Android products built for performance and everyday use, engineered with Swift, Kotlin, and cryptographic offline sync.",
    metrics: [
      { label: "Cold Launch Time", value: "<0.4s" },
      { label: "Offline Sync", value: "Zero Loss" },
      { label: "Rating Avg", value: "4.9 / 5.0" },
    ],
    highlights: [
      "Native Swift & Kotlin Codebases",
      "Cryptographic Offline Database Sync",
      "Real-time Telemetry & Push Notification Bus",
    ],
    compliance: "AES-256 Bit Encryption",
  },
  erp: {
    title: "ERP & CRM Solutions",
    tag: "03 // BUSINESS OPERATIONS",
    category: "BESPOKE WORKFLOWS",
    description:
      "Custom ERP systems, tailored CRM pipelines, inventory tracking, and operational workflow automation engineered around your exact business logic.",
    metrics: [
      { label: "Per-Seat Fees", value: "₹0 Recurring" },
      { label: "Pipeline Sync", value: "Real-time" },
      { label: "System Uptime", value: "99.99%" },
    ],
    highlights: [
      "Bespoke Operational Logic (Zero Per-Seat Fees)",
      "Automated Inventory & Pipeline Workflows",
      "Role-Based Access Control & Audit Trails",
    ],
    compliance: "SOC-2 Ready & Full Data Sovereignty",
  },
  ai: {
    title: "AI & automation",
    tag: "04 // INTELLIGENCE",
    category: "PRACTICAL AI WORKFLOWS",
    description:
      "Practical AI features and intelligent workflows that improve real products—from semantic search to autonomous enterprise document processing.",
    metrics: [
      { label: "Inference Latency", value: "<85ms" },
      { label: "Index Precision", value: "99.4%" },
      { label: "Data Retention", value: "Zero Storage" },
    ],
    highlights: [
      "Custom Enterprise RAG Retrieval Pipelines",
      "Vector Search & Document Ingestion",
      "Automated Multi-Agent Task Orchestration",
    ],
    compliance: "Zero Corporate Data Retention SLA",
  },
};

const SHOWCASE_PROJECTS = [
  {
    title: "WritersThing",
    category: "CREATOR PLATFORM & SAAS",
    summary: "Digital storytelling ecosystem, creator content distribution platform, and collaborative editorial suite with dynamic reader engagement telemetry.",
    url: "https://www.writersthing.com/",
    image: "/images/projects_new/writersthing.png",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Node.js"],
    impact: "Sub-20ms reader TTFB globally",
  },
  {
    title: "Kollimalai Natural Store",
    category: "D2C E-COMMERCE",
    summary: "Direct-to-consumer organic farm produce, herbal remedies, and e-commerce marketplace with automated checkout and real-time inventory ledger.",
    url: "https://www.kollimalainaturalstore.com/",
    image: "/images/projects_new/kollimalai.png",
    stack: ["Next.js", "Payment Gateway", "Tailwind CSS", "PostgreSQL"],
    impact: "350% online sales growth",
  },
  {
    title: "Cross Motive Services",
    category: "DIGITAL ENGINEERING STUDIO",
    summary: "Flagship engineering and cloud architecture studio platform showcasing bespoke telemetry, micro-interactions, and 100% IP code ownership.",
    url: "https://www.crossmotiveservices.com/",
    image: "/images/projects_new/cms.png",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Edge SSR"],
    impact: "100% IP & Repo Ownership",
  },
  {
    title: "Vegetable Tonnes",
    category: "B2B AGRITECH & SUPPLY CHAIN",
    summary: "Wholesale agricultural procurement and farm supply chain marketplace connecting commercial growers with bulk institutional buyers.",
    url: "https://www.vegetabletonnes.com/",
    image: "/images/projects_new/vegetabletonnes.png",
    stack: ["Next.js", "B2B Trading", "Cloud Logistics", "PostgreSQL"],
    impact: "12,000+ tonnes traded",
  },
  {
    title: "Gathering & Co.",
    category: "HOSPITALITY & LIFESTYLE",
    summary: "Curated event curation, bespoke community gathering booking engine, and luxury lifestyle brand collective with immersive visual storytelling.",
    url: "https://the-gathering-co-three.vercel.app/",
    image: "/images/projects_new/gathering.png",
    stack: ["React", "Framer Motion", "Tailwind CSS", "Vercel"],
    impact: "100% sold-out event bookings",
  },
  {
    title: "Blaeze Announcement Portal",
    category: "PRODUCT LAUNCH EXPERIENCE",
    summary: "High-impact product launch website, interactive broadcast deck, and digital announcement waitlist engine engineered for viral rollouts.",
    url: "https://blaeze.vercel.app/",
    image: "/images/projects_new/blaeze.png",
    stack: ["Next.js 14", "Tailwind CSS", "Edge Functions", "Vercel"],
    impact: "28,000+ signups in 72h",
  },
];

const HERO_ROTATING_WORDS = [
  "experiences.",
  "platforms.",
  "applications.",
  "systems.",
  "solutions.",
];

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDomain, setActiveDomain] = useState<StudioDomain>("web");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Hero headline rotating typewriter animation
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("experiences.");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = HERO_ROTATING_WORDS[wordIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Pause at end of completed word so user can read it clearly
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % HERO_ROTATING_WORDS.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  // Consultation form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formService, setFormService] = useState("Web applications");
  const [formBudget, setFormBudget] = useState("₹25,000 - ₹50,000 (Starter / MVP)");
  const [formScope, setFormScope] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Dynamic Island Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openDrawer = (id: number) => {
    setSelectedProductId(id);
  };

  const closeDrawer = () => {
    setSelectedProductId(null);
  };

  const openConsultation = () => {
    setIsConsultationOpen(true);
    setFormSuccess(false);
    setFormError(null);
  };

  const closeConsultation = () => {
    setIsConsultationOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCardPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * 3;
    const ry = (x - 0.5) * 4;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  };

  const handleCardPointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "";
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);

    const descriptionText = formScope.trim().length >= 20
      ? formScope.trim()
      : `Enquiry for ${formService}. Scope & timeline: ${formScope.trim() || "Immediate start required"}. Budget: ${formBudget}`;

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formName.trim(),
          email: formEmail.trim(),
          client_category: "Enterprise",
          project_type: formService,
          platform: "Both",
          budget_range: formBudget,
          timeline: "1-2 Months",
          contact_method: "Email",
          description: descriptionText,
          privacy_consent: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit discovery request");
      }

      setFormSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed. Please try again.";
      setFormError(msg);
    } finally {
      setFormSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormName("");
    setFormEmail("");
    setFormScope("");
    setFormSuccess(false);
    setFormError(null);
  };

  const activeDrawerProduct = selectedProductId ? PRODUCTS_DATA[selectedProductId] : null;

  return (
    <div className="bg-white text-charcoal selection:bg-royal selection:text-white relative font-sans">
      
      {/* DYNAMIC ISLAND NOTCH CONTAINER */}
      <div className="fixed top-3 sm:top-4 inset-x-0 z-50 px-3 sm:px-4 flex flex-col items-center pointer-events-none">
        <header
          id="navWrapper"
          className={`${
            isScrolled ? "nav-header-scrolled" : "nav-header-default"
          } flex items-center justify-between pointer-events-auto transition-all`}
        >
          {/* Brand Identity */}
          <a href="#hero" className="brand-element flex items-center space-x-2 sm:space-x-2.5 group shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-royal flex items-center justify-center text-white font-display font-bold text-[11px] sm:text-xs tracking-wider transition-transform duration-300 group-hover:scale-105 shadow-royal-glow shrink-0">
              CMS
            </div>
            <div className="brand-text whitespace-nowrap flex items-center">
              <span className="font-display font-bold text-charcoal tracking-tight text-[11px] sm:text-xs md:text-sm whitespace-nowrap leading-none">
                CROSS MOTIVE SERVICES
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            id="navLinks"
            className="hidden md:flex items-center space-x-1 lg:space-x-2 text-[12px] font-sans font-medium text-charcoal tracking-normal mx-auto"
          >
            <a href="#work" className="px-2.5 py-1.5 rounded-full hover:text-royal hover:bg-royal-soft transition-all whitespace-nowrap">
              Work
            </a>
            <a href="#services" className="px-2.5 py-1.5 rounded-full hover:text-royal hover:bg-royal-soft transition-all whitespace-nowrap">
              Services
            </a>
            <a href="#solutions" className="px-2.5 py-1.5 rounded-full hover:text-royal hover:bg-royal-soft transition-all whitespace-nowrap">
              Solutions
            </a>
            <a href="#engineering" className="px-2.5 py-1.5 rounded-full hover:text-royal hover:bg-royal-soft transition-all whitespace-nowrap">
              Engineering
            </a>
            <a href="#approach" className="px-2.5 py-1.5 rounded-full hover:text-royal hover:bg-royal-soft transition-all whitespace-nowrap">
              Approach
            </a>
            <Link href="/about" className="px-2.5 py-1.5 rounded-full hover:text-royal hover:bg-royal-soft transition-all whitespace-nowrap">
              About
            </Link>
          </nav>

          {/* Right Side Actions & Status */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* Desktop Start Project Button */}
            <button
              type="button"
              onClick={openConsultation}
              className="cta-default hidden md:inline-flex px-4 py-2 rounded-full bg-charcoal text-white font-sans font-semibold text-xs uppercase tracking-wider hover:bg-royal transition-all duration-300 shadow-subtle-lg hover:scale-105"
            >
              Start Project ↗
            </button>

            {/* Mobile Compact CTA Pill */}
            <button
              type="button"
              onClick={openConsultation}
              className="md:hidden px-3 py-1.5 rounded-full bg-royal text-white font-sans font-bold text-[10px] uppercase tracking-wider hover:bg-royal-dark transition-all shadow-royal-glow whitespace-nowrap"
            >
              Enquire ↗
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-full bg-canvas-warm border border-canvas-border flex items-center justify-center text-charcoal hover:border-royal transition-all shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <span className="font-mono text-base font-bold leading-none">&times;</span>
              ) : (
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Notch Compact CTA (Scrolled State on Desktop) */}
            <button
              type="button"
              onClick={openConsultation}
              className="cta-notch hidden md:inline-flex px-3 py-1.5 rounded-full bg-royal text-white font-sans font-bold text-[11px] uppercase tracking-wider hover:bg-royal-dark transition-all shadow-royal-glow"
            >
              Contact ↗
            </button>
          </div>
        </header>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="w-[calc(100vw-1.5rem)] max-w-sm mt-2 p-5 rounded-2xl bg-white/95 backdrop-blur-2xl border border-canvas-border shadow-2xl pointer-events-auto transition-all animate-fadeIn md:hidden">
            <div className="flex justify-between items-center pb-3 hairline-b mb-3">
              <span className="mono-tag text-royal font-bold text-[9px]">NAVIGATION MATRIX</span>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-royal animate-pulse"></span>
                <span className="mono-tag text-charcoal-subtle text-[8px]">ACTIVE</span>
              </div>
            </div>

            <div className="space-y-1 text-xs font-mono">
              <a
                href="#work"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl text-charcoal hover:bg-royal-soft hover:text-royal transition-all"
              >
                <span>01 // Work</span>
                <span className="text-royal">→</span>
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl text-charcoal hover:bg-royal-soft hover:text-royal transition-all"
              >
                <span>02 // Services</span>
                <span className="text-royal">→</span>
              </a>
              <a
                href="#solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl text-charcoal hover:bg-royal-soft hover:text-royal transition-all"
              >
                <span>03 // Solutions</span>
                <span className="text-royal">→</span>
              </a>
              <a
                href="#engineering"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl text-charcoal hover:bg-royal-soft hover:text-royal transition-all"
              >
                <span>04 // Engineering</span>
                <span className="text-royal">→</span>
              </a>
              <a
                href="#approach"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl text-charcoal hover:bg-royal-soft hover:text-royal transition-all"
              >
                <span>05 // Approach</span>
                <span className="text-royal">→</span>
              </a>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl text-charcoal hover:bg-royal-soft hover:text-royal transition-all"
              >
                <span>06 // About</span>
                <span className="text-royal">→</span>
              </Link>
            </div>

            <div className="pt-4 mt-3 hairline-t space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openConsultation();
                }}
                className="w-full py-3 rounded-full bg-royal text-white font-sans font-bold text-xs uppercase tracking-wider hover:bg-royal-dark transition-all shadow-royal-glow"
              >
                Start Project Discovery ↗
              </button>

              <a
                href="https://wa.me/919573963020?text=Hi%20CrossMotive%20Services%20Team%2C%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full bg-canvas-warm border border-canvas-border text-charcoal hover:border-royal text-center block font-sans font-semibold text-[11px] uppercase tracking-wider transition-all"
              >
                Chat on WhatsApp ↗
              </a>
            </div>
          </div>
        )}
      </div>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section id="hero" className="min-h-screen lg:h-screen lg:max-h-[980px] flex flex-col justify-center pt-20 sm:pt-24 lg:pt-16 pb-4 sm:pb-6 lg:pb-4 bg-white relative hairline-b overflow-hidden">
          {/* Subtle Ambient Radial Lighting */}
          <div
            className="pointer-events-none absolute -top-44 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-royal/5 via-royal/[0.02] to-transparent blur-3xl opacity-80"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 w-full relative z-10 my-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
              
              {/* Hero Copy (Left Column) */}
              <div className="lg:col-span-7 space-y-3 sm:space-y-4 lg:space-y-4.5 animate-in fade-in slide-in-from-bottom-3 duration-700">
                <div className="inline-flex items-center space-x-2 px-2.5 sm:px-3 py-1 rounded-full bg-royal-soft border border-royal-border max-w-full shadow-sm">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-royal animate-pulse shrink-0"></span>
                  <span className="mono-tag text-royal font-semibold text-[8px] sm:text-[9.5px] truncate">
                    DIGITAL PRODUCT &amp; ENGINEERING COMPANY
                  </span>
                </div>

                <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[58px] 2xl:text-[64px] text-charcoal tracking-tight leading-[1.05]">
                  <span className="block">We turn complex</span>
                  <span className="block">
                    ideas into <span className="text-royal">digital</span>
                  </span>
                  <span className="block text-royal min-h-[1.12em] whitespace-nowrap overflow-visible">
                    <span className="animate-gradient-text">
                      {displayText || "experiences."}
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-block w-[3px] sm:w-[4px] lg:w-[4.5px] h-[0.82em] bg-royal ml-1.5 sm:ml-2 animate-pulse align-baseline rounded-full shadow-[0_0_10px_rgba(30,64,175,0.7)]"
                    />
                  </span>
                </h1>

                <p className="text-xs sm:text-sm lg:text-[14.5px] text-charcoal-muted max-w-xl font-normal leading-relaxed">
                  We design, engineer and deliver digital products that help businesses move forward — from ambitious first launches to systems built for scale.
                </p>

                <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                  <button
                    type="button"
                    onClick={openConsultation}
                    className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-royal text-white font-sans font-semibold text-[11px] sm:text-xs uppercase tracking-wider hover:bg-royal-dark transition-all duration-300 shadow-royal-glow hover:scale-105 flex items-center gap-2 group"
                  >
                    <span>Build with us</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </button>

                  <a
                    href="#services"
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-canvas-warm border border-canvas-border text-charcoal hover:border-royal hover:bg-white font-sans font-semibold text-[11px] sm:text-xs uppercase tracking-wider transition-all hover:scale-105"
                  >
                    Explore capabilities ↘
                  </a>

                  <a
                    href="#capabilities"
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-canvas-warm border border-canvas-border text-charcoal hover:border-royal hover:bg-white font-sans font-semibold text-[11px] sm:text-xs uppercase tracking-wider transition-all hover:scale-105"
                  >
                    Engineering Stack ↘
                  </a>
                </div>

                {/* Hero Metrics Bar */}
                <div className="grid grid-cols-3 gap-3 sm:gap-5 pt-3.5 sm:pt-4 hairline-t max-w-xl">
                  <div>
                    <div className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-charcoal">99.99%</div>
                    <div className="mono-tag text-charcoal-subtle mt-0.5 text-[8px] sm:text-[9px]">Uptime SLA</div>
                  </div>
                  <div>
                    <div className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-royal">100%</div>
                    <div className="mono-tag text-charcoal-subtle mt-0.5 text-[8px] sm:text-[9px]">IP &amp; Repo Ownership</div>
                  </div>
                  <div>
                    <div className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-charcoal">&lt;20ms</div>
                    <div className="mono-tag text-charcoal-subtle mt-0.5 text-[8px] sm:text-[9px]">Edge Latency</div>
                  </div>
                </div>
              </div>

              {/* Luxury Architecture & Capabilities Deck (Right Column - replaces raw code widget) */}
              <div className="lg:col-span-5">
                <div className="organic-card p-4 sm:p-5 shadow-subtle-lg relative border border-black/[0.08] bg-white rounded-2xl sm:rounded-3xl">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-2.5 hairline-b mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-royal animate-pulse"></span>
                      <span className="mono-tag text-charcoal font-bold text-[10.5px]">
                        ENTERPRISE ARCHITECTURE DECK
                      </span>
                    </div>
                    <span className="mono-tag text-royal text-[9.5px] font-bold px-2 py-0.5 rounded bg-royal-soft">
                      SYSTEM READY
                    </span>
                  </div>

                  {/* Domain Selector Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 mb-3 p-1 rounded-xl bg-canvas-warm border border-canvas-border">
                    {(
                      [
                        { id: "web", label: "Web Apps" },
                        { id: "mobile", label: "Mobile" },
                        { id: "erp", label: "ERP & CRM" },
                        { id: "ai", label: "AI Systems" },
                      ] as const
                    ).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveDomain(item.id)}
                        className={`py-1.5 px-1.5 text-center rounded-lg font-mono text-[9.5px] font-semibold transition-all ${
                          activeDomain === item.id
                            ? "bg-white text-royal shadow-sm border border-royal-border"
                            : "text-charcoal-muted hover:text-charcoal"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Active Domain Showcase */}
                  <div className="space-y-2.5">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="mono-tag text-royal text-[9.5px] font-bold tracking-wider">
                          {STUDIO_DOMAINS[activeDomain].tag}
                        </span>
                        <span className="mono-tag text-charcoal-subtle text-[8.5px]">
                          {STUDIO_DOMAINS[activeDomain].category}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-charcoal mt-0.5">
                        {STUDIO_DOMAINS[activeDomain].title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-charcoal-muted mt-1 leading-relaxed line-clamp-2">
                        {STUDIO_DOMAINS[activeDomain].description}
                      </p>
                    </div>

                    {/* Telemetry Metrics Triplet */}
                    <div className="grid grid-cols-3 gap-1.5 py-2 px-2.5 rounded-lg bg-canvas-warm border border-canvas-border">
                      {STUDIO_DOMAINS[activeDomain].metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <div className="font-display font-bold text-xs sm:text-sm text-royal">{m.value}</div>
                          <div className="mono-tag text-[8px] text-charcoal-subtle mt-0.5 leading-tight">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Architecture Highlights */}
                    <div className="space-y-1 pt-0.5">
                      <div className="mono-tag text-[8.5px] text-charcoal-subtle font-bold">
                        SYSTEM HIGHLIGHTS
                      </div>
                      <div className="space-y-0.5">
                        {STUDIO_DOMAINS[activeDomain].highlights.map((h) => (
                          <div key={h} className="flex items-center space-x-1.5 text-xs text-charcoal">
                            <span className="w-1.5 h-1.5 rounded-full bg-royal shrink-0" />
                            <span className="font-medium text-[10.5px] truncate">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer / Trigger */}
                    <div className="pt-2.5 hairline-t flex items-center justify-between">
                      <div className="mono-tag text-[8.5px] text-charcoal-subtle">
                        {STUDIO_DOMAINS[activeDomain].compliance}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormService(STUDIO_DOMAINS[activeDomain].title);
                          openConsultation();
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-charcoal hover:bg-royal text-white font-sans font-semibold text-[10.5px] uppercase tracking-wider transition-all duration-200"
                      >
                        Discovery Blueprint ↗
                      </button>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 01 / WHAT WE DELIVER - CORE SERVICES */}
        <section id="services" className="py-24 bg-canvas-warm hairline-b">
          <span id="pillars" className="sr-only"></span>
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
            
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
              <div>
                <span className="mono-tag text-royal font-semibold tracking-widest text-[11px]">
                  — 01 / WHAT WE DELIVER
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-charcoal mt-2 tracking-tight">
                  One partner.<br />
                  <span className="italic font-serif font-normal text-charcoal">Every layer of digital.</span>
                </h2>
              </div>
              <p className="text-charcoal-muted max-w-lg text-sm sm:text-base font-normal leading-relaxed">
                From a focused MVP to a connected enterprise ecosystem, we bring the people and capabilities needed to take your product from concept to production.
              </p>
            </div>

            {/* Main Content Grid: Left Manifesto & Values / Right 8 Services */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              
              {/* Left Column: Philosophy, Value Pillars, Technical Discovery */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-charcoal tracking-tight leading-snug">
                    Technology should solve the hard parts — not add to them.
                  </h3>
                  <p className="text-sm text-charcoal-muted mt-3 leading-relaxed">
                    We combine product thinking, considered design and solid engineering to create solutions that make a measurable difference to the way you work.
                  </p>
                  <a
                    href="#what-we-deliver"
                    className="inline-flex items-center space-x-1.5 mono-tag text-royal font-bold text-[10px] mt-4 hover:underline"
                  >
                    <span>CROSS-FUNCTIONAL BY DESIGN</span>
                    <span>↗</span>
                  </a>
                </div>

                {/* 4 Value Checkmarks from user image */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-white border border-canvas-border shadow-sm">
                    <span className="w-5 h-5 rounded-full bg-royal/10 text-royal flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <h4 className="font-display font-bold text-sm text-charcoal">100% IP &amp; Repo Ownership</h4>
                      <p className="text-xs text-charcoal-muted mt-0.5 leading-relaxed">
                        Complete source code, schemas, and design token transfer with zero vendor lock-in.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-white border border-canvas-border shadow-sm">
                    <span className="w-5 h-5 rounded-full bg-royal/10 text-royal flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <h4 className="font-display font-bold text-sm text-charcoal">Bespoke ERP &amp; CRM Workflows</h4>
                      <p className="text-xs text-charcoal-muted mt-0.5 leading-relaxed">
                        Custom operational software engineered around your logic without recurring per-seat fees.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-white border border-canvas-border shadow-sm">
                    <span className="w-5 h-5 rounded-full bg-royal/10 text-royal flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <h4 className="font-display font-bold text-sm text-charcoal">Direct Senior Architect Access</h4>
                      <p className="text-xs text-charcoal-muted mt-0.5 leading-relaxed">
                        Work directly with full-stack engineers and designers — no middle account layers.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-white border border-canvas-border shadow-sm">
                    <span className="w-5 h-5 rounded-full bg-royal/10 text-royal flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <h4 className="font-display font-bold text-sm text-charcoal">Production-Grade Engineering</h4>
                      <p className="text-xs text-charcoal-muted mt-0.5 leading-relaxed">
                        Type-safe codebases, automated testing, scalable cloud deployment, and strict security.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical Discovery Box from image */}
                <div className="p-6 rounded-3xl bg-white border border-canvas-border shadow-subtle-lg space-y-3">
                  <span className="mono-tag text-royal font-bold text-[9px] tracking-widest">
                    TECHNICAL DISCOVERY
                  </span>
                  <h4 className="font-display font-bold text-lg text-charcoal">
                    Have a project or system to modernize?
                  </h4>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    Speak directly with an architect to review technical feasibility, timeline, and deliverables.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormService("Schedule Architecture Call");
                      openConsultation();
                    }}
                    className="w-full py-3.5 rounded-full bg-royal hover:bg-royal-dark text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-royal-glow"
                  >
                    Schedule Architecture Call ↗
                  </button>
                </div>

              </div>

              {/* Right Column: 8 Exact Services Grid from user images */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.values(PRODUCTS_DATA).map((serv) => (
                  <div
                    key={serv.id}
                    className="organic-card p-6 flex flex-col justify-between hover:border-royal transition-all duration-300 group bg-white shadow-sm"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="mono-tag text-royal font-bold text-[10px]">{serv.typeLabel}</span>
                        <button
                          type="button"
                          onClick={() => openDrawer(serv.id)}
                          className="text-charcoal-subtle group-hover:text-royal text-sm transition-colors"
                          aria-label={`Inspect ${serv.title}`}
                        >
                          ↗
                        </button>
                      </div>
                      <h3 className="font-display font-bold text-lg text-charcoal mb-2 group-hover:text-royal transition-colors">
                        {serv.title}
                      </h3>
                      <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                        {serv.desc}
                      </p>
                    </div>

                    <div className="pt-3 hairline-t flex items-center justify-between mt-auto">
                      <span className="mono-tag text-[9px] text-charcoal-subtle">
                        {serv.stack.slice(0, 2).join(" • ")}
                      </span>
                      <button
                        type="button"
                        onClick={() => openDrawer(serv.id)}
                        className="text-[10px] font-mono font-semibold text-royal hover:underline"
                      >
                        INSPECT ↗
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* 02 // ENGINEERING CAPABILITY (Screenshot 1) */}
        <section className="section engineering depth-section" id="engineering">
          <div id="capabilities" className="scroll-mt-24" />
          <div className="wrap engineering-inner">
            <div className="engineering-copy">
              <div className="mono">02 / Engineering capability</div>
              <h2>
                Thoughtful on the surface.
                <br />
                <em>Solid underneath.</em>
              </h2>
              <p>
                Great digital products need more than a polished interface. We connect frontend
                experiences to dependable backend systems, data, integrations and infrastructure.
              </p>
              <p>
                Our approach is pragmatic: choose the right tools for the problem, build for
                maintainability and leave room for the product to grow.
              </p>
              <div className="mt-8">
                <Link href="/technologies" className="text-link">
                  Explore full engineering stack &amp; frameworks ↗
                </Link>
              </div>
            </div>

            <div className="architecture">
              <div className="arch-top">
                <span>HOW THE PIECES CONNECT</span>
                <span>REFERENCE ARCHITECTURE / 01</span>
              </div>

              <div className="arch-stack">
                {ARCH_LAYERS.map((layer, index) => (
                  <React.Fragment key={layer.no}>
                    <div className="arch-layer">
                      <span className="layer-no">{layer.no}</span>
                      <strong>{layer.name}</strong>
                      <small>{layer.tech}</small>
                    </div>
                    {index < ARCH_LAYERS.length - 1 && <div className="arch-connect" />}
                  </React.Fragment>
                ))}
              </div>

              <div className="arch-foot">
                <span>MODULAR BY DESIGN</span>
                <Link href="/technologies" className="hover:text-blue-400 transition-colors">
                  BUILT FOR CHANGE ↗
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 03 // WHERE WE CREATE IMPACT */}
        <section className="section work depth-section scroll-mt-28" id="work">
          <div className="wrap">
            <div className="section-top mono">03 / Where we create impact</div>
            <div className="section-heading">
              <h2>
                Built for real
                <br />
                <em>business challenges.</em>
              </h2>
              <p>
                We work across product types and industries. Explore selected live deployments engineered for performance, scale, and 100% intellectual property ownership.
              </p>
            </div>

            {/* 6 Client Projects Showcase Grid - Rigid Horizontal & Slot Alignment */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
              {SHOWCASE_PROJECTS.map((proj, idx) => (
                <div
                  key={proj.title}
                  className="rounded-2xl bg-[#141e28] border border-white/10 hover:border-royal/50 hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col h-full"
                >
                  {/* Visual Preview / Thumbnail (Fixed 16:10 Aspect Ratio) */}
                  <div className="aspect-[16/10] w-full relative overflow-hidden bg-[#0e1620] border-b border-white/5 shrink-0">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-blue-400 border border-blue-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        <span>LIVE SYSTEM</span>
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 z-10">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[9px] font-mono text-blue-200 border border-white/10 font-bold">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body - Flex Column with Rigid Uniform Slots */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                    <div className="space-y-2.5">
                      {/* Category Slot (Fixed Height & Truncated) */}
                      <div className="mono text-[10px] text-royal-bright font-semibold uppercase tracking-wider h-4 flex items-center truncate">
                        {proj.category}
                      </div>

                      {/* Title Slot (Fixed Height, 1-Line Truncated with Hover Tooltip) */}
                      <h3
                        title={proj.title}
                        className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors h-7 sm:h-8 flex items-center truncate"
                      >
                        {proj.title}
                      </h3>

                      {/* Description Slot (Fixed 3-Line Uniform Height) */}
                      <p className="text-xs text-[#aebac5] leading-relaxed h-[54px] sm:h-[58px] line-clamp-3 overflow-hidden">
                        {proj.summary}
                      </p>

                      {/* Impact Highlight Slot (Fixed Height Across All Cards) */}
                      <div className="h-7 flex items-center pt-1">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-blue-300 bg-blue-950/60 border border-blue-500/30 px-2.5 py-1 rounded-md truncate max-w-full">
                          ⚡ {proj.impact}
                        </span>
                      </div>

                      {/* Tech Stack Chips Slot (Fixed Height & Single-Row Overflow Hidden) */}
                      <div className="flex flex-nowrap gap-1.5 h-7 overflow-hidden items-center pt-1">
                        {proj.stack.map((t) => (
                          <span
                            key={t}
                            className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#c5cdd4] border border-white/10 whitespace-nowrap shrink-0"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions Footer - Pinned to Bottom Across Entire Row */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 mt-4 shrink-0">
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex-1 text-center justify-center py-2.5 px-4 text-xs font-semibold"
                      >
                        <span>Visit Website</span>
                        <span>↗</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setFormService(proj.title);
                          openConsultation();
                        }}
                        className="px-3.5 py-2.5 rounded-full border border-white/15 hover:border-white text-xs font-mono text-[#aebac5] hover:text-white transition-colors cursor-pointer bg-transparent whitespace-nowrap"
                      >
                        Enquire ↗
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Consultation CTA Strip */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#141e28] border border-white/10 text-center max-w-3xl mx-auto my-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <div className="mono text-xs text-royal-bright uppercase tracking-wider mb-1 font-semibold">
                  100% CODE &amp; REPO OWNERSHIP
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  Have an ambitious platform or product in mind?
                </h4>
                <p className="text-xs text-[#aebac5] mt-1">
                  We engineer tailor-made digital systems with direct senior architect access.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormService("Custom System Architecture");
                  openConsultation();
                }}
                className="btn-primary shrink-0 py-3 px-6 text-xs font-bold"
              >
                <span>Start a Project</span>
                <span>↗</span>
              </button>
            </div>
          </div>
        </section>

        {/* 04 // WHO WE WORK WITH (Screenshot 3) */}
        <section className="section audience depth-section" id="solutions">
          <div id="audience" className="scroll-mt-24" />
          <div className="wrap">
            <div className="section-top mono">04 / Who we work with</div>
            <div className="section-heading">
              <h2>
                The right build
                <br />
                for <em>your stage.</em>
              </h2>
              <p>
                Whether you are validating an idea or modernising a business-critical system, we
                shape the engagement around your goals.
              </p>
            </div>

            <div className="audience-grid">
              {AUDIENCE_CARDS.map((card) => (
                <Link
                  key={card.no}
                  href={card.href}
                  className="audience-card block group"
                  onPointerMove={handleCardPointerMove}
                  onPointerLeave={handleCardPointerLeave}
                >
                  <span className="mono group-hover:text-[var(--blue)] transition-colors font-semibold">
                    {card.no}
                  </span>
                  <h3 className="group-hover:text-[var(--blue)] transition-colors">{card.title}</h3>
                  <p>{card.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 05 // HOW WE WORK (Screenshot 4) */}
        <section className="section process depth-section" id="approach">
          <div id="process" className="scroll-mt-24" />
          <div className="wrap">
            <div className="section-top mono">05 / How we work</div>
            <div className="section-heading">
              <h2>
                Clear steps.
                <br />
                <em>No black boxes.</em>
              </h2>
              <p>
                We keep the process collaborative and transparent, so you know what is happening,
                why it matters and what comes next.
              </p>
            </div>

            <div className="process-grid">
              {PROCESS_STEPS.map((step) => (
                <article key={step.step} className="process-step">
                  <span className="step-no">{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </article>
              ))}
            </div>

            <div className="mt-12 flex justify-end">
              <Link href="/process" className="text-link">
                Learn more about our methodology &amp; sprint cadence ↗
              </Link>
            </div>
          </div>
        </section>

        {/* 06 // START A CONVERSATION (Screenshot 5 Top) */}
        <section className="contact" id="contact">
          <div className="wrap contact-inner">
            <div>
              <div className="mono text-white/80">06 / Start a conversation</div>
              <h2>
                Have a challenge
                <br />
                worth <em>solving?</em>
              </h2>
            </div>

            <div className="contact-copy">
              <p>
                Tell us what you want to build, improve or make possible. Let's explore the right
                way to move it forward.
              </p>
              <button
                type="button"
                onClick={openConsultation}
                className="btn-primary"
              >
                <span>Talk to our team</span>
                <span>↗</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* LUXURY DARK FOOTER (Screenshot 5 Bottom) */}
      <footer className="footer">
        <div className="wrap">
          {/* Main 4-Column Grid */}
          <div className="footer-grid">
            {/* Column 1: Brand & Studio Mission */}
            <div className="footer-brand-col">
              <Link className="brand flex items-center gap-2 group" href="/">
                <span className="brand-symbol">CMS</span>
                <span className="text-white font-extrabold tracking-tight text-sm">
                  CROSS MOTIVE SERVICES
                </span>
              </Link>

              <p>
                From early-stage startup concepts to enterprise-grade platforms, we design,
                engineer, and launch digital experiences built for real-world impact.
              </p>

              <div className="footer-status-pill">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>BOOKING Q4 &amp; Q1 ENGAGEMENTS</span>
              </div>

              <div className="text-xs font-mono text-[#8c9da8] space-y-1 pt-2">
                <div>
                  Direct:{" "}
                  <a
                    href="mailto:sahith@crossmotiveservices.com"
                    className="text-white hover:text-blue-400 underline transition-colors break-all"
                  >
                    sahith@crossmotiveservices.com
                  </a>
                </div>
                <div className="text-[#697885]">Bangalore · Global Remote Delivery</div>
              </div>
            </div>

            {/* Column 2: Core Services */}
            <div className="footer-col">
              <h5>Services</h5>
              <ul>
                <li>
                  <Link href="/services/web-development">Web Applications</Link>
                </li>
                <li>
                  <Link href="/services/mobile-app-development">Mobile Apps</Link>
                </li>
                <li>
                  <Link href="/services/erp-crm-solutions">ERP &amp; CRM Solutions</Link>
                </li>
                <li>
                  <Link href="/services/enterprise-solutions">Enterprise Systems</Link>
                </li>
                <li>
                  <Link href="/services/ai-product-development">AI &amp; Automation</Link>
                </li>
                <li>
                  <Link href="/services/ui-ux-design">UI/UX &amp; Product Design</Link>
                </li>
                <li>
                  <Link href="/services/mvp-development">Startup MVP Development</Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Solutions & Architecture */}
            <div className="footer-col">
              <h5>Solutions &amp; Stack</h5>
              <ul>
                <li>
                  <Link href="/solutions/startups">For Startups</Link>
                </li>
                <li>
                  <Link href="/solutions/enterprise">For Enterprises</Link>
                </li>
                <li>
                  <Link href="/solutions/businesses">For Businesses</Link>
                </li>
                <li>
                  <Link href="/solutions/individuals">For Individuals &amp; Creators</Link>
                </li>
                <li>
                  <Link href="/technologies">Engineering Architecture</Link>
                </li>
                <li>
                  <Link href="/process">Product Methodology</Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Company & Legal */}
            <div className="footer-col">
              <h5>Company &amp; Legal</h5>
              <ul>
                <li>
                  <Link href="/work">Selected Work</Link>
                </li>
                <li>
                  <Link href="/about">About Cross Motive</Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={openConsultation}
                    className="text-left text-[#8c9da8] hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-0 p-0 text-sm inline-flex items-center gap-1"
                  >
                    Start a Project ↗
                  </button>
                </li>
                <li>
                  <Link href="/faq">Frequently Asked Questions</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms &amp; Conditions</Link>
                </li>
                <li>
                  <Link href="/admin" className="text-[#697885] hover:text-white">
                    Content Admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Signature Bar */}
          <div className="footer-bottom flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8c9da8]">
            <div>
              &copy; {new Date().getFullYear()} Cross Motive Services. All rights reserved.
            </div>

            <div className="hidden md:inline-block tracking-wider text-[#7e8e9b]">
              DESIGN / ENGINEERING / DELIVERY &middot; 100% CODE OWNERSHIP
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-[#aebac5] hover:text-blue-400 transition-colors cursor-pointer bg-transparent border-none"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <span>&uarr;</span>
            </button>
          </div>
        </div>
      </footer>

      {/* PRODUCT INSPECTOR SIDE DRAWER */}
      <div
        id="productDrawer"
        className={`fixed inset-0 z-50 flex justify-end bg-charcoal/60 backdrop-blur-md transition-all ${
          selectedProductId && activeDrawerProduct ? "" : "hidden pointer-events-none"
        }`}
      >
        <div className="w-full max-w-xl bg-white border-l border-canvas-border p-7 sm:p-9 flex flex-col justify-between overflow-y-auto shadow-2xl">
          <div>
            <div className="flex justify-between items-start pb-5 hairline-b mb-6">
              <div>
                <span id="drawerModCat" className="mono-tag text-royal font-bold">
                  {activeDrawerProduct?.category || "MODULE SPECIFICATION"}
                </span>
                <h3 id="drawerModTitle" className="font-display font-bold text-2xl text-charcoal mt-1">
                  {activeDrawerProduct?.title || "Product Title"}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="text-charcoal-subtle hover:text-charcoal text-2xl font-mono leading-none p-1"
                aria-label="Close Drawer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-6 text-sm">
              <p id="drawerModDesc" className="text-charcoal-muted font-normal leading-relaxed">
                {activeDrawerProduct?.desc || "System overview details will appear here."}
              </p>

              <div className="p-5 rounded-2xl bg-canvas-warm border border-canvas-border">
                <div className="mono-tag text-charcoal mb-3 font-bold">RECOMMENDED TECH STACK</div>
                <div id="drawerModStack" className="flex flex-wrap gap-2">
                  {activeDrawerProduct?.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-white border border-canvas-border text-royal font-mono text-xs font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-canvas-warm border border-canvas-border">
                  <div className="mono-tag text-charcoal-subtle">SECURITY CERTIFICATION</div>
                  <div id="drawerModSecurity" className="font-mono text-sm font-bold text-royal mt-1">
                    {activeDrawerProduct?.security || "SOC-2 Type II"}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-canvas-warm border border-canvas-border">
                  <div className="mono-tag text-charcoal-subtle">ESTIMATED DEPLOYMENT</div>
                  <div id="drawerModDeploy" className="font-mono text-sm font-bold text-charcoal mt-1">
                    {activeDrawerProduct?.deploy || "3-4 Weeks"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 hairline-t flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={closeDrawer}
              className="font-mono text-xs text-charcoal-subtle hover:text-charcoal"
            >
              CLOSE
            </button>
            <button
              type="button"
              onClick={() => {
                closeDrawer();
                openConsultation();
              }}
              className="px-6 py-3 rounded-full bg-royal text-white font-sans font-semibold text-xs uppercase tracking-wider hover:bg-royal-dark transition-all"
            >
              DISCOVERY BLUEPRINT ↗
            </button>
          </div>
        </div>
      </div>

      {/* CONSULTATION FORM MODAL */}
      <div
        id="consultationModal"
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-md transition-all ${
          isConsultationOpen ? "" : "hidden pointer-events-none"
        }`}
      >
        <div className="bg-white max-w-lg w-full p-7 sm:p-9 rounded-3xl shadow-2xl relative border border-canvas-border max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center pb-4 hairline-b mb-6">
            <div>
              <span className="mono-tag text-royal font-bold">BUILD DISCOVERY</span>
              <h3 className="font-display font-bold text-2xl text-charcoal mt-1">Initiate Project</h3>
            </div>
            <button
              type="button"
              onClick={closeConsultation}
              className="text-charcoal-subtle hover:text-charcoal text-2xl font-mono leading-none p-1"
              aria-label="Close Modal"
            >
              &times;
            </button>
          </div>

          {!formSuccess ? (
            <form id="consultationForm" onSubmit={handleFormSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-mono">
                  {formError}
                </div>
              )}

              <div>
                <label className="block mono-tag text-charcoal-subtle mb-1.5">FULL NAME *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Alexander Wright"
                  className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal text-sm focus:outline-none focus:border-royal"
                />
              </div>

              <div>
                <label className="block mono-tag text-charcoal-subtle mb-1.5">WORK EMAIL *</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal text-sm focus:outline-none focus:border-royal"
                />
              </div>

              <div>
                <label className="block mono-tag text-charcoal-subtle mb-1.5">PRIMARY SERVICE *</label>
                <select
                  value={formService}
                  onChange={(e) => setFormService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal text-sm focus:outline-none focus:border-royal"
                >
                  <option value="Web applications">Web applications</option>
                  <option value="Mobile applications">Mobile applications</option>
                  <option value="ERP & CRM Solutions">ERP & CRM Solutions</option>
                  <option value="Enterprise solutions">Enterprise solutions</option>
                  <option value="AI & automation">AI & automation</option>
                  <option value="Startup MVP development">Startup MVP development</option>
                  <option value="Product design">Product design</option>
                  <option value="Backend & cloud">Backend & cloud</option>
                  <option value="Schedule Architecture Call">Schedule Architecture Call</option>
                </select>
              </div>

              {/* ESTIMATED BUDGET RANGE IN INR (Starts from ₹25,000) */}
              <div>
                <label className="block mono-tag text-charcoal-subtle mb-1.5">ESTIMATED BUDGET RANGE (INR) *</label>
                <select
                  value={formBudget}
                  onChange={(e) => setFormBudget(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal text-sm focus:outline-none focus:border-royal font-mono font-medium"
                >
                  <option value="₹25,000 - ₹50,000 (Starter / MVP)">₹25,000 – ₹50,000 (Starter / MVP)</option>
                  <option value="₹50,000 - ₹1,50,000 (Growth Platform)">₹50,000 – ₹1,50,000 (Growth Platform)</option>
                  <option value="₹1,50,000 - ₹3,00,000 (Advanced SaaS / App)">₹1,50,000 – ₹3,00,000 (Advanced SaaS / App)</option>
                  <option value="₹3,00,000 - ₹5,00,000+ (Enterprise Architecture)">₹3,00,000 – ₹5,00,000+ (Enterprise Architecture)</option>
                </select>
              </div>

              <div>
                <label className="block mono-tag text-charcoal-subtle mb-1.5">PROJECT SCOPE &amp; TIMELINE</label>
                <textarea
                  rows={3}
                  value={formScope}
                  onChange={(e) => setFormScope(e.target.value)}
                  placeholder="Briefly summarize technical scope, desired timeline, or objectives..."
                  className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal text-sm focus:outline-none focus:border-royal"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full py-3.5 rounded-full bg-royal text-white font-sans font-semibold text-xs uppercase tracking-wider hover:bg-royal-dark transition-all disabled:opacity-60 shadow-royal-glow"
              >
                {formSubmitting ? "DISPATCHING ENQUIRY..." : "SUBMIT DISCOVERY REQUEST ↗"}
              </button>
            </form>
          ) : (
            <div id="consultationSuccess" className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-royal-soft text-royal flex items-center justify-center mx-auto text-xl font-bold shadow-royal-glow">
                ✓
              </div>
              <h4 className="font-display font-bold text-xl text-charcoal">Request Dispatched</h4>
              <p className="text-xs text-charcoal-muted max-w-sm mx-auto leading-relaxed">
                A senior solutions architect from CrossMotive Services will contact you at{" "}
                <span className="font-semibold text-royal">{formEmail}</span> within 24 hours.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2 rounded-full border border-canvas-border text-xs font-mono text-charcoal-subtle hover:text-charcoal"
                >
                  RESET
                </button>
                <button
                  type="button"
                  onClick={closeConsultation}
                  className="px-5 py-2 rounded-full bg-charcoal text-white text-xs font-mono hover:bg-royal transition-all"
                >
                  DONE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
