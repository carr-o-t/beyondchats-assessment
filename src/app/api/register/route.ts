import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists with this email" },
      { status: 422 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
    },
  });

  console.log("user created :: ", user)

  await sendVerificationEmail(email, otp);

  return NextResponse.json({ message: "Verification email sent" });
}