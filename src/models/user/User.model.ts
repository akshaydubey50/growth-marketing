import mongoose, { Schema } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
  forgetPasswordToken: string | undefined;
  forgetPasswordTokenExpiry: Date | undefined;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
}

const UserSchema: Schema<User> = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    // required: [true, "Password is required"],
  },
  forgetPasswordToken: {
    type: String,
    default: undefined,
  },
  forgetPasswordTokenExpiry: {
    type: Date,
    default: undefined,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyCode: {
    type: String,
    default: undefined,
    // required: [true, "Verify code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    default: undefined,
    // required: [true, "VerifyCodeExpiry is required"],
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
