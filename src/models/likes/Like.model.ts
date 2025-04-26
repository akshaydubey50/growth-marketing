
import mongoose, { Schema, Document } from "mongoose";

export interface Like extends Document {
  userId: Schema.Types.ObjectId;
  itemId: string;
  itemType: "tools" | "prompts"; // Define different types of items a user can like
}

const likeSchema: Schema<Like> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  itemId: {
    type: String,
    required: [true, "Item ID is required"],
  },
  itemType: {
    type: String,
    enum: ["tools", "prompts"], // Restrict itemType to specific values
    required: [true, "Item type is required"],
  },
});

const LikeModel =
  (mongoose.models.Like as mongoose.Model<Like>) ||
  mongoose.model<Like>("Like", likeSchema);

export default LikeModel;
