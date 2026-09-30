import { NextResponse } from "next/server";
import {
  submitInquiry,
  type SubmitInquiryInput,
  type EnquiryType,
} from "@/lib/contact-submission";

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const body = await request.json();

    let enquiryType: EnquiryType = "GENERAL";
    if (body.enquiryType === "PROPOSAL" || body.enquiryType === "OPERATIONAL_PROPOSAL") {
      enquiryType = "PROPOSAL";
    } else if (body.enquiryType === "TENDER") {
      enquiryType = "TENDER";
    }

    const input: SubmitInquiryInput = {
      name: body.name || body.fullName || "",
      company: body.company || "",
      email: body.email || body.workEmail || "",
      phone: body.phone || "",
      country: body.country || "",
      enquiryType,
      areaOfInterest: body.areaOfInterest || "",
      message: body.message || "",
      attachmentName: body.attachmentName || undefined,
    };

    const result = await submitInquiry(input, clientIp);

    if (!result.success) {
      const status = result.databaseUnavailable ? 500 : 400;
      return NextResponse.json(
        {
          success: false,
          message: result.message,
          errors: result.errors,
        },
        { status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        submissionId: result.submissionId,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Contact API] Error processing inquiry submission:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit your enquiry at this time. Please try again later.",
      },
      { status: 500 }
    );
  }
}
