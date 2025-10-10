import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { client, connectRedis } from "@/utils/redis/redis-client";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import {
  createSignupToken,
  SignupTokenPayload,
} from "@/utils/jwt/createSignupToken";
import { responseJson } from "@/utils/api-response-handler";
import { verifySignupToken } from "@/utils/jwt/verifyToken";
import { URN } from "@/lib/constants";
import OTPSender from "@/utils/otp-sender";

export async function POST(req: NextRequest) {
  try {
    await Promise.all([dbConnect(), connectRedis()]);

    const { email } = await req.json();

    if (!email) {
      return responseJson({ success: false, error: "Email is required" }, 409);
    }

    const cookieStore = await cookies();
    const signup_token = cookieStore.get("signup_token");

    if (signup_token) {
      const jwtPayload: SignupTokenPayload = await verifySignupToken(
        signup_token.value
      );
      if (jwtPayload[URN.EMAIL_CLAIM] === email) {
        return responseJson(
          {
            success: true,
            message: "Email verified, redirecting",
            data: { isVerified: true },
          },
          200
        );
      }
    }

    const user = await User.findOne({ email });

    if (user) {
      const tempUser = {
        userId: user._id.toString(),
        email: user.email,
      };
      const token = await createSignupToken(tempUser);

      if (!token) {
        return responseJson(
          { success: false, error: "Sign-up token generation failed." },
          409
        );
      }

      cookieStore.set("signup_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 6 * 60 * 60, // 6 hours
        path: "/",
      });

      return responseJson(
        {
          success: true,
          message: "Email verified, redirecting",
          data: { isVerified: true },
        },
        200
      );
    }

    const existingOTP = await client.get(email);

    if (existingOTP) {
      return responseJson(
        {
          success: false,
          message: "OTP already sent! Please check your email.",
          data: { isOTPValid: true },
        },
        400
      );
    }
    await OTPSender(email);

    return responseJson(
      {
        success: true,
        message: "OTP successfully sent to your email",
        data: { email, isVerified: false },
      },
      200
    );
  } catch (error) {
    console.error("Error in generate-otp:", error);
    const errMessage =
      error instanceof Error
        ? error.message
        : String(error) || "Error generating OTP";
    return responseJson({ success: false, error: errMessage }, 500);
  }
}
