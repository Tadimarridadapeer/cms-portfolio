import fs from "fs";
import path from "path";
import {
  Project,
  Service,
  Technology,
  Enquiry,
  SiteSettings,
  EnquiryStatus,
} from "../types";
import {
  initialProjects,
  initialServices,
  initialTechnologies,
  initialSiteSettings,
} from "./initial-data";
import { getSupabaseServerClient } from "../supabase/server";

interface StoreData {
  projects: Project[];
  services: Service[];
  technologies: Technology[];
  enquiries: Enquiry[];
  settings: SiteSettings;
}

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

function ensureStoreFile(): StoreData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(STORE_FILE)) {
      const initial: StoreData = {
        projects: initialProjects,
        services: initialServices,
        technologies: initialTechnologies,
        enquiries: [],
        settings: initialSiteSettings,
      };
      fs.writeFileSync(STORE_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }

    const raw = fs.readFileSync(STORE_FILE, "utf-8");
    const parsed = JSON.parse(raw) as StoreData;

    // Merge in any missing services if store existed from earlier run
    let changed = false;
    for (const initServ of initialServices) {
      if (!parsed.services.some((s) => s.slug === initServ.slug)) {
        parsed.services.push(initServ);
        changed = true;
      }
    }
    if (!parsed.technologies || parsed.technologies.length === 0) {
      parsed.technologies = initialTechnologies;
      changed = true;
    }
    if (!parsed.settings) {
      parsed.settings = initialSiteSettings;
      changed = true;
    }
    if (changed) {
      fs.writeFileSync(STORE_FILE, JSON.stringify(parsed, null, 2), "utf-8");
    }

    return parsed;
  } catch (err) {
    console.error("Error accessing local store file:", err);
    return {
      projects: initialProjects,
      services: initialServices,
      technologies: initialTechnologies,
      enquiries: [],
      settings: initialSiteSettings,
    };
  }
}

function writeStoreFile(data: StoreData): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving store file:", err);
  }
}

// ---------------- PROJECTS ----------------
export async function getProjects(includeDrafts = false): Promise<Project[]> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      let query = supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (!includeDrafts) {
        query = query.neq("status", "Draft").eq("visibility", "Public");
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) return data as Project[];
    } catch {
      // Fallback to local store
    }
  }

  const store = ensureStoreFile();
  if (includeDrafts) {
    return store.projects;
  }
  return store.projects.filter(
    (p) => p.status !== "Draft" && p.visibility === "Public"
  );
}

export async function getProjectBySlug(slug: string, includeDrafts = false): Promise<Project | null> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      let query = supabase.from("projects").select("*").eq("slug", slug);
      if (!includeDrafts) {
        query = query.neq("status", "Draft").eq("visibility", "Public");
      }
      const { data, error } = await query.single();
      if (!error && data) return data as Project;
    } catch {
      // Fallback
    }
  }

  const store = ensureStoreFile();
  const proj = store.projects.find((p) => p.slug === slug);
  if (!proj) return null;
  if (!includeDrafts && (proj.status === "Draft" || proj.visibility !== "Public")) {
    return null;
  }
  return proj;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const store = ensureStoreFile();
  return store.projects.find((p) => p.id === id) || null;
}

export async function saveProject(project: Partial<Project> & { id?: string; title: string; slug: string }): Promise<Project> {
  const store = ensureStoreFile();
  const now = new Date().toISOString();

  if (project.id) {
    const index = store.projects.findIndex((p) => p.id === project.id);
    if (index !== -1) {
      const updated: Project = {
        ...store.projects[index],
        ...project,
        updated_at: now,
      } as Project;
      store.projects[index] = updated;
      writeStoreFile(store);
      return updated;
    }
  }

  const newProject: Project = {
    id: project.id || `proj-${Date.now()}`,
    title: project.title,
    slug: project.slug,
    summary: project.summary || "",
    description: project.description || "",
    category: project.category || "Web Applications",
    project_type: project.project_type || "Web Application",
    client_type: project.client_type || "Startup",
    engagement_type: project.engagement_type || "Concept Project",
    status: project.status || "In Progress",
    visibility: project.visibility || "Public",
    services: project.services || [],
    technologies: project.technologies || [],
    cover_image: project.cover_image || "/images/projects/default.svg",
    gallery: project.gallery || [],
    problem: project.problem || "",
    solution: project.solution || "",
    features: project.features || [],
    architecture: project.architecture || "",
    challenges: project.challenges || "",
    outcomes: project.outcomes || "",
    outcomes_verified: Boolean(project.outcomes_verified),
    target_audience: project.target_audience || "",
    product_objectives: project.product_objectives || [],
    scope_of_work: project.scope_of_work || [],
    design_approach: project.design_approach || "",
    learnings_and_next_steps: project.learnings_and_next_steps || "",
    published_at: project.published_at || now,
    created_at: now,
    updated_at: now,
  };

  store.projects.unshift(newProject);
  writeStoreFile(store);
  return newProject;
}

