import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import UserModel from "@/models/user/User.model";
import mongoose from "mongoose";
import connectDB from "@/db/dbConnect";
import BookmarkModel from "@/models/bookmark/Bookmark.model";

export async function GET(req: NextRequest) {
  await connectDB();

  const token = await getToken({ req: req });

  if (!token || token?._id === undefined) {
    return NextResponse.json(
      { success: false, msg: "Unauthorized access" },
      { status: 400 }
    );
  }

  try {
    const user = await UserModel.findOne({
      email: token?.email,
    });

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User does not exist" },
        { status: 404 }
      );
    }

    const bookmarks = await BookmarkModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user?._id),
        },
      },
      {
        $group: {
          _id: "$itemType", // Group by itemType (either 'product' or 'prompt')
          itemIds: { $addToSet: "$itemId" }, // Collect all itemIds for the corresponding itemType
          totalBookmarks: { $sum: 1 }, // Count total bookmarks
        },
      },
      {
        $project: {
          _id: 0, // Remove _id from the result
          itemType: "$_id", // Set _id as itemType in the result
          itemIds: "$itemIds", // Array of itemIds (products or prompts)
          totalBookmarks: "$totalBookmarks", // Total count of bookmarks for this itemType
        },
      },
    ]);

    if (bookmarks.length === 0) {
      return NextResponse.json(
        { success: true, bookmarks: null, msg: "No items bookmarked" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        msg: "Bookmarks fetched successfully",
        bookmarks, // This contains both itemIds and total count per itemType (product or prompt)
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error while fetching bookmarks ==> ", error);

    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
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
    const { itemId, itemType } = await req.json(); // Extracting itemId and itemType from the request body
    console.log("itemId seerveer ==> ", itemId, itemType);
    /*  if (itemType != "tool" || itemType != "prompt") {
      return NextResponse.json(
        { success: false, msg: "Invalid itemType" },
        { status: 400 }
      );
    } */
    const user = await UserModel.findOne({ email: token?.email });

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User does not exist" },
        { status: 404 }
      );
    }

    // Check if bookmark for this itemId and itemType already exists
    const bookmarkExisting = await BookmarkModel.findOne({
      userId: user._id,
      itemId,
      itemType,
    });

    if (bookmarkExisting) {
      return NextResponse.json(
        { success: true, msg: `Already bookmarked this ${itemType}` },
        { status: 200 }
      );
    }

    // Create a new bookmark
    const bookmark = new BookmarkModel({
      itemId,
      itemType,
      userId: new mongoose.Types.ObjectId(user._id),
    });

    const savedBookmarked = await bookmark.save();

    if (!savedBookmarked) {
      return NextResponse.json(
        { success: false, msg: `Failed to bookmark ${itemType}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, msg: `${itemType} bookmarked successfully`, bookmark },
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
export async function DELETE(req: NextRequest) {
  await connectDB();

  const token = await getToken({ req: req });

  if (!token) {
    return NextResponse.json(
      { success: false, msg: "Unauthorized access" },
      { status: 400 }
    );
  }

  try {
    const { itemId, itemType } = await req.json(); // Extracting itemId and itemType from the request body
    const user = await UserModel.findOne({ email: token?.email });

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User does not exist" },
        { status: 404 }
      );
    }

    // Attempt to delete the bookmark
    const deleteBookmark = await BookmarkModel.deleteOne({
      userId: user._id,
      itemId,
      itemType,
    });

    if (deleteBookmark.deletedCount === 0) {
      return NextResponse.json({
        success: true,
        msg: `${itemType} already deleted or does not exist in bookmarks`,
      });
    }

    return NextResponse.json(
      { success: true, msg: `${itemType} deleted from bookmarks successfully` },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error while deleting bookmark ==> ", error);
    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
