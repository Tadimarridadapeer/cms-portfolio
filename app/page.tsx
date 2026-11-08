"use client";

import React, { useState, useEffect } from "react";

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
    title: "OmniCMS Headless",
    category: "ENTERPRISE CMS",
    type: "cms",
    typeLabel: "ENTERPRISE CMS",
    desc: "Designed for enterprise multi-brand web properties requiring rapid, localized content publishing across web, mobile, and digital kiosks.",
    stack: ["Next.js 14", "GraphQL API", "PostgreSQL", "Redis"],
    security: "SOC-2 Type II Certified",
    deploy: "3-4 Weeks",
  },
  2: {
    id: 2,
    title: "Atlas Cloud Lake",
    category: "DATA WAREHOUSE",
    type: "saas",
    typeLabel: "DATA LAKE",
    desc: "High-throughput data streaming platform syncing analytics events with sub-second aggregate query resolution.",
    stack: ["ClickHouse", "Go", "Kafka", "Redis Cache"],
    security: "ISO 27001 Certified",
    deploy: "4 Weeks",
  },
  3: {
    id: 3,
    title: "FieldSync Mobile",
    category: "MOBILE SUITE",
    type: "cms",
    typeLabel: "MOBILE SUITE",
    desc: "Offline-first native mobile application suite with cryptographic offline transaction synchronization.",
    stack: ["Swift (iOS)", "Kotlin (Android)", "SQLite", "AWS SNS"],
    security: "AES-256 Encrypted",
    deploy: "4-6 Weeks",
  },
  4: {
    id: 4,
    title: "Workflow Hub Engine",
    category: "SAAS AUTOMATION",
    type: "saas",
    typeLabel: "AUTOMATION",
    desc: "Event-driven microservices workflow engine with low-code trigger configuration and asynchronous queueing.",
    stack: ["Go Engine", "RabbitMQ", "Kubernetes", "Vue 3"],
    security: "OAuth2 & SAML 2.0",
    deploy: "3 Weeks",
  },
  5: {
    id: 5,
    title: "Nexus Portal System",
    category: "CLIENT PORTAL",
    type: "cms",
    typeLabel: "CLIENT PORTAL",
    desc: "Secure customer management portal featuring automated billing, subscription tiers, and encrypted file sharing.",
    stack: ["React", "Tailwind CSS", "Node.js", "Stripe API"],
    security: "PCI-DSS Level 1",
    deploy: "3-4 Weeks",
  },
  6: {
    id: 6,
    title: "Aether API Proxy",
    category: "API GATEWAY",
    type: "saas",
    typeLabel: "API GATEWAY",
    desc: "High-performance microservices API proxy handling rate limiting, JWT auth token verification, and telemetry.",
    stack: ["Go", "Envoy Proxy", "Redis", "Prometheus"],
    security: "WAF Protected",
    deploy: "2 Weeks",
  },
  7: {
    id: 7,
    title: "Cognitive RAG Agent",
    category: "AI / RAG ENGINE",
    type: "saas",
    typeLabel: "AI & RAG",
    desc: "Retrieval-augmented generation engine powering accurate semantic knowledge search across corporate repositories.",
    stack: ["Python", "Pinecone Vector DB", "OpenAI API", "FastAPI"],
    security: "Zero Retention SLA",
    deploy: "3 Weeks",
  },
  8: {
    id: 8,
    title: "Sentry SSO Engine",
    category: "SECURITY IAM",
    type: "cms",
    typeLabel: "SECURITY IAM",
    desc: "Identity access management server featuring single sign-on, WebAuthn biometric security, and SAML 2.0 integration.",
    stack: ["Node.js", "SAML 2.0", "OpenID Connect", "Redis"],
    security: "FIPS 140-2 Compliant",
    deploy: "3 Weeks",
  },
};

