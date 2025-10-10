import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { createSignupToken } from "@/utils/jwt/createSignupToken";
import { client, connectRedis } from "@/utils/redis/redis-client";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { responseJson } from "@/utils/api-response-handler";

export interface ITempUser {
  _id: mongoose.Types.ObjectId;
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    await Promise.all([connectRedis(), dbConnect()]);

    const { email, otp } = await req.json();

    if (!email || !otp) {
      return responseJson(
        {
          success: false,
          error: "Email and OTP field are empty. Please start again with ↻",
        },
        400
      );
    }
    const storedOtp = await client.get(email);
    if (!storedOtp) {
      return responseJson(
        {
          success: false,
          error: "OTP expired - regenerate with ↻",
        },
        400
      );
    }
    console.log("check-0");
    if (storedOtp !== otp) {
      return responseJson(
        { success: false, error: "Wrong OTP! Enter correct OTP." },
        400
      );
    }

    // Create or update user profile with emailConfirmed flag
    const user: ITempUser = await User.create({
      email,
      emailConfirmation: true,
    });

    if (!user) {
      return responseJson(
        { success: false, error: "Profile creation failed." },
        400
      );
    }

    const tempUser = {
      userId: user._id.toString(),
      email: user.email,
    };

    const token = await createSignupToken(tempUser);

    if (!token) {
      return responseJson(
        { success: false, error: "Sign-up token generation failed." },
        400
      );
    }

    // Set signup_token cookie
    (await cookies()).set("signup_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 6 * 60 * 60, // 6 hours
      path: "/",
    });
    console.log("check-4");
    await client.del(email);
    return responseJson(
      {
        success: true,
        message: "Email verified successfully",
        data: { isVerified: true },
      },
      200
    );
  } catch (error) {
    const errMessage =
      error instanceof Error
        ? error.message
        : String(error) || "Error verifying OTP";
    return responseJson({ success: false, error: errMessage }, 500);
  }
}
