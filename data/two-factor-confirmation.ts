import { db } from "@/lib/db";


export const getTokenConfirmationByUserId = async (userId: string) => {
    try {
        const twoFactorToken = await db.twoFactorConfirmation.findUnique({ where: { userId } });
        return twoFactorToken;
    } catch {
        return null;
    }
}