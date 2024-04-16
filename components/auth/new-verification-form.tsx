"use client"
import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./card-wrapper"
import BeatLoader from "react-spinners/BeatLoader"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { Form } from "../ui/form"

export const NewVerificationForm = () => {
    const [error,setError] = useState<string | undefined>("")
    const [success,setSuccess] = useState<string | undefined>("")
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        console.log(token);
        
        if(!token) {
            setError("Missing Token")
            return;
        }

        newVerification(token)
            .then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
            .catch(() => {
                setError("Something went wrong!")
            })
    }, [token])
    
    useEffect(() => {
        onSubmit()
    }, [onSubmit])


    return (
        <CardWrapper headerLabel="Verify Your Email" backButtonLabel="Back To Login" backButtonHref="/auth/login">
            <div className="w-full flex justify-center items-center">
                {!success && !error && (
                    <BeatLoader />
                )}
            <FormError message={error} />
            <FormSuccess message={success} />
            </div>
        </CardWrapper>
    )
}