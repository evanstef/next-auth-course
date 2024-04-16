"use client"

import React from "react"
import { logout } from "@/actions/logout"
import { useRouter } from "next/navigation"

interface LoginButtonProps {
    children : React.ReactNode,
}

export const LogoutButton = ({children} : LoginButtonProps) => {

    const router = useRouter()
    function onClick () {
        logout()
    }

    return (
        <span onClick={() => onClick()} className="cursor-pointer">
            {children}
        </span>
    )
}