'use client'

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/store/use-sidebar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

export function Toggle() {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state)

  const label = collapsed ? '열림' : '닫힘'

  return (
    <>
      {collapsed ? (
        <div className="flex w-full items-center justify-center pt-4 pb-4">
          <Hint label={label} side="right" asChild>
            <Button variant="ghost" onClick={onExpand} className="h-auto p-2">
              <ArrowRightFromLine className="w-4 h-4" />
            </Button>
          </Hint>
        </div>
      ) : (
        <div className="p-3 pl-6 mb-2 flex items-center 2-full">
          <p className="font-semibold text-primary">For you</p>
          <Hint label={label} side="right" asChild>
            <Button
              variant="ghost"
              onClick={onCollapse}
              className="h-auto ml-auto p-2"
            >
              <ArrowLeftFromLine className="w-4 h-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}
