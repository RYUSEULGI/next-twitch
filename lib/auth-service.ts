import { currentUser } from '@clerk/nextjs'
import { db } from './db'

export async function getUser() {
  const user = await currentUser()

  if (!user || !user.username) {
    throw new Error('Unauthorized')
  }

  const data = await db.user.findUnique({
    where: { externalUserId: user.id },
  })

  if (!data) {
    throw new Error('Not found')
  }

  return data
}

export async function getMyUsernameByUsername(username: string) {
  const user = await currentUser()

  if (!user || !user.username) {
    throw new Error('Unauthorized')
  }

  const data = await db.user.findUnique({
    where: { username },
  })

  if (!data) {
    throw new Error('Not found')
  }

  if (user.username !== data.username) {
    throw new Error('Unauthorized')
  }

  return data
}
