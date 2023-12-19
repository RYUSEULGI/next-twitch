'use server'

import { blockedUser, unBlockedUser } from '@/lib/block-service'
import { revalidatePath } from 'next/cache'

export async function onBlock(id: string) {
  try {
    const user = await blockedUser(id)

    if (!user) {
      return false
    }

    revalidatePath('/')
    revalidatePath(`/${user.blocked.username}`)

    return true
  } catch (error) {
    throw new Error('서버에 오류가 발생하였습니다.')
  }
}

export async function onUnBlock(id: string) {
  try {
    const user = await unBlockedUser(id)

    if (!user) {
      return false
    }

    revalidatePath('/')
    revalidatePath(`/${user.blocked.username}`)

    return true
  } catch (error) {
    throw new Error('서버에 오류가 발생하였습니다.')
  }
}
