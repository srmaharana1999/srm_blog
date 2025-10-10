import bcrypt from "bcryptjs";
import mongoose, { models, HydratedDocument } from "mongoose";

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  username?: string;
  email: string;
  password: string;
  emailConfirmation: boolean;
  avatarUrl?: string;
  bio?: string;
  signUpComplete: boolean;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a email."],
      unique: [true, "This email address is already taken."],
      lowercase: true,
      trim: true,
    },
    emailConfirmation: {
      type: Boolean,
      required: [true, "Please verify your email to proceed further."],
      default: false,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    signUpComplete: {
      type: Boolean,
      default: false,
    },
    avatarUrl: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 100,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.pre<HydratedDocument<IUser>>("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

const User = models?.User || mongoose.model<IUser>("User", userSchema);

export default User;
