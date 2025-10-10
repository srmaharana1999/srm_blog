import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./dbConnect";

import bcrypt from "bcryptjs";
import User from "./models/User";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "abc@domain.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password.");
        }
        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found!");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid Password.");
          }
          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.log("Error at Provider.");
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("user : ", user);
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      console.log("token : ", token);
      return token;
    },
    async session({ session, token }) {
      console.log("session : ", session);
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      console.log("session.user : ", session.user);
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
