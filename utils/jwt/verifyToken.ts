import { SCOPES, URN } from "@/lib/constants";
import * as jose from "jose";
import { SignupTokenPayload } from "./createSignupToken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set.");
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifySignupToken(
  token: string
): Promise<SignupTokenPayload> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET, {
      issuer: URN.ISSUER,
      audience: URN.AUDIENCE_SIGNUP,
    });

    const typedPayload = payload as SignupTokenPayload;

    if (typedPayload[URN.SCOPE_CLAIM] !== SCOPES.SIGNUP_COMPLETION) {
      throw new jose.errors.JWTClaimValidationFailed(
        "Invalid scope for signup completion",
        typedPayload
      );
    }

    return typedPayload;
  } catch (error: unknown) {
    console.error("JWT Verification Failed:", (error as Error).message);

    if (error instanceof jose.errors.JWTExpired) {
      throw new Error("Verification session expired. Please restart signup.");
    }

    throw new Error("Authentication token invalid.");
  }
}
