
import { auth } from "@/auth"

export const useUserInfo = async () => {
    const session = await auth()
    return session?.user
}