import VerifyEmailForm from "@/components/auth/VerifyEmailForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function RegisterPage() {
    const session = await getServerSession(authOptions)
    return <VerifyEmailForm session={session} />
}