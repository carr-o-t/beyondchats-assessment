import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Import authOptions for NextAuth configuration

export async function GET(req: Request) {
//   try {
    // Get the current session using getServerSession
    const session = await getServerSession(authOptions);

    console.log("Session in /api/get-server-session:", session);

    // if (!session) {
    //   // If there's no session, return null
    //   return NextResponse.json({ user: null });
    // }

    // Return the user object from the session
    return NextResponse.json({ user: session?.user || null });
//   } catch (error) {
//     console.error("Error fetching session:", error);
//     return NextResponse.json(
//       {user: null}
//     );
//   }
}
