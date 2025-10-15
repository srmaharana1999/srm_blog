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

const TAGS = {
  INITIAL_SUGGESTIONS: [
    "React",
    "Tailwind",
    "Shadcn",
    "TypeScript",
    "Redux",
    "Zustand",
    "GraphQL",
    "Next.js",
  ],
  MAX_TAGS: 5,
};

const CATEGORIES = {
  INITIAL_SUGGESTIONS: [
    "Software Development",
    "JavaScript and Frontend Frameworks",
    "Python and Data Science",
    "DevOps and Cloud Infrastructure",
    "Engineering Culture and System Architecture",
    "Cybersecurity and Data Protection",
    "Machine Learning and Artificial Intelligence",
    "Crypto and Blockchain Technology",
    "Technical Writing and Documentation",
    "SaaS Product Marketing",
    "Product Management and Project Management",
    "Computer Science Concepts and Research",
    "Mobile App Development",
    "Web Development and Design",
    "Emerging Technologies and Innovation",
  ],
};
export { ALG, URN, SCOPES, REDIS, ADMIN, SENDER, TAGS, CATEGORIES };
