"use client"

import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/Alert";
import { usePathname } from "next/navigation";

interface VerificationBannerProps extends React.HTMLAttributes<HTMLDivElement> {
    isActive: boolean;
  }

export default function VerificationBanner({isActive}: VerificationBannerProps) {
  const path = usePathname();

    if(isActive || path === "/") return null
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