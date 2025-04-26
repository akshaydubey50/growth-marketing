import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import UserModel from "@/models/user/User.model";
import connectDB from "@/db/dbConnect";
import BookmarkModel from "@/models/bookmark/Bookmark.model";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  await connectDB();

  const token = await getToken({ req: req });

  if (!token || token?._id === undefined) {
    return NextResponse.json(
      { success: false, msg: "Unauthorized access" },
      { status: 400 }
    );
  }
  try {
    const productId = req.nextUrl.pathname.split("bookmark/")[1];
    const user = await UserModel.findOne({
      email: token?.email,
    });

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User does not exist" },
        { status: 404 }
      );
    }

    const bookmarkExisting = await BookmarkModel.findOne({
      userId: user._id,
      productId: productId,
    });

    //Same productId exist with user
    if (bookmarkExisting) {
      console.log("Existing bookmark product", bookmarkExisting);
      return NextResponse.json(
        { success: true, msg: "Already bookmarked by user" },
        { status: 200 }
      );
    }

    const bookmark = new BookmarkModel({
      productId,
      userId: new mongoose.Types.ObjectId(user._id),
    });

    const savedBookmarked = await bookmark.save();

    if (!savedBookmarked) {
      return NextResponse.json(
        { success: false, msg: "Failed to bookmark" },
        { status: 400 }
      );
    }

    return NextResponse.json({ msg: "success", bookmark }, { status: 200 });
  } catch (error: any) {
    console.log("Error while bookmarking ==> ", error);

    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB();

  const token = await getToken({ req: req });

  if (!token) {
    return NextResponse.json(
      { success: false, msg: "Unauthorized access" },
      { status: 400 }
    );
  }
  // const id = "667ff969d27bcfc89d2a86ce";
  try {
    const productId = req.nextUrl.pathname.split("bookmark/")[1];
    const user = await UserModel.findById({ _id: token._id });

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User does not exist" },
        { status: 200 }
      );
    }

    const deleteBookmark = await BookmarkModel.deleteOne({
      userId: user._id,
      productId: productId,
    });

    console.log("existingBookmark ==> ", deleteBookmark);

    if (deleteBookmark.deletedCount === 0) {
      return NextResponse.json({
        success: true,
        msg: "Bookmark product already delete or does not exist",
      });
    }

    return NextResponse.json(
      { success: true, msg: "product deleted from bookmark successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error while bookmarking ==> ", error);
    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
