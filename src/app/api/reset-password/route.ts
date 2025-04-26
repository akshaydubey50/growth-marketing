import { ResendConf } from "@/conf/conf";
import connectDB from "@/db/dbConnect";
import { EmailType, sendmail } from "@/lib/sendmail";
import UserModel from "@/models/user/User.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  const { token, newPassword } = await req.json();

  if (!token || !newPassword) {
    return NextResponse.json(
      {
        status: false,
        message: "Token and new password are required",
      },
      { status: 400 }
    );
  }

  // Find the user using the hashed token
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await UserModel.findOne({
    forgetPasswordToken: hashedToken,
    forgetPasswordTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json(
      {
        status: false,
        message: "Invalid or expired token",
      },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password
  user.password = hashedPassword; // Make sure to hash the password before saving
  user.forgetPasswordToken = undefined; // Clear the token
  user.forgetPasswordTokenExpiry = undefined; // Clear the expiry date
  await user.save();
  const emailResponse = await sendmail({
    emailTo: user.email,
    subject: ResendConf.RESET_PASSWORD_SUBJECT,
    emailType: EmailType.PasswordChangedSuccessfully,
    username: "",
  });

  console.log(
    "Password changed successfully email response ::: ",
    emailResponse
  );
  return NextResponse.json(
    {
      success: true,
      message: "Password has been reset successfully",
    },
    { status: 200 }
  );
}
