import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
      strategy: 'jwt',
    },
    pages: {
      signIn: "/login", // Custom sign-in page if needed
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required.");
          }
  
          // Find the user by email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
  
          // Check if user exists
          if (!user) {
            throw new Error("No account found with this email.");
          }
  
          // Verify password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password!);
          if (!isPasswordValid) {
            throw new Error("Incorrect email or password.");
          }
  
          // Return user object if all checks pass
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            image: user.image || undefined,
            isActive: user.isActive,
            otp: user.otp,
            otpExpires: user.otpExpires,
            emailVerified: user.emailVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
        },
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile }) {
        // Only for Google sign-ins
        if (account?.provider === "google") {
          console.log("Google user:", user, "\n\n\n");
          console.log("Google account:", account, "\n\n\n");
          console.log("Google profile:", profile, "\n\n\n");
          // Set `isActive` to true for Google users
          user.isActive = true;
          user.otp = null; // Remove OTP if it exists
          user.otpExpires = null; // Remove OTP expiration date if it exists
          user.password = null; // Remove password if it exists
        }
        return true; // Allow the sign-in
      },
      async session({ session, token }: { session: any; token: any }) {
        session.user.id = token.sub;
        session.user.isActive = token.isActive; // Add `isActive` to the session
        return session;
      },
      async jwt({ token, user }: { token: any; user?: any }) {
        if (user) {
          token.sub = user.id;
          token.email = user.email;
          token.name = user.name;
          token.isActive = user.isActive; // Add `isActive` to the JWT token
        }
        return token;
      },
      // redirect() {
      //   return '/chatbot-integration'
      // },
    },
  };

  