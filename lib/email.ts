import nodemailer from "nodemailer";
import { Enquiry } from "./types";

/**
 * Recipients for all contact form enquiries.
 * As requested:
 * - sahith@crossmotiveservices.com (displayed in UI)
 * - dadapeer.personal@gmail.com (backend recipient only, not shown in UI)
 */
export const NOTIFICATION_RECIPIENTS = [
  "sahith@crossmotiveservices.com",
  "dadapeer.personal@gmail.com",
];

export interface EmailDispatchResult {
  success: boolean;
  provider: "web3forms" | "smtp" | "resend" | "none";
  recipients: string[];
  error?: string;
}

/**
 * Generates responsive, executive-grade HTML for the notification email.
 */
function generateNotificationHtml(enquiry: Enquiry): string {
  const meetingRow = enquiry.meeting_date
    ? `
      <tr>
        <td style="padding: 10px 14px; font-weight: 600; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Scheduled Discovery:</td>
        <td style="padding: 10px 14px; color: #0f172a; font-size: 13px; font-weight: 600; border-bottom: 1px solid #e2e8f0;">
          ${enquiry.meeting_date} at ${enquiry.meeting_time || "TBD"} (${enquiry.timezone || "UTC"})
        </td>
      </tr>
    `
    : "";

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>New Project Enquiry - ${enquiry.reference_code}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
      <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        
        <!-- Header -->
        <div style="background-color: #17232f; padding: 24px 28px; border-bottom: 3px solid #c9e56a;">
          <div style="color: #94a3b8; font-size: 11px; font-family: monospace; letter-spacing: 0.1em; text-transform: uppercase;">
            Cross Motive Services · Client Discovery
          </div>
          <h1 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 8px 0 0; letter-spacing: -0.02em;">
            New Project Enquiry Received
          </h1>
          <div style="display: inline-block; margin-top: 10px; background: rgba(201, 229, 106, 0.15); color: #c9e56a; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-family: monospace; font-weight: 700;">
            ${enquiry.reference_code}
          </div>
        </div>

        <!-- Body -->
        <div style="padding: 28px;">
          <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-top: 0;">
            A new enquiry has been submitted through the Cross Motive Services portfolio contact form:
          </p>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #f8fafc; border-radius: 8px; overflow: hidden;">
            <tbody>
              <tr>
                <td style="padding: 10px 14px; font-weight: 600; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0; width: 35%;">Client Name:</td>
                <td style="padding: 10px 14px; color: #0f172a; font-size: 13px; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${enquiry.full_name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 14px; font-weight: 600; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Email:</td>
                <td style="padding: 10px 14px; color: #0f172a; font-size: 13px; border-bottom: 1px solid #e2e8f0;">
                  <a href="mailto:${enquiry.email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${enquiry.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 14px; font-weight: 600; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Company / Org:</td>
                <td style="padding: 10px 14px; color: #0f172a; font-size: 13px; border-bottom: 1px solid #e2e8f0;">${enquiry.company_name || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 14px; font-weight: 600; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Client Stage:</td>
                <td style="padding: 10px 14px; color: #0f172a; font-size: 13px; border-bottom: 1px solid #e2e8f0;">${enquiry.client_category}</td>
              </tr>
              <tr>
                <td style="padding: 10px 14px; font-weight: 600; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Service / Solution:</td>
                <td style="padding: 10px 14px; color: #0f172a; font-size: 13px; font-weight: 600; border-bottom: 1px solid #e2e8f0;">${enquiry.project_type}</td>
              </tr>
              <tr>
                <td style="padding: 10px 14px; font-weight: 600; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Platform:</td>
                <td style="padding: 10px 14px; color: #0f172a; font-size: 13px; border-bottom: 1px solid #e2e8f0;">${enquiry.platform}</td>
              </tr>
              <tr>
                <td style="padding: 10px 14px; font-weight: 600; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Estimated Budget:</td>
                <td style="padding: 10px 14px; color: #0f172a; font-size: 13px; font-weight: 600; border-bottom: 1px solid #e2e8f0;">${enquiry.budget_range}</td>
              </tr>
              <tr>
                <td style="padding: 10px 14px; font-weight: 600; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Target Timeline:</td>
                <td style="padding: 10px 14px; color: #0f172a; font-size: 13px; border-bottom: 1px solid #e2e8f0;">${enquiry.timeline}</td>
              </tr>
              <tr>
                <td style="padding: 10px 14px; font-weight: 600; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Preferred Contact:</td>
                <td style="padding: 10px 14px; color: #0f172a; font-size: 13px; border-bottom: 1px solid #e2e8f0;">${enquiry.contact_method}</td>
              </tr>
              ${meetingRow}
            </tbody>
          </table>

          <!-- Project Description / Scope -->
          <div style="margin: 24px 0 20px;">
            <div style="font-size: 12px; font-family: monospace; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 8px;">
              Project Scope & Requirements:
            </div>
            <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; border-left: 4px solid #17232f; font-size: 13px; line-height: 1.7; color: #1e293b; white-space: pre-wrap;">${enquiry.description}</div>
          </div>

          <!-- Quick Action Button -->
          <div style="margin-top: 28px; text-align: center;">
            <a href="mailto:${enquiry.email}?subject=Re: Your enquiry with Cross Motive Services [${enquiry.reference_code}]" style="display: inline-block; background-color: #17232f; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 8px;">
              Reply Directly to ${enquiry.full_name} →
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 16px 28px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
          Cross Motive Services · Automated Notification Dispatcher · Bangalore &amp; Global Remote
        </div>
      </div>
    </body>
  </html>
  `;
}

/**
 * Dispatches the enquiry notification to:
 * 1. sahith@crossmotiveservices.com
 * 2. dadapeer.personal@gmail.com
 */
export async function sendEnquiryNotificationEmail(enquiry: Enquiry): Promise<EmailDispatchResult> {
  const recipients = NOTIFICATION_RECIPIENTS;
  const subject = `[CMS Enquiry] ${enquiry.project_type} — ${enquiry.full_name} (${enquiry.reference_code})`;
  const html = generateNotificationHtml(enquiry);
  const text = `New Project Enquiry Received [${enquiry.reference_code}]\n\n` +
    `Client: ${enquiry.full_name}\n` +
    `Email: ${enquiry.email}\n` +
    `Company: ${enquiry.company_name || "N/A"}\n` +
    `Stage: ${enquiry.client_category}\n` +
    `Project: ${enquiry.project_type} (${enquiry.platform})\n` +
    `Budget: ${enquiry.budget_range}\n` +
    `Timeline: ${enquiry.timeline}\n` +
    `Contact Method: ${enquiry.contact_method}\n` +
    (enquiry.meeting_date ? `Meeting: ${enquiry.meeting_date} at ${enquiry.meeting_time || ""} (${enquiry.timezone || ""})\n` : "") +
    `\nDescription:\n${enquiry.description}\n`;

  // Note: Web3Forms is dispatched directly from the client-side browser (EnquiryForm.tsx)
  // to comply with Web3Forms free tier origin rules.


  // 2. Try Resend API (if RESEND_API_KEY is defined)
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "Cross Motive Services <notifications@crossmotiveservices.com>",
          to: recipients,
          reply_to: enquiry.email,
          subject,
          html,
          text,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("[Email Dispatch] Resend API error:", errorText);
      } else {
        console.log(`[Email Dispatch] Successfully sent notification to ${recipients.join(", ")} via Resend.`);
        return { success: true, provider: "resend", recipients };
      }
    } catch (err: any) {
      console.error("[Email Dispatch] Exception calling Resend:", err);
    }
  }

  // 2. Try SMTP / Nodemailer (if SMTP_HOST or GMAIL_USER is defined)
  const smtpHost = process.env.SMTP_HOST || (process.env.GMAIL_USER ? "smtp.gmail.com" : undefined);
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const port = Number(process.env.SMTP_PORT) || 587;
      const secure = process.env.SMTP_SECURE === "true" || port === 465;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port,
        secure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Cross Motive Services" <${smtpUser}>`,
        to: recipients,
        replyTo: `"${enquiry.full_name}" <${enquiry.email}>`,
        subject,
        html,
        text,
      });

      console.log(`[Email Dispatch] Successfully sent notification to ${recipients.join(", ")} via SMTP (${smtpHost}).`);
      return { success: true, provider: "smtp", recipients };
    } catch (err: any) {
      console.error("[Email Dispatch] SMTP dispatch error:", err);
      return { success: false, provider: "smtp", recipients, error: err.message };
    }
  }

  // 3. Fallback / Log Mode: Enquiries are safely stored in DB/store.json
  console.log(
    `[Email Dispatch] Stored enquiry ${enquiry.reference_code} for ${recipients.join(", ")}. ` +
    `To activate direct email delivery on deployment, set SMTP_HOST, SMTP_USER, SMTP_PASS or RESEND_API_KEY in environment variables.`
  );

  return { success: false, provider: "none", recipients, error: "SMTP/Resend credentials not yet set in environment" };
}
