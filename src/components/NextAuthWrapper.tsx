"use client"

import { SessionProvider } from "next-auth/react"
import Navbar from "./Navbar";


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