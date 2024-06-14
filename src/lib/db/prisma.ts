import { PrismaClient } from "@prisma/client"

// Docs about instantiating `PrismaClient` with Next.js:
// https://pris.ly/d/help/next-js-best-practices
declare global {
  var prisma: PrismaClient | undefined
}

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient()
// } else {
//   if (!globalThis.prisma) {
//     globalThis.prisma = new PrismaClient()
//   }
//   prisma = globalThis.prisma
// }

const prisma = global.prisma || new PrismaClient({ log: ["info"] })
if (process.env.NODE_ENV !== "production") global.prisma = prisma

export default prisma

// const prisma = global.prisma || new PrismaClient({ log: ["info"] })
// if (process.env.NODE_ENV !== "production") global.prisma = prisma

// export default prisma
