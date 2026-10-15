"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

export default function Sessionprovider({children,mySession}:{children:ReactNode, mySession:Session | null}) {
  return (
    <SessionProvider session={mySession}>
        {children}
    </SessionProvider>
  )
}
