"use client"

import Link from "next/link"
import { Button } from "../ui/button"
interface FooterProps {
    labelFooter : string
    labelHref : string
}

export const BackButton = ({labelFooter, labelHref} : FooterProps) => {
    
    return (
        <Button variant={"link"} size={"sm"} asChild className="w-full font-normal">
            <Link href={labelHref} className="cursor-pointer duration-300 hover:text-blue-500">{labelFooter}</Link>
        </Button>
    )
}