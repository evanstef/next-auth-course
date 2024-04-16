"use server"

import * as z from "zod"
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/data";
import { generateResetPasswordToken } from "@/lib/tokens";
import { sendResetPasswordEmail } from "@/lib/mail";


export const reset = async (values : z.infer<typeof ResetSchema>) => {
    const validateFields = ResetSchema.safeParse(values)

    console.log(validateFields);
    
    
    if (!validateFields.success) {
        return { error : "Invalid Fields!" }
    }

    const { email } = validateFields.data
    const existingUser = await getUserByEmail(email)

    if(!existingUser) {
        return { error : "Email Is Not Exist" } 
    }



    // TODO

    const resetPasswordToken = await generateResetPasswordToken(email)
    await sendResetPasswordEmail(resetPasswordToken.email, resetPasswordToken.token)

    return {success : "Reset Email Sent"}
}