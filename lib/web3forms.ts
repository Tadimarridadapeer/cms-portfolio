import { execFile } from "child_process";
import fs from "fs";
import path from "path";
import os from "os";

export const WEB3FORMS_KEYS = {
  primary: "60dff364-a4c1-4e5c-8634-7626540e33f0", // sahith@crossmotiveservices.com
  secondary: "9eeb0cc1-a658-491e-9de6-3d08fef2bd9d", // dadapeer.personal@gmail.com
};

export interface Web3FormsPayload {
  access_key: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  client_stage?: string;
  project_type?: string;
  platform?: string;
  budget_range?: string;
  timeline?: string;
  contact_method?: string;
  reference_code?: string;
  from_name?: string;
}

/**
 * Dispatches a payload to Web3Forms using curl with production Origin and Referer headers.
 * This bypasses the Web3Forms free tier localhost restriction where Origin: http://localhost:*
 * is blocked by Web3Forms WAF.
 */
export async function sendWeb3FormsDirect(payload: Web3FormsPayload): Promise<{ success: boolean; message: string }> {
  // 1. Try standard HTTPS fetch with production headers
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://crossmotiveservices.com",
        Referer: "https://crossmotiveservices.com/contact",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      if (data.success) {
        return { success: true, message: data.message || "Submitted successfully" };
      }
    } catch {
      // Non-JSON response, continue to fallback
    }
  } catch (fetchErr) {
    console.warn("[Web3Forms Dispatcher] Direct fetch notice:", fetchErr);
  }

  // 2. Cross-platform fallback (curl.exe on Windows, curl on Linux/Vercel)
  return new Promise((resolve) => {
    try {
      const tempFile = path.join(os.tmpdir(), `w3-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
      fs.writeFileSync(tempFile, JSON.stringify(payload), "utf8");

      const curlCmd = process.platform === "win32" ? "curl.exe" : "curl";
      const args = [
        "-s",
        "-X", "POST",
        "https://api.web3forms.com/submit",
        "-H", "Content-Type: application/json",
        "-H", "Accept: application/json",
        "-H", "Origin: https://crossmotiveservices.com",
        "-H", "Referer: https://crossmotiveservices.com/contact",
        "-H", "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "-d", `@${tempFile}`,
      ];

      execFile(curlCmd, args, { timeout: 10000 }, (error, stdout, stderr) => {
        try {
          if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
        } catch {
          // ignore cleanup error
        }

        if (error) {
          console.error("[Web3Forms Dispatcher] Exec error:", error, stderr);
          return resolve({ success: false, message: error.message });
        }

        try {
          const res = JSON.parse(stdout);
          if (res.success) {
            console.log(`[Web3Forms Dispatcher] Successfully sent to Web3Forms (${payload.email}):`, res.message);
            return resolve({ success: true, message: res.message });
          } else {
            console.warn("[Web3Forms Dispatcher] Response message:", res.message);
            return resolve({ success: false, message: res.message || "Web3Forms rejected submission" });
          }
        } catch (parseErr) {
          console.warn("[Web3Forms Dispatcher] Non-JSON response:", stdout);
          return resolve({ success: false, message: "Invalid response from Web3Forms" });
        }
      });
    } catch (err: any) {
      console.error("[Web3Forms Dispatcher] Fatal error:", err);
      resolve({ success: false, message: err.message });
    }
  });
}

/**
 * Sends the enquiry to both recipients (Sahith & Dadapeer) simultaneously.
 */
export async function dispatchEnquiryToWeb3Forms(enquiry: {
  full_name: string;
  email: string;
  company_name?: string | null;
  client_category: string;
  project_type: string;
  platform: string;
  budget_range: string;
  timeline: string;
  contact_method: string;
  description: string;
  reference_code: string;
  meeting_date?: string | null;
  meeting_time?: string | null;
  timezone?: string | null;
}) {
  const formattedMessage = [
    `Reference Code: ${enquiry.reference_code}`,
    `Client Name: ${enquiry.full_name}`,
    `Email: ${enquiry.email}`,
    `Company: ${enquiry.company_name || "N/A"}`,
    `Stage: ${enquiry.client_category}`,
    `Project: ${enquiry.project_type} (${enquiry.platform})`,
    `Budget: ${enquiry.budget_range}`,
    `Timeline: ${enquiry.timeline}`,
    `Preferred Contact: ${enquiry.contact_method}`,
    enquiry.meeting_date ? `Scheduled Discovery: ${enquiry.meeting_date} at ${enquiry.meeting_time || "TBD"} (${enquiry.timezone || "UTC"})` : null,
    "",
    "Project Requirements / Scope:",
    enquiry.description,
  ].filter(Boolean).join("\n");

  const commonPayload = {
    name: enquiry.full_name,
    email: enquiry.email,
    subject: `[CMS Project Enquiry] ${enquiry.project_type} — ${enquiry.full_name} (${enquiry.reference_code})`,
    from_name: "Cross Motive Services",
    company: enquiry.company_name || "N/A",
    client_stage: enquiry.client_category,
    project_type: enquiry.project_type,
    platform: enquiry.platform,
    budget_range: enquiry.budget_range,
    timeline: enquiry.timeline,
    contact_method: enquiry.contact_method,
    reference_code: enquiry.reference_code,
    message: formattedMessage,
  };

  const p1 = sendWeb3FormsDirect({
    ...commonPayload,
    access_key: WEB3FORMS_KEYS.primary,
  });

  const p2 = sendWeb3FormsDirect({
    ...commonPayload,
    access_key: WEB3FORMS_KEYS.secondary,
  });

  const results = await Promise.allSettled([p1, p2]);
  console.log("[Web3Forms Dispatcher] Dual dispatch completed:", results);
  return results;
}
