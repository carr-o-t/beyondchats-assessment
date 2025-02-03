"use client"

import { SessionProvider } from "next-auth/react";


export const NextAuthWrapper = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
        <SessionProvider>
            {/* <Navbar /> */}
            <div className="w-full h-full p-4">
            {children}
            </div>
        </SessionProvider>
    )
}