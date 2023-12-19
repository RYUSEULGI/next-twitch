import { getUser } from './auth-service'
import { db } from './db'

export async function isFollowingUser(id: string) {
  try {
    const user = await getUser()

    const otherUser = await db.user.findUnique({
      where: { id },
    })

    if (!otherUser) {
      throw new Error('일치하는 유저가 없습니다.')
    }

    if (otherUser.id === user.id) {
      return true
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: user.id,
        followingId: otherUser.id,
      },
    })

    return !!existingFollow
  } catch (error) {
    return false
  }
}

export async function followUser(id: string) {
  const user = await getUser()

  const otherUser = await db.user.findUnique({
    where: { id },
  })

  if (!otherUser) {
    throw new Error('존재하지 않는 유저입니다.')
  }

  if (otherUser.id === user.id) {
    throw new Error('자기 자신은 팔로우 할 수 없습니다.')
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: user.id,
      followingId: otherUser.id,
    },
  })

  if (existingFollow) {
    throw new Error('이미 팔로우 중입니다.')
  }

  const follow = await db.follow.create({
    data: {
      followerId: user.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  })

  return follow
}

export async function unFollowUser(id: string) {
  const user = await getUser()

  const otherUser = await db.user.findUnique({
    where: { id },
  })

  if (!otherUser) {
    throw new Error('존재하지 않는 유저입니다.')
  }

  if (otherUser.id === user.id) {
    throw new Error('자기 자신은 언팔로우 할 수 없습니다.')
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: user.id,
      followingId: otherUser.id,
    },
  })

  if (!existingFollow) {
    throw new Error('팔로우 하고 있지 않습니다.')
  }

  const unFollow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  })

  return unFollow
}
