"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form,FormControl,FormField,FormLabel,FormItem,FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { CardWrapper } from "./card-wrapper"
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";


export const RegisterForm = () => {
    const [error,setError] = useState<string | undefined>("")
    const [success,setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues : {
            email: "", 
            password: "",
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        }) 
    }

    return (
       <CardWrapper headerLabel="Create an app" backButtonLabel="Already Have an Account" backButtonHref="/auth/login" showSocial>
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">

                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} {...field} placeholder="Your Name..." type="name"/>
                                    </FormControl>
                                    <FormMessage />
                        </FormItem>
                        )} 
                        /> 

                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} {...field} placeholder="Your Email..." type="email"/>
                                    </FormControl>
                                    <FormMessage />
                        </FormItem>
                        )} 
                        /> 

                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} {...field} placeholder="Your Password..." type="password"/>
                                    </FormControl>
                                    <FormMessage />
                        </FormItem>
                        )} 
                        /> 
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button disabled={isPending} type="submit" className="w-full">
                            Create An Account
                    </Button>
                </form>
            </Form>
       </CardWrapper>
    )
}