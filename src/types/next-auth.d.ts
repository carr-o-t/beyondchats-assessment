import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string;
    isActive: boolean;
    password: string | null;
    otp: string | null;
    otpExpires: Date | null;
    image?: string;
    emailVerified: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }

  interface Session {
    user: User;
  }
}
