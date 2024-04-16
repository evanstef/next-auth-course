
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import bcrypt from "bcryptjs"

import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/data";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId : process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials)
        if(validateFields.success) {
          const { email, password } = validateFields.data
          const user : any = await getUserByEmail(email)
          if(!user || !user.password) return null;
          const passwordMatch = await bcrypt.compare(password, user.password)
          if(passwordMatch) return user;
        }
        return null
      }
    }),

  ],
} satisfies NextAuthConfig