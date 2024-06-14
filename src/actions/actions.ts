"use server"
import { genPassword } from "@/lib/auth/passwordUtils"
import prisma from "@/lib/db/prisma"
import { z } from "zod"

export async function signUpUser(form: FormData) {
  if (form) {
    const signUpSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const result = await signUpSchema.spa({
      email: form.get("email"),
      password: form.get("password"),
    })

    if (!result.success) {
      console.log(result.error)
    } else {
      const { data } = result
      const { salt, hash } = genPassword(data.password)

      await prisma.user.create({
        data: {
          email: data.email,
          hash,
          salt,
        },
      })
    }
  }
}
