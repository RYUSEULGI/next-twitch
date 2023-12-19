import { getUser } from './auth-service'
import { db } from './db'

export async function isBlockedByUser(id: string) {
  try {
    const user = await getUser()

    const otherUser = await db.user.findUnique({
      where: { id },
    })

    if (!otherUser) {
      throw new Error('일치하는 유저가 없습니다.')
    }

    if (otherUser.id === user.id) {
      return false
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockedId: otherUser.id,
          blockerId: user.id,
        },
      },
    })

    return !!existingBlock
  } catch (error) {
    return false
  }
}

export async function blockedUser(id: string) {
  const user = await getUser()

  if (id === user.id) {
    throw new Error('자기 자신은 차단 할 수 없습니다.')
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  })

  if (!otherUser) {
    throw new Error('존재하지 않는 유저입니다.')
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: user.id,
        blockedId: otherUser.id,
      },
    },
  })

  if (existingBlock) {
    throw new Error('이미 차단중입니다.')
  }

  const block = await db.block.create({
    data: {
      blockerId: user.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  })

  return block
}

export async function unBlockedUser(id: string) {
  const user = await getUser()

  if (id === user.id) {
    throw new Error('자기 자신은 차단 해제 할 수 없습니다.')
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  })

  if (!otherUser) {
    throw new Error('존재하지 않는 유저입니다.')
  }

  const existingBlocked = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: user.id,
        blockedId: otherUser.id,
      },
    },
  })

  if (!existingBlocked) {
    throw new Error('차단 하고 있지 않습니다.')
  }

  const unblock = await db.block.delete({
    where: {
      id: existingBlocked.id,
    },
    include: {
      blocked: true,
    },
  })

  return unblock
}
