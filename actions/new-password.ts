"use server"

import bcrypt from "bcryptjs"
import * as z from "zod"
import { db } from "@/lib/db";
import { getResetPasswordTokenByToken } from "@/data/reset-password";
import { getUserByEmail } from "@/data/data";
import { NewPasswordSchema } from "@/schemas";


export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
    if(!token) return {error : "Token Not Found!!"}

    const validateFields = NewPasswordSchema.safeParse(values)
    if (!validateFields.success) return {error : "Invalid Fields!"}

    const {password} = validateFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingToken = await getResetPasswordTokenByToken(token)
    if(!existingToken) return {error : "Invalid Token!"}

    const existingUser = await getUserByEmail(existingToken.email)
    if(!existingUser) return { error: "Email Doesn't Exist" }

    await db.user.update({
        where : {id : existingUser.id},
        data : {password : hashedPassword}
    })

    await db.resetPasswordToken.delete({
        where : {id : existingToken.id}
    })

    return {success : "Password Updated!"}
}