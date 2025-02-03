import { User } from "next-auth";
import { Alert, AlertDescription, AlertTitle } from "./ui/Alert";
import { Terminal } from "lucide-react";

interface VerificationBannerProps extends React.HTMLAttributes<HTMLDivElement> {
    isActive: boolean;
  }

export default function VerificationBanner({isActive}: VerificationBannerProps) {
    if(isActive) return null
    return(
        <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Pending</AlertTitle>
      <AlertDescription>
        Verify your email address to access all features.
      </AlertDescription>
    </Alert>
    )
}