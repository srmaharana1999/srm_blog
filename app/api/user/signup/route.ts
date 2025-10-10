import { ADMIN, URN } from "@/lib/constants";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import { responseJson } from "@/utils/api-response-handler";
import { SignupTokenPayload } from "@/utils/jwt/createSignupToken";
import { verifySignupToken } from "@/utils/jwt/verifyToken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const adminEmail = ADMIN.EMAIL;

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const { username, password, avatarUrl = "", bio } = await request.json();
    if (!username || !password) {
      return responseJson(
        {
          success: false,
          error: "Email and Password are required.",
        },
        400
      );
    }

    const signup_token = cookieStore.get("signup_token");
    if (!signup_token) {
      return responseJson({
        success: false,
        message: "Token has expired. Please,start the process again.",
      });
    }
    const jwtPayload: SignupTokenPayload = await verifySignupToken(
      signup_token?.value
    );

    const verifiedEmail = jwtPayload[URN.EMAIL_CLAIM];
    const verifiedUserId = jwtPayload.sub;
    if (!verifiedEmail) {
      return responseJson(
        {
          success: false,
          error: "Email is not verified",
        },
        400
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ verifiedEmail });

    if (existingUser) {
      return responseJson(
        {
          success: false,
          error: "This email is already in use.",
        },
        400
      );
    }
    // console.log("here");
    const isAdmin = verifiedEmail === adminEmail;
    const user = await User.findById(verifiedUserId);
    const reqBody = {
      email: verifiedEmail,
      password,
      username,
      avatarUrl,
      signUpComplete: true,
      bio,
      isAdmin,
      isVerified: true,
    };

    Object.assign(user, reqBody);

    await user.save();
    // const updatedUser = await user.save();
    // console.log(updatedUser);
    return responseJson(
      {
        success: true,
        message: "User signed up successfully",
        // data: { updatedUser },
      },
      201
    );
  } catch (error) {
    const errMessage =
      error instanceof Error
        ? error.message
        : String(error) || "Something went wrong! Try again.";
    return responseJson({ success: false, error: errMessage }, 500);
  }
}
