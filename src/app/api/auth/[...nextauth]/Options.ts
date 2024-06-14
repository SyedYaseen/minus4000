import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { validPassword } from "@/lib/auth/passwordUtils"
import prisma from "@/lib/db/prisma"

export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any, req: any) {
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        })

        if (
          user &&
          validPassword(credentials.password, user?.hash!, user?.salt!)
        ) {
          // console.log("Inside authorize", user)

          return user
        } else return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // authorization: {
      //   params: {
      //     access_type: "offline",
      //     prompt: "consent",
      //     response_type: "code",
      //   },
      // },
    }),
  ],

  session: {
    strategy: "jwt", // <-- make sure to use jwt here
    // maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider == "credentials") {
        // const csrfToken = credentials?.csrfToken
        return true
      }

      if (!profile?.email) {
        throw new Error("No profile")
      }
      try {
        const user = await prisma.user.upsert({
          where: {
            email: profile.email,
          },
          create: {
            email: profile.email,
            name: profile.name,
            emailVerified: profile.email_verified,
            image: profile.picture,
          },
          update: { name: profile.name },
        })

        if (account) {
          const newAccount = await prisma.account.upsert({
            where: {
              userId: user.id,
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            create: {
              ...account,
              userId: user.id,
            },
            update: {
              access_token: account.access_token,
            },
          })
        }
      } catch (err) {
        console.log(err)
        return false
      }

      return true
    },
    async jwt({ token, user, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      // if (account) {
      //   token.accessToken = account.access_token
      //   token.id = account.providerAccountId
      // }
      // To get access token - if I need to access google for that user further
      // if (account) token.accessToken = account?.access_token
      return token
    },
    async session({ session, token, user }) {
      // session.accessToken = token.accessToken as string
      return session
    },
  },
}
