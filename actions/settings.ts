"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/custom-auth"
import { SettingsSchema } from "@/schemas"
import { getUserByEmail, getUserById } from "@/data/data"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import { useSession } from "next-auth/react"

export const settings = async (values : z.infer<typeof SettingsSchema>) => {
    const user = await currentUser()

    if (!user) return {error : "User Not Found!!"}

    const dbUser = await getUserById(user.id)

    
    if(!dbUser) return {error : "User Not Found!!"}

    if(user.isOauth) {
        values.email = undefined
        values.password = undefined
        values.newPassword = undefined
        values.isTwoFactorEnabled = undefined
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email)
        if(existingUser && existingUser.id !== user.id) {
            return {error : "Email Already Exists!!"}
        }
        const verificationToken = await generateVerificationToken(values.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return {success : "Confirmation Email Sent"}
    }


    if (values.password && values.newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(values.password, dbUser.password)

        if (!passwordMatch) {
            return {error : "Incorrect Password"}
        }

        const hashNewPassword = await bcrypt.hash(values.newPassword, 10)
        values.password = hashNewPassword
        values.newPassword = undefined
    }


     await db.user.update({
        where : {id : dbUser.id},
        data: {
            ...values
        }
    })


    return {success : "Settings Updated"}
}