const ARCH_LOGS: Record<number, string> = {
  1: "Selected: Layer 01 Client Experience Tier active (SSR Edge rendering < 12ms).",
  2: "Selected: Layer 02 Microservices & API Gateway active (Go proxy routing OK).",
  3: "Selected: Layer 03 Persistence Tier active (PostgreSQL & Redis Lake OK).",
  4: "Selected: Layer 04 Cloud Infrastructure active (AWS EKS & Terraform OK).",
};

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroPreview, setHeroPreview] = useState<"mesh" | "cache">("mesh");
  const [productFilter, setProductFilter] = useState<"all" | "cms" | "saas">("all");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedArchLayer, setSelectedArchLayer] = useState<number>(1);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Consultation form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formService, setFormService] = useState("Custom Enterprise CMS");
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
      <div className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center items-center pointer-events-none">
        <header
          id="navWrapper"
          className={`${
            isScrolled ? "nav-header-scrolled" : "nav-header-default"
          } flex items-center justify-between pointer-events-auto transition-all`}
        >
          {/* Brand Identity */}
          <a href="#hero" className="brand-element flex items-center space-x-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-full bg-royal flex items-center justify-center text-white font-display font-bold text-xs tracking-wider transition-transform duration-300 group-hover:scale-105 shadow-royal-glow">
              CMS
            </div>
            <div className="brand-text">
              <span className="font-display font-bold text-charcoal tracking-tight text-xs block leading-none">
                CROSSMOTIVE
              </span>
              <span className="mono-tag text-royal text-[8px] font-semibold">SERVICES</span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav
            id="navLinks"
            className="flex items-center space-x-1 sm:space-x-2 text-[11px] font-mono tracking-wider text-charcoal-muted font-medium mx-auto"
          >
            <a href="#pillars" className="px-2.5 py-1.5 rounded-full hover:text-royal hover:bg-royal-soft transition-all whitespace-nowrap">
              Pillars
            </a>
            <a href="#products" className="px-2.5 py-1.5 rounded-full hover:text-royal hover:bg-royal-soft transition-all whitespace-nowrap">
              Solutions
            </a>
            <a href="#architecture" className="px-2.5 py-1.5 rounded-full hover:text-royal hover:bg-royal-soft transition-all whitespace-nowrap">
              Architecture
            </a>
            <a href="#process" className="hidden sm:inline-block px-2.5 py-1.5 rounded-full hover:text-royal hover:bg-royal-soft transition-all whitespace-nowrap">
              Process
            </a>
            <a href="#serve" className="hidden md:inline-block px-2.5 py-1.5 rounded-full hover:text-royal hover:bg-royal-soft transition-all whitespace-nowrap">
              Clients
            </a>
          </nav>

          {/* Right Side Actions & Status */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Operational Status Pill */}
            <div className="live-element hidden xl:flex items-center space-x-2 px-3 py-1 rounded-full bg-royal-soft border border-royal-border">
              <span className="w-2 h-2 rounded-full bg-royal animate-pulse"></span>
              <span className="mono-tag text-royal text-[9px] font-semibold">ONLINE</span>
            </div>

            {/* Default Large CTA */}
            <button
              onClick={openConsultation}
              className="cta-default px-4 py-2 rounded-full bg-charcoal text-white font-sans font-semibold text-xs uppercase tracking-wider hover:bg-royal transition-all duration-300 shadow-subtle-lg hover:scale-105"
            >
              Start Project ↗
            </button>

            {/* Notch Compact CTA (Scrolled State) */}
            <button
              onClick={openConsultation}
              className="cta-notch px-3 py-1.5 rounded-full bg-royal text-white font-sans font-bold text-[11px] uppercase tracking-wider hover:bg-royal-dark transition-all shadow-royal-glow"
            >
              Contact ↗
            </button>
          </div>
        </header>
      </div>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section id="hero" className="pt-36 pb-20 md:pt-44 md:pb-28 bg-white relative hairline-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Hero Copy */}
              <div className="lg:col-span-7 space-y-7">
                <div className="inline-flex items-center space-x-3 px-3.5 py-1.5 rounded-full bg-royal-soft border border-royal-border">
                  <span className="w-2 h-2 rounded-full bg-royal"></span>
                  <span className="mono-tag text-royal font-semibold">CROSSMOTIVE SERVICES // ENTERPRISE IT</span>
                </div>

                <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-charcoal tracking-tight leading-[1.04]">
                  Engineering Resilient <span className="text-royal block">Digital Systems.</span>
                </h1>

                <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl font-normal leading-relaxed">
                  CrossMotive Services (CMS Tech) delivers full-spectrum IT software engineering—building enterprise headless CMS, multi-tenant SaaS engines, native mobile apps, and high-throughput cloud databases.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#pillars"
                    className="px-7 py-3.5 rounded-full bg-royal text-white font-sans font-semibold text-xs uppercase tracking-wider hover:bg-royal-dark transition-all duration-300 shadow-royal-glow hover:scale-105"
                  >
                    Explore 8 Capabilities ↗
                  </a>
                  <a
                    href="#architecture"
                    className="px-7 py-3.5 rounded-full bg-canvas-warm border border-canvas-border text-charcoal hover:border-royal font-sans font-semibold text-xs uppercase tracking-wider transition-all hover:scale-105"
                  >
                    Inspect Layer Stack
                  </a>
                </div>

                {/* Hero Metrics Bar */}
                <div className="grid grid-cols-3 gap-6 pt-6 hairline-t max-w-xl">
                  <div>
                    <div className="font-display font-bold text-2xl text-charcoal">99.99%</div>
                    <div className="mono-tag text-charcoal-subtle mt-1">Uptime SLA</div>
                  </div>
                  <div>
                    <div className="font-display font-bold text-2xl text-royal">8 Modules</div>
                    <div className="mono-tag text-charcoal-subtle mt-1">SaaS Architecture</div>
                  </div>
                  <div>
                    <div className="font-display font-bold text-2xl text-charcoal">&lt;20ms</div>
                    <div className="mono-tag text-charcoal-subtle mt-1">Edge Latency</div>
                  </div>
                </div>
              </div>

              {/* Interactive System Preview Card */}
              <div className="lg:col-span-5">
                <div className="organic-card p-6 shadow-subtle-lg relative">
                  <div className="flex items-center justify-between pb-4 hairline-b mb-5">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-royal"></span>
                      <span className="mono-tag text-charcoal font-bold">TELEMETRY MATRIX</span>
                    </div>
                    <span className="mono-tag text-royal text-[10px] font-bold">NODE-CMS-01</span>
                  </div>

                  {/* Code Preview Box */}
                  <div className="bg-charcoal rounded-xl p-5 text-white font-mono text-xs space-y-3 shadow-inner">
                    <div className="flex justify-between text-slate-400 text-[11px] pb-2 border-b border-white/10">
                      <span>crossmotive-system.config.ts</span>
                      <span className="text-emerald-400 font-bold">SYS_ONLINE</span>
                    </div>
                    <pre className="text-slate-300 overflow-x-auto leading-relaxed">
                      <code>
                        <span className="text-royal-bright">import</span> &#123; CMSCore &#125;{" "}
                        <span className="text-royal-bright">from</span>{" "}
                        <span className="text-emerald-300">&apos;@crossmotive/core&apos;</span>;
                        {"\n\n"}
                        <span className="text-royal-bright">export const</span> enterpriseStack = &#123;
                        {"\n"}  <span className="text-slate-400">cms:</span>{" "}
                        <span className="text-amber-300">&apos;OmniHeadless Matrix v4.2&apos;</span>,
                        {"\n"}  <span className="text-slate-400">database:</span>{" "}
                        <span className="text-amber-300">&apos;PostgreSQL Data Lake&apos;</span>,
                        {"\n"}  <span className="text-slate-400">security:</span>{" "}
                        <span className="text-amber-300">&apos;SOC-2 / SAML 2.0 Auth&apos;</span>,
                        {"\n"}  <span className="text-slate-400">throughput:</span>{" "}
                        <span className="text-emerald-400">&apos;50,000 req/sec&apos;</span>
                        {"\n"}&#125;;
                      </code>
                    </pre>
                  </div>

                  {/* Interactive Runtime Toggle Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <button
                      type="button"
                      onClick={() => setHeroPreview("mesh")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        heroPreview === "mesh"
                          ? "bg-royal-soft border-royal text-charcoal"
                          : "bg-canvas-warm border-canvas-border hover:border-royal"
                      }`}
                    >
                      <span className="mono-tag text-royal block font-bold">TIER 01</span>
                      <span className="text-xs font-semibold text-charcoal">Microservices Mesh</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroPreview("cache")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        heroPreview === "cache"
                          ? "bg-royal-soft border-royal text-charcoal"
                          : "bg-canvas-warm border-canvas-border hover:border-royal"
                      }`}
                    >
                      <span className="mono-tag text-charcoal-subtle block font-bold">TIER 02</span>
                      <span className="text-xs font-semibold text-charcoal">Redis Cache Lake</span>
                    </button>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-royal-soft border border-royal-border font-mono text-[11px] text-royal flex items-center justify-between">
                    <span>
                      {heroPreview === "mesh"
                        ? "Selected: Microservices Mesh active with zero packet loss."
                        : "Selected: Redis Cache Lake active (99.8% cache hit ratio)."}
                    </span>
                    <span className="font-bold">{heroPreview === "mesh" ? "2.4ms" : "0.8ms"}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CORE 8 IT CAPABILITIES PILLARS */}
        <section id="pillars" className="py-24 bg-canvas-warm hairline-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
              <div>
                <span className="mono-tag text-royal font-semibold">01 // TECHNICAL CAPABILITIES</span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal mt-2">
                  8 Core Engineering Pillars
                </h2>
              </div>
              <p className="text-charcoal-muted max-w-md text-sm mt-3 md:mt-0 font-normal leading-relaxed">
                Full-spectrum software architecture built for performance, security, and scalable expansion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1 */}
              <div className="organic-card p-6 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-royal-soft border border-royal-border flex items-center justify-center text-royal font-mono font-bold text-xs mb-4">
                    01
                  </div>
                  <h3 className="font-display font-bold text-base text-charcoal mb-2">Custom Enterprise CMS</h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                    Headless content engines with multi-tenant permissions, localized publishing, and GraphQL flexibility.
                  </p>
                </div>
                <div className="mono-tag text-royal mt-5 font-semibold">HEADLESS PLATFORMS</div>
              </div>

              {/* Pillar 2 */}
              <div className="organic-card p-6 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-canvas-warm border border-canvas-border flex items-center justify-center text-charcoal font-mono font-bold text-xs mb-4">
                    02
                  </div>
                  <h3 className="font-display font-bold text-base text-charcoal mb-2">Multi-Tenant SaaS</h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                    Scalable subscription platforms engineered with schema isolation, usage analytics, and Stripe billing engines.
                  </p>
                </div>
                <div className="mono-tag text-charcoal-subtle mt-5">SAAS ARCHITECTURE</div>
              </div>

              {/* Pillar 3 */}
              <div className="organic-card p-6 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-canvas-warm border border-canvas-border flex items-center justify-center text-charcoal font-mono font-bold text-xs mb-4">
                    03
                  </div>
                  <h3 className="font-display font-bold text-base text-charcoal mb-2">Cloud Database Systems</h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                    High-speed PostgreSQL clusters, Redis caching layers, and real-time analytical data lake pipelines.
                  </p>
                </div>
                <div className="mono-tag text-charcoal-subtle mt-5">HIGH-THROUGHPUT DATA</div>
              </div>

              {/* Pillar 4 */}
              <div className="organic-card p-6 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-canvas-warm border border-canvas-border flex items-center justify-center text-charcoal font-mono font-bold text-xs mb-4">
                    04
                  </div>
                  <h3 className="font-display font-bold text-base text-charcoal mb-2">Web Applications</h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                    High-performance Progressive Web Apps built with Next.js, Server-Side Rendering, and edge CDN deployments.
                  </p>
                </div>
                <div className="mono-tag text-charcoal-subtle mt-5">ULTRA-FAST SSR</div>
              </div>

              {/* Pillar 5 */}
              <div className="organic-card p-6 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-canvas-warm border border-canvas-border flex items-center justify-center text-charcoal font-mono font-bold text-xs mb-4">
                    05
                  </div>
                  <h3 className="font-display font-bold text-base text-charcoal mb-2">Mobile Engineering</h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                    Native Swift (iOS) & Kotlin (Android) apps alongside high-performance React Native and Flutter builds.
                  </p>
                </div>
                <div className="mono-tag text-charcoal-subtle mt-5">IOS & ANDROID NATIVE</div>
              </div>

              {/* Pillar 6 */}
              <div className="organic-card p-6 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-canvas-warm border border-canvas-border flex items-center justify-center text-charcoal font-mono font-bold text-xs mb-4">
                    06
                  </div>
                  <h3 className="font-display font-bold text-base text-charcoal mb-2">AI Agents & RAG</h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                    LLM integration, custom retrieval-augmented generation pipelines, and vector database query acceleration.
                  </p>
                </div>
                <div className="mono-tag text-charcoal-subtle mt-5">INTELLIGENT AGENTS</div>
              </div>

              {/* Pillar 7 */}
              <div className="organic-card p-6 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-canvas-warm border border-canvas-border flex items-center justify-center text-charcoal font-mono font-bold text-xs mb-4">
                    07
                  </div>
                  <h3 className="font-display font-bold text-base text-charcoal mb-2">Microservices & APIs</h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                    Decoupled RESTful & GraphQL API gateways, asynchronous event broker messaging, and legacy integrations.
                  </p>
                </div>
                <div className="mono-tag text-charcoal-subtle mt-5">API GATEWAY SYSTEMS</div>
              </div>

              {/* Pillar 8 */}
              <div className="organic-card p-6 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-canvas-warm border border-canvas-border flex items-center justify-center text-charcoal font-mono font-bold text-xs mb-4">
                    08
                  </div>
                  <h3 className="font-display font-bold text-base text-charcoal mb-2">UI/UX Architecture</h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                    Accessible design systems, high-density dashboard user experience layouts, and modular component libraries.
                  </p>
                </div>
                <div className="mono-tag text-charcoal-subtle mt-5">DESIGN SYSTEMS</div>
              </div>
            </div>
          </div>
        </section>

        {/* 8 SAAS & CMS PRODUCT SOLUTIONS MATRIX */}
        <section id="products" className="py-24 bg-white hairline-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
              <div>
                <span className="mono-tag text-royal font-semibold">02 // READY SOLUTIONS MATRIX</span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal mt-2">
                  8 Ready Product Modules
                </h2>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 mt-5 md:mt-0">
                <button
                  type="button"
                  onClick={() => setProductFilter("all")}
                  className={`prod-filter-btn px-4 py-1.5 rounded-full font-mono text-xs font-semibold transition-all ${
                    productFilter === "all"
                      ? "border border-royal bg-royal text-white"
                      : "border border-canvas-border bg-canvas-warm text-charcoal-muted hover:text-charcoal"
                  }`}
                >
                  ALL (8)
                </button>
                <button
                  type="button"
                  onClick={() => setProductFilter("cms")}
                  className={`prod-filter-btn px-4 py-1.5 rounded-full font-mono text-xs font-semibold transition-all ${
                    productFilter === "cms"
                      ? "border border-royal bg-royal text-white"
                      : "border border-canvas-border bg-canvas-warm text-charcoal-muted hover:text-charcoal"
                  }`}
                >
                  CMS & PORTALS
                </button>
                <button
                  type="button"
                  onClick={() => setProductFilter("saas")}
                  className={`prod-filter-btn px-4 py-1.5 rounded-full font-mono text-xs font-semibold transition-all ${
                    productFilter === "saas"
                      ? "border border-royal bg-royal text-white"
                      : "border border-canvas-border bg-canvas-warm text-charcoal-muted hover:text-charcoal"
                  }`}
                >
                  SAAS ENGINES
                </button>
              </div>
            </div>

            {/* 8 Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="productGrid">
              {Object.values(PRODUCTS_DATA).map((prod) => {
                const isVisible = productFilter === "all" || prod.type === productFilter;
                if (!isVisible) return null;

                return (
                  <div
                    key={prod.id}
                    className="organic-card p-6 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="mono-tag text-royal font-bold">MOD 0{prod.id}</span>
                        <span className="mono-tag text-charcoal-subtle">{prod.typeLabel}</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-charcoal mb-2">{prod.title}</h3>
                      <p className="text-xs text-charcoal-muted mb-5 leading-relaxed">{prod.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openDrawer(prod.id)}
                      className="w-full py-2 rounded-full border border-royal text-royal hover:bg-royal hover:text-white font-mono text-xs font-semibold transition-all"
                    >
                      INSPECT STACK ↗
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ENTERPRISE ARCHITECTURE VISUALIZER */}
        <section id="architecture" className="py-24 bg-canvas-warm hairline-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="mono-tag text-royal font-semibold">03 // SYSTEM ARCHITECTURE</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal mt-2">
                Enterprise Layer Visualizer
              </h2>
              <p className="text-charcoal-muted mt-2 text-sm font-normal">
                Click any architecture tier to inspect component dependencies and telemetry protocols.
              </p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {/* Layer 1 */}
              <div
                onClick={() => setSelectedArchLayer(1)}
                className={`organic-card p-6 cursor-pointer border-l-4 transition-all ${
                  selectedArchLayer === 1 ? "border-l-royal shadow-subtle-lg" : "border-l-charcoal"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`mono-tag font-bold ${selectedArchLayer === 1 ? "text-royal" : "text-charcoal"}`}>
                    LAYER 01 // PRESENTATION &amp; UX
                  </span>
                  <span className="mono-tag text-charcoal-subtle">NEXT.JS 14 / SWIFT / FLUTTER</span>
                </div>
                <h3 className="font-display font-bold text-xl text-charcoal">Client Experience Tier</h3>
                <p className="text-xs text-charcoal-muted mt-1 font-normal">
                  Edge-rendered web platforms, native mobile clients, and high-density dashboard interfaces.
                </p>
              </div>

              {/* Layer 2 */}
              <div
                onClick={() => setSelectedArchLayer(2)}
                className={`organic-card p-6 cursor-pointer border-l-4 transition-all ${
                  selectedArchLayer === 2 ? "border-l-royal shadow-subtle-lg" : "border-l-charcoal"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`mono-tag font-bold ${selectedArchLayer === 2 ? "text-royal" : "text-charcoal"}`}>
                    LAYER 02 // APPLICATION SERVICES
                  </span>
                  <span className="mono-tag text-charcoal-subtle">GO / NODE.JS / GRAPHQL</span>
                </div>
                <h3 className="font-display font-bold text-xl text-charcoal">Microservices &amp; API Gateway</h3>
                <p className="text-xs text-charcoal-muted mt-1 font-normal">
                  Decoupled microservice proxies, rate limiting, and event bus orchestration.
                </p>
              </div>

              {/* Layer 3 */}
              <div
                onClick={() => setSelectedArchLayer(3)}
                className={`organic-card p-6 cursor-pointer border-l-4 transition-all ${
                  selectedArchLayer === 3 ? "border-l-royal shadow-subtle-lg" : "border-l-charcoal"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`mono-tag font-bold ${selectedArchLayer === 3 ? "text-royal" : "text-charcoal"}`}>
                    LAYER 03 // DATA PERSISTENCE
                  </span>
                  <span className="mono-tag text-charcoal-subtle">POSTGRESQL / REDIS / PINECONE</span>
                </div>
                <h3 className="font-display font-bold text-xl text-charcoal">Persistence &amp; Vector Data Lake</h3>
                <p className="text-xs text-charcoal-muted mt-1 font-normal">
                  ACID-compliant relational database clusters, vector embeddings, and multi-node Redis caching.
                </p>
              </div>

              {/* Layer 4 */}
              <div
                onClick={() => setSelectedArchLayer(4)}
                className={`organic-card p-6 cursor-pointer border-l-4 transition-all ${
                  selectedArchLayer === 4 ? "border-l-royal shadow-subtle-lg" : "border-l-charcoal"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`mono-tag font-bold ${selectedArchLayer === 4 ? "text-royal" : "text-charcoal"}`}>
                    LAYER 04 // CLOUD ORCHESTRATION
                  </span>
                  <span className="mono-tag text-charcoal-subtle">AWS / KUBERNETES / TERRAFORM</span>
                </div>
                <h3 className="font-display font-bold text-xl text-charcoal">Infrastructure &amp; Cloud Security</h3>
                <p className="text-xs text-charcoal-muted mt-1 font-normal">
                  Multi-region cloud infrastructure, automated CI/CD deployment pipelines, and zero-trust IAM security.
                </p>
              </div>
            </div>

            {/* Live Inspection Log Output */}
            <div className="max-w-4xl mx-auto mt-6 p-4 rounded-xl bg-charcoal text-white font-mono text-xs flex justify-between items-center shadow-lg">
              <span id="archLogOutput" className="text-slate-300">
                {ARCH_LOGS[selectedArchLayer]}
              </span>
              <span className="text-emerald-400 font-bold">SYS_HEALTHY</span>
            </div>
          </div>
        </section>

        {/* WORKING PROCESS / METHODOLOGY */}
        <section id="process" className="py-24 bg-white hairline-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="mono-tag text-royal font-semibold">04 // DELIVERY METHODOLOGY</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal mt-2">
                Engineered 4-Step Process
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="organic-card p-6">
                <span className="w-8 h-8 rounded-full bg-royal text-white font-mono text-xs font-bold flex items-center justify-center mb-4">
                  01
                </span>
                <h3 className="font-display font-bold text-base text-charcoal mb-2">Discovery &amp; Schema</h3>
                <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                  Defining system domain models, data schemas, API contracts, and non-functional scalability targets.
                </p>
              </div>

              <div className="organic-card p-6">
                <span className="w-8 h-8 rounded-full bg-canvas-warm border border-canvas-border text-charcoal font-mono text-xs font-bold flex items-center justify-center mb-4">
                  02
                </span>
                <h3 className="font-display font-bold text-base text-charcoal mb-2">Architecture Blueprint</h3>
                <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                  Mapping microservice boundaries, UI design token system, and cloud deployment topology.
                </p>
              </div>

              <div className="organic-card p-6">
                <span className="w-8 h-8 rounded-full bg-canvas-warm border border-canvas-border text-charcoal font-mono text-xs font-bold flex items-center justify-center mb-4">
                  03
                </span>
                <h3 className="font-display font-bold text-base text-charcoal mb-2">Iterative Build Sprints</h3>
                <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                  Bi-weekly engineering sprints with continuous automated integration, code reviews, and staging previews.
                </p>
              </div>

              <div className="organic-card p-6">
                <span className="w-8 h-8 rounded-full bg-canvas-warm border border-canvas-border text-charcoal font-mono text-xs font-bold flex items-center justify-center mb-4">
                  04
                </span>
                <h3 className="font-display font-bold text-base text-charcoal mb-2">Production Launch</h3>
                <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                  Zero-downtime deployment, automated failover setup, performance monitoring, and SLA maintenance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHO WE SERVE */}
        <section id="serve" className="py-24 bg-canvas-warm">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="mono-tag text-royal font-semibold">05 // TARGET CLIENTELE</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal mt-2">
                Tailored for Scale
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="organic-card p-6">
                <div className="mono-tag text-royal mb-3 font-semibold">01 // ENTERPRISE</div>
                <h3 className="font-display font-bold text-base text-charcoal mb-2">Enterprise Corporations</h3>
                <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                  Modernizing legacy infrastructure into decoupled microservices and headless CMS portals.
                </p>
              </div>

              <div className="organic-card p-6">
                <div className="mono-tag text-charcoal-subtle mb-3">02 // SCALE-UPS</div>
                <h3 className="font-display font-bold text-base text-charcoal mb-2">Fast-Growth SaaS</h3>
                <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                  Refactoring monolithic codebases for high throughput, low latency, and multi-tenant expansion.
                </p>
              </div>

              <div className="organic-card p-6">
                <div className="mono-tag text-charcoal-subtle mb-3">03 // FOUNDATIONS</div>
                <h3 className="font-display font-bold text-base text-charcoal mb-2">Digital Founders</h3>
                <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                  Building mission-critical MVP platforms with enterprise-grade security from day one.
                </p>
              </div>

              <div className="organic-card p-6">
                <div className="mono-tag text-charcoal-subtle mb-3">04 // PARTNERS</div>
                <h3 className="font-display font-bold text-base text-charcoal mb-2">Strategic Partnerships</h3>
                <p className="text-xs text-charcoal-muted leading-relaxed font-normal">
                  Dedicated senior engineering squads executing specialized cloud or mobile initiatives.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-charcoal text-white py-14 hairline-t text-xs font-mono">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-royal flex items-center justify-center text-white font-display font-bold text-xs">
              CMS
            </div>
            <span className="font-display font-bold text-sm text-white tracking-wide">
              CrossMotive Services
            </span>
          </div>

          <div className="text-slate-400 text-center md:text-left">
            CrossMotive Services (CMS Tech) &copy; {new Date().getFullYear()}. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300">
            <a href="#pillars" className="hover:text-royal-bright transition-colors">
              Pillars
            </a>
            <a href="#products" className="hover:text-royal-bright transition-colors">
              Solutions
            </a>
            <a href="#architecture" className="hover:text-royal-bright transition-colors">
              Architecture
            </a>
            <button
              type="button"
              onClick={openConsultation}
              className="text-royal-bright font-bold hover:underline"
            >
              Start Project ↗
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
                  <option value="Custom Enterprise CMS">Custom Enterprise CMS</option>
                  <option value="Multi-Tenant SaaS">Multi-Tenant SaaS Architecture</option>
                  <option value="Cloud Databases">Cloud Database Systems</option>
                  <option value="Web Applications">Web Applications Engineering</option>
                  <option value="Mobile Engineering">Native iOS &amp; Android Mobile</option>
                  <option value="AI Integration">AI Agents &amp; RAG Integration</option>
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
