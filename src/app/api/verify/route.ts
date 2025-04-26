import connectDB from "@/db/dbConnect";
import UserModel from "@/models/user/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const { email, code } = await request.json();

    const isExistingUser = await UserModel.findOne({ email });
    if (!isExistingUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );
    }

    const isValidCode = isExistingUser.verifyCode === code;
    const isCodeNotExpiry =
      new Date(isExistingUser.verifyCodeExpiry) > new Date();

    if (isValidCode && isCodeNotExpiry && !isExistingUser.isVerified) {
      isExistingUser.isVerified = true;
      await isExistingUser.save();

      return NextResponse.json(
        {
          success: true,
          message: "Verified Code successfully",
        },
        { status: 200 }
      );
    } else if (!isValidCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect Verification Code",
        },
        { status: 400 }
      );
    } else if (isValidCode && isCodeNotExpiry && isExistingUser.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "You are already verified.",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message:
          "Verification code is Expired. Please sign in again to get new code.",
      },
      { status: 400 }
    );
  } catch (error) {
    console.log("Error while verifing code", error);
    return NextResponse.json(
      { success: false, message: "Failed to verify code" },
      { status: 500 }
    );
  }
}
