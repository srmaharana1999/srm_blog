const ALG = "HS256";

const URN = {
  // Issuer and Audience URNs
  ISSUER: "urn:blogitx:auth-service",
  AUDIENCE_SIGNUP: "urn:blogitx:signup-service",

  // Custom Claim Keys
  EMAIL_CLAIM: "urn:blogitx:claims/email",
  SCOPE_CLAIM: "urn:blogitx:claims/scope",
};

const SCOPES = {
  // Specific values for the SCOPE_CLAIM
  SIGNUP_COMPLETION: "signup_completion",
  SESSION: "session",
};

const REDIS = {
  CLIENT: process.env.UPSTASH_REDIS_CLIENT!,
};

const ADMIN = {
  EMAIL: process.env.ADMIN_EMAIL,
};

const SENDER = {
  EMAIL: process.env.EMAIL_USER,
  PASS: process.env.EMAIL_PASS,
  SERVICE: "gmail",
};
export { ALG, URN, SCOPES, REDIS, ADMIN, SENDER };
