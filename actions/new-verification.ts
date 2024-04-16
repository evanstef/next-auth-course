"use server"

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/data";
import { getVerificationTokenByToken } from "@/data/verification-token";


export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token)
    console.log(existingToken);

    if(!existingToken) return {error : "Token Doesn't Exist"}

    const hasExpired = new Date(existingToken.expires) < new Date()

    if(hasExpired) return {error : "Token Has Expired"}

    const existingUser = await getUserByEmail(existingToken.email)

    if(!existingUser) return {error : "Email Doesn't Exist"}

    await db.user.update({
        where : {id : existingUser.id},
        data : {emailVerified : new Date(), email : existingToken.email}
    })

    await db.verificationToken.delete({
        where : {id : existingToken.id}
    })

    return {success : "Email Verified!"}
}