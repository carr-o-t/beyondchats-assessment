import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"


export default async function ChatbotIntegrationPage() {
     const session = await getServerSession(authOptions)
    return (
        <div>
            <h1>Chatbot Integration</h1>
            <p>Protected page, only accessible by authenticated users.</p>
            <p>Session: {JSON.stringify(session, null, 2)}</p>
        </div>
    )
}