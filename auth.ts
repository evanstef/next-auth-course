

import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserByEmail, getUserById,  } from "./data/data"
import { getTokenConfirmationByUserId } from "./data/two-factor-confirmation"
import { UserRole } from "@prisma/client"
import { getAccountByUserId } from "./data/account"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages : {
    signIn : "/auth/login",
    error : "/auth/error"
  },
  events : {
    async linkAccount({user}) {
      await db.user.update({
        where : {id : user.id}, 
        data : {emailVerified : new Date()}
      })
    }
  },
  callbacks : {
    async signIn({user, account}) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false 

      if (existingUser.isTwoFactorEnabled) {
        const tokenConfirmation = await getTokenConfirmationByUserId(existingUser.id)

        if (!tokenConfirmation) return false
        
        await db.twoFactorConfirmation.delete({
          where : {id : tokenConfirmation.id}
        })

        return true
      }
      
      return true
    },
    async session({token, session}) {
      if(token.sub && session.user) {
        session.user.id = token.sub
      }

      console.log(session);
      
      if(token.role && session.user) {
        session.user.role = token.role as UserRole
      }
      

      if(session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }

      if(session.user) {
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.isOauth = token.isOauth as boolean
      }

      return session
    },
    async jwt({token}) {
      if(!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id)
      

      token.isOauth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: {strategy : "jwt"},
  ...authConfig
})