import { ALG, SCOPES, URN } from "@/lib/constants";
import * as jose from "jose";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set.");
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export interface SignupTokenPayload extends jose.JWTPayload {
  sub: string;
  "urn:blogitx:claims/email": string;
  "urn:blogitx:claims/scope": "signup_completion" | "session";
}

interface ICreateSignupToken {
  email: string;
  userId: string;
}

export const createSignupToken = async ({
  email,
  userId,
}: ICreateSignupToken): Promise<string> => {
  const payload: Omit<SignupTokenPayload, "iss" | "aud" | "exp" | "iat"> = {
    sub: userId,
    "urn:blogitx:claims/email": email,
    "urn:blogitx:claims/scope": SCOPES.SIGNUP_COMPLETION,
  };

  const signup_token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setIssuer(URN.ISSUER)
    .setAudience(URN.AUDIENCE_SIGNUP)
    .setExpirationTime("6h") // Standard temporary expiry for verification steps
    .sign(JWT_SECRET);

  return signup_token;
};