export async function deleteProject(id: string): Promise<boolean> {
  const store = ensureStoreFile();
  const initialLength = store.projects.length;
  store.projects = store.projects.filter((p) => p.id !== id);
  if (store.projects.length !== initialLength) {
    writeStoreFile(store);
    return true;
  }
  return false;
}

// ---------------- SERVICES ----------------
export async function getServices(): Promise<Service[]> {
  const store = ensureStoreFile();
  return store.services.sort((a, b) => a.display_order - b.display_order);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const store = ensureStoreFile();
  return store.services.find((s) => s.slug === slug) || null;
}

export async function updateService(id: string, updates: Partial<Service>): Promise<Service | null> {
  const store = ensureStoreFile();
  const index = store.services.findIndex((s) => s.id === id);
  if (index === -1) return null;
  const updated: Service = {
    ...store.services[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  store.services[index] = updated;
  writeStoreFile(store);
  return updated;
}

// ---------------- TECHNOLOGIES ----------------
export async function getTechnologies(): Promise<Technology[]> {
  const store = ensureStoreFile();
  return store.technologies.sort((a, b) => a.display_order - b.display_order);
}

export async function updateTechnology(id: string, updates: Partial<Technology>): Promise<Technology | null> {
  const store = ensureStoreFile();
  const index = store.technologies.findIndex((t) => t.id === id);
  if (index === -1) return null;
  const updated = { ...store.technologies[index], ...updates };
  store.technologies[index] = updated;
  writeStoreFile(store);
  return updated;
}

// ---------------- ENQUIRIES ----------------
export async function getEnquiries(): Promise<Enquiry[]> {
  const store = ensureStoreFile();
  return store.enquiries.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getEnquiryById(id: string): Promise<Enquiry | null> {
  const store = ensureStoreFile();
  return store.enquiries.find((e) => e.id === id) || null;
}

export async function createEnquiry(
  data: Omit<Enquiry, "id" | "reference_code" | "status" | "created_at" | "updated_at">
): Promise<Enquiry> {
  const store = ensureStoreFile();
  const now = new Date().toISOString();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  const reference_code = `CMS-${year}-${randomSuffix}`;

  const newEnquiry: Enquiry = {
    ...data,
    id: `enq-${Date.now()}-${randomSuffix}`,
    reference_code,
    status: "New",
    created_at: now,
    updated_at: now,
  };

  store.enquiries.unshift(newEnquiry);
  writeStoreFile(store);

  // If Supabase is connected, attempt sync as well
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      await supabase.from("enquiries").insert([newEnquiry]);
    } catch {
      // Local store succeeded
    }
  }

  return newEnquiry;
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus,
  admin_notes?: string
): Promise<Enquiry | null> {
  const store = ensureStoreFile();
  const index = store.enquiries.findIndex((e) => e.id === id);
  if (index === -1) return null;

  const updated: Enquiry = {
    ...store.enquiries[index],
    status,
    ...(admin_notes !== undefined ? { admin_notes } : {}),
    updated_at: new Date().toISOString(),
  };

  store.enquiries[index] = updated;
  writeStoreFile(store);
  return updated;
}

// ---------------- SITE SETTINGS ----------------
export async function getSiteSettings(): Promise<SiteSettings> {
  const store = ensureStoreFile();
  return store.settings;
}

export async function updateSiteSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  const store = ensureStoreFile();
  const updated: SiteSettings = {
    ...store.settings,
    ...updates,
    updated_at: new Date().toISOString(),
  };
  store.settings = updated;
  writeStoreFile(store);
  return updated;
}
