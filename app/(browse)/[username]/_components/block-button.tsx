'use client'

import { onBlock, onUnBlock } from '@/actions/block'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface Props {
  isBlocked: boolean
  blockedId: string
}

export function BlockButton({ isBlocked, blockedId }: Props) {
  const [isPending, startTransition] = useTransition()

  const onClickUnBlock = () => {
    startTransition(() => {
      onUnBlock(blockedId)
        .then(() => toast.success('차단해제 되었습니다.'))
        .catch(() => toast.error('에러가 발생하였습니다.'))
    })
  }

  const onClickBlock = () => {
    startTransition(() => {
      onBlock(blockedId)
        .then(() => toast.success('차단되었습니다.'))
        .catch(() => toast.error('에러가 발생하였습니다.'))
    })
  }

  return (
    <Button
      disabled={isPending}
      onClick={isBlocked ? onClickUnBlock : onClickBlock}
    >
      {isBlocked ? '차단해제' : '차단하기'}
    </Button>
  )
}
