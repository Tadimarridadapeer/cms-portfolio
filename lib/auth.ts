import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "cms_admin_session";
const SECRET = process.env.ADMIN_SESSION_SECRET || "cross-motive-secret-production-salt-2026";

export interface AdminUser {
  email: string;
  role: "admin";
  authenticatedAt: string;
}

export function hashToken(payload: string): string {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function createSessionToken(email: string): string {
  const timestamp = Date.now().toString();
  const raw = `${email}:${timestamp}`;
  const signature = hashToken(raw);
  const token = Buffer.from(JSON.stringify({ email, timestamp, signature })).toString("base64url");
  return token;
}

export function verifySessionToken(token: string): AdminUser | null {
  try {
    const json = Buffer.from(token, "base64url").toString("utf-8");
    const { email, timestamp, signature } = JSON.parse(json);
    const raw = `${email}:${timestamp}`;
    const expected = hashToken(raw);

    if (signature !== expected) {
      return null;
    }

    // Sessions expire after 7 days
    const ageMs = Date.now() - parseInt(timestamp, 10);
    const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
    if (ageMs > maxAgeMs) {
      return null;
    }

    return {
      email,
      role: "admin",
      authenticatedAt: new Date(parseInt(timestamp, 10)).toISOString(),
    };
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminUser | null> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }
  return verifySessionToken(sessionCookie.value);
}

export async function setAdminSessionCookie(email: string): Promise<void> {
  const token = createSessionToken(email);
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function checkAdminCredentials(email: string, pass: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@crossmotiveservices.com";
  const adminPass = process.env.ADMIN_DEFAULT_PASSWORD || "ChangeMeInProduction2026!";

  // Case-insensitive email comparison, timing-safe password comparison
  if (email.trim().toLowerCase() !== adminEmail.toLowerCase()) {
    return false;
  }

  const passBuffer = Buffer.from(pass);
  const adminPassBuffer = Buffer.from(adminPass);

  if (passBuffer.length !== adminPassBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(passBuffer, adminPassBuffer);
}
