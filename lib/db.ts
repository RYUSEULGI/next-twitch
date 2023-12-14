import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db
}

// nextjs에서 파일을 저장할 때 hot reload라는게 발생
// 그렇게 되면 prismaClient가 계속 새로 생성되게 됨
//
