import { db } from "@/lib/db";

export const getResetPasswordTokenByToken = async (token: string) => {
    try {
        const passwordToken = await db.resetPasswordToken.findUnique({ where: { token } })
        return passwordToken
    } catch {
        return null
    }
}

export const getResetPasswordTokenByEmail = async (email: string) => {
    try {
        const passwordToken = await db.resetPasswordToken.findFirst({ where: { email } })
        return passwordToken
    } catch {
        return null
    }
}