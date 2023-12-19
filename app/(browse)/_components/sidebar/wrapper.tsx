'use client'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
import { ReactNode } from 'react'
import { useIsClient } from 'usehooks-ts'
import { FollowingSkeleton } from './following-list'
import { RecommendedSkeleton } from './recommended-list'

interface Props {
  children: ReactNode
}

export function Wrapper({ children }: Props) {
  const isClient = useIsClient()
  const { collapsed } = useSidebar((state) => state)

  if (!isClient) {
    return (
      <aside
        className={cn(
          'fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50',
          collapsed && 'w-[70px]',
        )}
      >
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    )
  }

  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50',
        collapsed && 'w-[70px]',
      )}
    >
      {children}
    </aside>
  )
}
