'use client'

import { useSidebar } from '@/store/use-sidebar'
import { Follow, User } from '@prisma/client'
import { UserItem, UserItemSkeleton } from './user-item'

interface Props {
  items: (Follow & { following: User })[]
}

export function FollowingList({ items }: Props) {
  const { collapsed } = useSidebar((state) => state)

  if (!items.length) {
    return null
  }

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">팔로우 채널</p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {items.map((follow) => (
          <UserItem
            key={`following-${follow.id}`}
            username={follow.following.username}
            image={follow.following.imageUrl}
            isLive={true}
          />
        ))}
      </ul>
    </div>
  )
}

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  )
}
