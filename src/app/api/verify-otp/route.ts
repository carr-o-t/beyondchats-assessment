import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    // 1️⃣ Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "No user found with this email" }, { status: 404 });
    }

    // 2️⃣ Check if user is already active
    if (user.isActive) {
        return NextResponse.json({ error: "User is already verified. No need to resend OTP." }, { status: 400 });
      }

    // 3️⃣ Check if OTP exists and is still valid
    if (!user.otp || !user.otpExpires) {
      return NextResponse.json({ error: "OTP not found or expired. Please request a new one." }, { status: 400 });
    }

    const now = new Date();

    if (now > user.otpExpires) {
      return NextResponse.json({ error: "OTP expired. Please request a new one." }, { status: 400 });
    }

    // 4️⃣ Check if OTP is incorrect
    if (user.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP. Please try again." }, { status: 400 });
    }

    // 5️⃣ OTP is correct → Activate user
    await prisma.user.update({
      where: { email },
      data: { isActive: true, otp: null, otpExpires: null },
    });

    return NextResponse.json({ message: "Email verified successfully" });

  } catch (error) {
    console.error("OTP Verification Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
