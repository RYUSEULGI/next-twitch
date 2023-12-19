'use server'

import { followUser, unFollowUser } from '@/lib/follow-service'
import { revalidatePath } from 'next/cache'

export async function onFollow(id: string) {
  try {
    const followedUser = await followUser(id)

    if (!followedUser) {
      return false
    }

    revalidatePath('/')
    revalidatePath(`/${followedUser.following.username}`)

    return true
  } catch (error) {
    throw new Error('서버에 오류가 발생하였습니다.')
  }
}

export async function onUnFollow(id: string) {
  try {
    const unFollowedUser = await unFollowUser(id)

    if (!unFollowedUser) {
      return false
    }

    revalidatePath('/')
    revalidatePath(`/${unFollowedUser.following.username}`)

    return true
  } catch (error) {
    throw new Error('서버에 오류가 발생하였습니다.')
  }
}
