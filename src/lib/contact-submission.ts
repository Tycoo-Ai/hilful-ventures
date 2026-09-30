/**
 * Hilful Ventures Pvt Ltd — Contact & Operational Proposal Submission Service
 * 
 * Enterprise-grade validation, sanitization, rate-limiting, and PostgreSQL persistence via Prisma.
 * Architecture:
 * - Persistence: PostgreSQL (Prisma Client singleton)
 * - Fallback Constraint: NEVER silently fall back to memory. Controlled server failure if DB is unavailable.
 * - Rate Limiting: Single-instance in-memory safeguard (designed for future distributed Upstash/Redis swap).
 * - Attachments: Architecture-ready. Binary uploads disabled until dedicated S3/Blob storage is configured.
 */

import { prisma } from "@/lib/prisma";

export type EnquiryType = "GENERAL" | "PROPOSAL" | "TENDER";
export type SubmissionStatus = "NEW" | "REVIEWED" | "IN_PROGRESS" | "CLOSED";

export interface ContactSubmission {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  enquiryType: EnquiryType;
  areaOfInterest: string;
  message: string;
  attachmentName?: string;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitInquiryInput {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  enquiryType: EnquiryType;
  areaOfInterest: string;
  message: string;
  attachmentName?: string;
}

export interface SubmitInquiryResult {
  success: boolean;
  message: string;
  submissionId?: string;
  errors?: Record<string, string>;
  databaseUnavailable?: boolean;
}

/**
 * Single-Instance In-Memory Rate Limiter
 * 
 * Safeguard: Limits requests to max 5 submissions per IP within a 10-minute window.
 * Note: For multi-instance clustered or serverless production deployments,
 * this interface can be backed by a distributed key-value store (e.g. Upstash Redis / Valkey).
 */
interface RateLimitRecord {
  count: number;
  firstTimestamp: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, firstTimestamp: now });
    return true;
  }

  if (now - record.firstTimestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstTimestamp: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

// Input Sanitization (strips HTML angle brackets, caps string lengths)
function sanitize(str: string): string {
  if (!str) return "";
  return str
    .trim()
    .replace(/[<>]/g, "")
    .slice(0, 2000);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Server-side submission handler
 * Strictly validates, sanitizes, and writes directly to PostgreSQL via Prisma.
 * If the database is unreachable, returns a controlled server error and NEVER a false success.
 */
export async function submitInquiry(
  input: SubmitInquiryInput,
  clientIp = "127.0.0.1"
): Promise<SubmitInquiryResult> {
  // 1. Rate Limit Safeguard
  if (!checkRateLimit(clientIp)) {
    return {
      success: false,
      message: "Too many submission attempts. Please wait before submitting another enquiry.",
    };
  }

  // 2. Field Validation & Sanitization
  const errors: Record<string, string> = {};

  const name = sanitize(input.name);
  const company = sanitize(input.company);
  const email = sanitize(input.email);
  const phone = sanitize(input.phone);
  const country = sanitize(input.country);
  const enquiryType = input.enquiryType;
  const areaOfInterest = sanitize(input.areaOfInterest);
  const message = sanitize(input.message);

  if (!name || name.length < 2) {
    errors.name = "Full name is required (minimum 2 characters).";
  }
  if (!company || company.length < 2) {
    errors.company = "Company or entity name is required.";
  }
  if (!email || !isValidEmail(email)) {
    errors.email = "A valid corporate email address is required.";
  }
  if (!phone || phone.length < 6) {
    errors.phone = "A valid telephone number is required.";
  }
  if (!country) {
    errors.country = "Country or operational region is required.";
  }
  if (!["GENERAL", "PROPOSAL", "TENDER"].includes(enquiryType)) {
    errors.enquiryType = "Please select a valid enquiry type.";
  }
  if (!areaOfInterest) {
    errors.areaOfInterest = "Please select an area of interest.";
  }
  if (!message || message.length < 10) {
    errors.message = "Please provide detailed enquiry specifications (minimum 10 characters).";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please correct the highlighted validation errors.",
      errors,
    };
  }

  // 3. PostgreSQL Persistence via Prisma
  try {
    const record = await prisma.contactSubmission.create({
      data: {
        name,
        company,
        email,
        phone,
        country,
        enquiryType,
        areaOfInterest,
        message,
        attachmentReference: null, // Binary uploads disabled until cloud storage credentials are configured
        status: "NEW",
      },
    });

    return {
      success: true,
      message: "Your enquiry has been received. The submitted information is now available for review.",
      submissionId: record.id,
    };
  } catch (dbError) {
    console.error("[Contact Submission Service] PostgreSQL persistence error:", dbError);
    return {
      success: false,
      message: "Unable to submit your enquiry at this time. Please try again later.",
      databaseUnavailable: true,
    };
  }
}

/**
 * Query all submissions from PostgreSQL
 * Used exclusively by authenticated admin dashboard (/admin/inquiries)
 */
export async function getAllInquiries(): Promise<ContactSubmission[]> {
  try {
    const records = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    return records.map((r) => ({
      id: r.id,
      name: r.name,
      company: r.company,
      email: r.email,
      phone: r.phone,
      country: r.country,
      enquiryType: r.enquiryType as EnquiryType,
      areaOfInterest: r.areaOfInterest,
      message: r.message,
      attachmentName: r.attachmentReference || undefined,
      status: r.status as SubmissionStatus,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    }));
  } catch (err) {
    console.error("[Contact Submission Service] Failed to retrieve inquiries from PostgreSQL:", err);
    throw new Error("Database query failed while fetching inquiries");
  }
}

/**
 * Update submission status in PostgreSQL
 */
export async function updateInquiryStatus(
  id: string,
  newStatus: SubmissionStatus
): Promise<boolean> {
  try {
    await prisma.contactSubmission.update({
      where: { id },
      data: { status: newStatus },
    });
    return true;
  } catch (err) {
    console.error(`[Contact Submission Service] Failed to update inquiry ${id} in PostgreSQL:`, err);
    return false;
  }
}
