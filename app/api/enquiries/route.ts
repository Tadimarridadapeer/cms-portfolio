import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validations/enquiry";
import { createEnquiry, getEnquiries, updateEnquiryStatus } from "@/lib/data/storage";
import { getAdminSession } from "@/lib/auth";
import { sendEnquiryNotificationEmail } from "@/lib/email";
import { dispatchEnquiryToWeb3Forms } from "@/lib/web3forms";

// Simple in-memory rate limiter per IP: max 5 requests per 10 minutes
const ipHits = new Map<string, { count: number; firstHit: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const current = ipHits.get(ip);

  if (!current) {
    ipHits.set(ip, { count: 1, firstHit: now });
    return false;
  }

  if (now - current.firstHit > windowMs) {
    ipHits.set(ip, { count: 1, firstHit: now });
    return false;
  }

  if (current.count >= 5) {
    return true;
  }

  current.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local";
    const isLocalhost = ip === "local" || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("127.");
    if (!isLocalhost && isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many enquiries submitted from this network. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validated = enquirySchema.safeParse(body);

    if (!validated.success) {
      const errorMsg = validated.error.errors.map((e) => e.message).join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const enquiry = await createEnquiry({
      full_name: validated.data.full_name,
      email: validated.data.email,
      company_name: validated.data.company_name,
      client_category: validated.data.client_category,
      project_type: validated.data.project_type,
      platform: validated.data.platform,
      description: validated.data.description,
      budget_range: validated.data.budget_range,
      timeline: validated.data.timeline,
      contact_method: validated.data.contact_method,
      privacy_consent: validated.data.privacy_consent,
      meeting_date: validated.data.meeting_date || null,
      meeting_time: validated.data.meeting_time || null,
      timezone: validated.data.timezone || null,
      meeting_notes: validated.data.meeting_notes || null,
    });

    // Dispatch email notification to sahith@crossmotiveservices.com and dadapeer.personal@gmail.com
    try {
      await sendEnquiryNotificationEmail(enquiry);
    } catch (mailErr) {
      console.error("[Enquiry Notification] Email dispatch failed:", mailErr);
    }

    // Direct Web3Forms delivery to both access keys (Sahith & Dadapeer)
    try {
      await dispatchEnquiryToWeb3Forms({
        full_name: enquiry.full_name,
        email: enquiry.email,
        company_name: enquiry.company_name,
        client_category: enquiry.client_category,
        project_type: enquiry.project_type,
        platform: enquiry.platform,
        budget_range: enquiry.budget_range,
        timeline: enquiry.timeline,
        contact_method: enquiry.contact_method,
        description: enquiry.description,
        reference_code: enquiry.reference_code,
        meeting_date: enquiry.meeting_date,
        meeting_time: enquiry.meeting_time,
        timezone: enquiry.timezone,
      });
    } catch (w3Err) {
      console.error("[Web3Forms Dispatcher] Dual dispatch error:", w3Err);
    }

    return NextResponse.json({
      success: true,
      reference_code: enquiry.reference_code,
      message: `Enquiry successfully recorded under reference ${enquiry.reference_code}.`,
    });
  } catch (err: any) {
    console.error("Enquiry submission error:", err);
    return NextResponse.json(
      { error: "Internal server error while saving enquiry. Please try again." },
      { status: 500 }
    );
  }
}

// GET enquiries - protected admin access only
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const list = await getEnquiries();
    return NextResponse.json(list);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PATCH enquiry status - protected admin access only
export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, admin_notes } = body;
    if (!id || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updated = await updateEnquiryStatus(id, status, admin_notes);
    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
