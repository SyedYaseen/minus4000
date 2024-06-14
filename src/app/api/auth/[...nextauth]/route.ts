import NextAuth from "next-auth"
import { AuthOptions } from "./Options"

const handler = NextAuth(AuthOptions)

export { handler as GET, handler as POST }
