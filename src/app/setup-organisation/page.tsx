import SetupOrganisation from "@/components/organisation/SetupOrganisation"
import SetupOrganisationForm from "@/components/organisation/SetupOrganisationForm"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"


export default async function ChatbotIntegrationPage() {
     const session = await getServerSession(authOptions)
    return (
        // <SetupOrganisation />
        <SetupOrganisationForm />
    )
}