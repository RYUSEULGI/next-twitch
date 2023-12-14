import { db } from './db'

export async function getRecommended() {
  await new Promise((resolve) => setTimeout(resolve, 3000))

  const data = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return data
}
