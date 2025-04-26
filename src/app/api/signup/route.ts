import { ResendConf } from "@/conf/conf";
import connectDB from "@/db/dbConnect";
import { EmailType, sendmail } from "@/lib/sendmail";
import UserModel from "@/models/user/User.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { email, password } = await request.json();
    console.log({ email, password });
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and Password are required",
        },
        { status: 400 },
      );
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exist with this email.",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    const user = new UserModel({
      email,
      password: hashedPassword,
      verifyCode: verifyCode,
      verifyCodeExpiry: expiryDate,
    });
    await user.save();

    //send email verification code

    const emailResponse = await sendmail({
      emailTo: user.email,
      subject: ResendConf.VERIFICATION_CODE_SUBJECT,
      emailType: EmailType.Verification,
      verifyCode: verifyCode,
      username: "",
    });
    console.log("Verification code email response ::: ", emailResponse);

    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 },
      );
    }
    await sendmail({
      emailTo: user.email,
      subject: ResendConf.WELCOME_SUBJECT,
      emailType: EmailType.Welcome,
      username: "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.log("Error while creating user", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error,
      },
      { status: 500 },
    );
  }
}
