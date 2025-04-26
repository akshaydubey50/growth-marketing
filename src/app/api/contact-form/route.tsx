import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { AirtableConf } from "@/conf/conf";
import connectDB from "@/db/dbConnect";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { fullName, email, queryReason, message } = await req.json();

    if (!fullName || !email || !queryReason || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const headers = {
      Authorization: `Bearer ${AirtableConf.CONTACT_FORM_BEARER_TOKEN}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      `${AirtableConf.BASE_URL}/${AirtableConf.CONTACT_FORM_BASE_ID}/${AirtableConf.CONTACT_FORM_TABLE_ID}`,
      {
        fields: {
          FullName: fullName,
          Email: email,
          Reasoning: queryReason,
          Message: message,
        },
      },
      { headers }
    );

    console.log("Response from Airtable API:", response.data);

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Contact form API failure:",
      error instanceof AxiosError ? error.response?.data : error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit contact form",
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
