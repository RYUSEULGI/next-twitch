'use client'

import { LiveBadge } from '@/components/live-badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar } from '@/components/user-avatar'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  username: string
  image: string
  isLive: boolean
}

export function UserItem({ username, image, isLive }: Props) {
  const pathname = usePathname()

  const { collapsed } = useSidebar((state) => state)

  const href = `/${username}`
  const isActive = pathname === href

  return (
    <div>
      <Button
        asChild
        variant="ghost"
        className={cn(
          'w-full h-12',
          collapsed ? 'justify-center' : 'justify-start',
          isActive && 'bg-accent',
        )}
      >
        <Link href={href}>
          <div
            className={cn(
              'flex items-center w-full gap-x-4',
              collapsed && 'justify-center',
            )}
          >
            <UserAvatar username={username} image={image} isLive={isLive} />
            {!collapsed && <p className="truncate">{username}</p>}
            {!collapsed && isLive && <LiveBadge className="ml-auto" />}
          </div>
        </Link>
      </Button>
    </div>
  )
}

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  )
}
