'use client'

import { useSidebar } from '@/store/use-sidebar'
import { User } from '@prisma/client'
import { UserItem, UserItemSkeleton } from './user-item'

interface Props {
  recommended: User[]
}

export function RecommendedList({ recommended }: Props) {
  const { collapsed } = useSidebar((state) => state)

  const showLabel = !collapsed && recommended.length > 0

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">추천 채널</p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {recommended.map((user) => (
          <UserItem
            key={`user-${user.id}`}
            username={user.username}
            image={user.imageUrl}
            isLive={true}
          />
        ))}
      </ul>
    </div>
  )
}

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  )
}
