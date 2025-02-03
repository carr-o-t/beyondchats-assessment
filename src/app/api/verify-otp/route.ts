import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
    if (!user.otp ) {
      return NextResponse.json({ error: "OTP not found or expired. Please request a new one." }, { status: 400 });
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

    // redirect("/setup-organisation");

    // ✅ Force session refresh after email verification
    const session = await getServerSession(authOptions);
    session!.user.isActive = true; // ✅ Ensure session is updated

    return NextResponse.json({ message: "Email verified successfully" });

  } catch (error) {
    console.error("OTP Verification Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
