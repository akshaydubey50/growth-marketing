import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import UserModel from "@/models/user/User.model";
import connectDB from "@/db/dbConnect";
import LikeModel from "@/models/likes/Like.model";

export async function POST(req: NextRequest) {
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
    const productId = req.nextUrl.pathname.split("like/")[1];
    const user = await UserModel.findById({ _id: token._id });

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User does not exist" },
        { status: 400 }
      );
    }

    const likeExist = await LikeModel.findOne({
      userId: user._id,
      productId: productId,
    });

    //Same productId exist with user
    if (likeExist) {
      console.log("Existing Like product", likeExist);
      return NextResponse.json(
        { success: true, msg: "Already liked by" },
        { status: 200 }
      );
    }

    const like = new LikeModel({
      productId,
      userId: user._id,
    });

    const savedLiked = await like.save();

    if (!savedLiked) {
      return NextResponse.json(
        { success: false, msg: "Failed to like the product" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, msg: "success", like },
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
    const productId = req.nextUrl.pathname.split("like/")[1];
    const user = await UserModel.findById({ _id: token._id });

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "User does not exist" },
        { status: 404 }
      );
    }

    const deleteLike = await LikeModel.deleteOne({
      userId: user._id,
      productId: productId,
    });

    console.log("existingBookmark ==> ", deleteLike);

    if (deleteLike.deletedCount === 0) {
      return NextResponse.json(
        {
          success: true,
          msg: "Product already delete or does not exist",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        msg: "product deleted from like successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error while deleting Like ==> ", error);

    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
