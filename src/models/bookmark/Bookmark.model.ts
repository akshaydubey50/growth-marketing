import mongoose, { Schema } from "mongoose";

export interface Bookmark extends Document {
  userId: Schema.Types.ObjectId;
  itemId: string;
  itemType: "tools" | "prompts";
}

const bookmarkSchema: Schema<Bookmark> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is required"],
  },
  itemId: {
    type: String,
    required: [true, "ItemId is required"],
  },
  itemType: {
    type: String,
    enum: ["tools", "prompts"],
    required: [true, "Item type is required"],
  },
});

const BookmarkModel =
  (mongoose.models.Bookmark as mongoose.Model<Bookmark>) ||
  mongoose.model<Bookmark>("Bookmark", bookmarkSchema);

export default BookmarkModel;
