"use client"

// components/AuthWrapper.tsx
import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import GoogleImg from "../../../public/google.svg";
import Image from "next/image";

interface AuthWrapperProps {
  title: string;
  subheader: string;
  children: ReactNode;
  showFooter?: boolean;
}

export const AuthWrapper = ({ title, subheader, children, showFooter=true }: AuthWrapperProps) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {subheader}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
     {showFooter && <CardFooter className="flex flex-col justify-center w-full">
        <div className="relative w-full">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
        </div>
        <Button  variant={"outline"} className="mt-4 w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2" type="button">
        <svg role="img" viewBox="0 0 24 24" className="mr-2"><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path></svg>
            Google
        </Button>
      </CardFooter>}
    </Card>
  );
};