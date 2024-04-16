"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { LoginSchema, NewPasswordSchema, ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form,FormControl,FormField,FormLabel,FormItem,FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { CardWrapper } from "./card-wrapper"
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { reset } from "@/actions/reset";
import { newPassword } from "@/actions/new-password";


export const NewPasswordForm = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [error,setError] = useState<string | undefined>("")
    const [success,setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues : {
            password: "", 
        }
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
           newPassword(values, token)
            .then((data) => {
               setError(data?.error)
               setSuccess(data?.success)
           })
        }) 
    }

    return (
       <CardWrapper headerLabel="Insert New Password" backButtonLabel="Back To Login" backButtonHref="/auth/login">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">

                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} {...field} placeholder="Your New Password..." type="password"/>
                                    </FormControl>
                                    <FormMessage />
                        </FormItem>
                        )} 
                        /> 


                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type="submit" className="w-full">
                        Reset Password
                    </Button>
                </form>
            </Form>
       </CardWrapper>
    )
}