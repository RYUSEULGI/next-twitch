'use client'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function Wrapper({ children }: Props) {
  const { collapsed } = useSidebar()

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
