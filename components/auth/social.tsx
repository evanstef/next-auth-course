'use client'

import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { signIn } from "next-auth/react"
import { DEFAULT_REDIRECT_ROUTES } from "@/route"
import { useSearchParams } from "next/navigation"

export const Social = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")
    const onClick = ( provider : "google" | "github" ) => {
        signIn( provider,{
            callbackUrl: callbackUrl || DEFAULT_REDIRECT_ROUTES
        })
    }

    return (
        <div className="flex items-center gap-x-2 w-full">
            <Button className="w-full" size={"lg"} variant={"outline"} onClick={() => onClick("google")}>
                <FcGoogle className="w-6 h-6" />
            </Button>
            <Button className="w-full" size={"lg"} variant={"outline"} onClick={() => onClick("github")}>
                <FaGithub className="w-6 h-6" />
            </Button>
        </div>
    )
}