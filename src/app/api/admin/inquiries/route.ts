import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  getAllInquiries,
  updateInquiryStatus,
  type SubmissionStatus,
} from "@/lib/contact-submission";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  const inquiries = await getAllInquiries();
  return NextResponse.json({ inquiries });
}

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access denied" }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    if (!id || !["NEW", "REVIEWED", "IN_PROGRESS", "CLOSED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status or ID provided" }, { status: 400 });
    }

    const success = await updateInquiryStatus(id, status as SubmissionStatus);
    if (!success) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id, status });
  } catch (err) {
    console.error("[Admin Inquiries API] Error updating status:", err);
    return NextResponse.json({ error: "Failed to update inquiry status" }, { status: 500 });
  }
}
