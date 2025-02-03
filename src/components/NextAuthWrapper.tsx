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
            {children}
        </SessionProvider>
    )
}