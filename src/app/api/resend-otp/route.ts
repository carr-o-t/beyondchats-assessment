import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 1️⃣ Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "No user found with this email" }, { status: 404 });
    }

    // 2️⃣ Generate new OTP and expiry
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes

    // 3️⃣ Save new OTP to database
    await prisma.user.update({
      where: { email },
      data: { otp: newOtp, otpExpires },
    });

    // 4️⃣ Send OTP email
    await sendVerificationEmail(email, newOtp);

    return NextResponse.json({ message: "A new OTP has been sent to your email." });

  } catch (error) {
    console.error("Resend OTP Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
