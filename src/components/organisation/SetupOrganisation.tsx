"use client"

// app/setup-organisation/page.tsx
import { useState } from "react";
import ScrapingStatus from "@/components/ScrapingStatus";
import { Button } from "../ui/Button";

export default function SetupOrganisation() {
  const [isTraining, setIsTraining] = useState(false);

  const handleStartTraining = () => {
    setIsTraining(true);
    // Simulate training completion after 5 seconds
    setTimeout(() => setIsTraining(false), 5000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md space-y-6">
        {/* Form and metadata section */}
        <ScrapingStatus />
        <Button
          onClick={handleStartTraining}
          disabled={isTraining}
          className="w-full"
        >
          {isTraining ? "Training in progress..." : "Start Chatbot Training"}
        </Button>
      </div>
    </div>
  );
}