"use server"
import * as z from "zod"
import { db } from "@/lib/db";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_REDIRECT_ROUTES } from "@/route";
import { getUserByEmail } from "@/data/data";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens";
import { sendVerificationEmail, sendTwoFactorToken} from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTokenConfirmationByUserId } from "@/data/two-factor-confirmation";



export const login = async (values : z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
    const validateFields = LoginSchema.safeParse(values)
    if (!validateFields.success) {
        return { error : "Invalid Fields!" }
    }

    const { email, password, code} = validateFields.data
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) { 
        return { error : "Email Is Not Exist" }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return { success : "Confirmation Email Sent" }
    }

    if(existingUser.isTwoFactorEnabled && existingUser.email) {
        if(code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
            if(!twoFactorToken) return { error : "Invalid Code!" }

            if(twoFactorToken.token !== code) return { error : "Code Is Wrong" }

            const hasExpired = new Date(twoFactorToken.expires) < new Date()

            if(hasExpired) {
                return { error : "Code Has Expired" }
            }

            await db.twoFactorToken.delete({
                where : { id : twoFactorToken.id }
            })

            const existingConfirmationToken = await getTokenConfirmationByUserId(existingUser.id)

            if(existingConfirmationToken) {
                await db.twoFactorConfirmation.delete({
                    where : { id : existingConfirmationToken.id }
                })
            }

            await db.twoFactorConfirmation.create({
                data : {
                    userId : existingUser.id
                }
            })
        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email)
            await sendTwoFactorToken(twoFactorToken.email, twoFactorToken.token)
            return { twoFactor : true }
        }

    }


    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo : callbackUrl || DEFAULT_REDIRECT_ROUTES
        }) 
    } catch (error) {
        if (error instanceof AuthError) {
            switch(error.type) {
                case "CredentialsSignin":
                    return { error : "Invalid Email or Password!" }
                default:
                    return { error : "Something went wrong!" }
            }
        }
        throw error
    }
    
}