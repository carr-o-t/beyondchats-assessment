
import { PrismaClient } from '@prisma/client'
import "server-only"

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient
}

let newPrisma: PrismaClient
if (process.env.NODE_ENV === 'production') {
    newPrisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  newPrisma = global.cachedPrisma
}

// import { PrismaClient } from "@prisma/client";

// const newPrisma = new PrismaClient();

export const prisma = newPrisma