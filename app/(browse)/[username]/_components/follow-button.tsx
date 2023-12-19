'use client'

import { onFollow, onUnFollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface Props {
  isFollowing: boolean
  followingId: string
}

export function FollowButton({ isFollowing, followingId }: Props) {
  const [isPending, startTransition] = useTransition()

  const onClickUnFollow = () => {
    startTransition(() => {
      onUnFollow(followingId)
        .then(() => toast.success('언팔로우되었습니다.'))
        .catch(() => toast.error('에러가 발생하였습니다.'))
    })
  }

  const onClickFollow = () => {
    startTransition(() => {
      onFollow(followingId)
        .then(() => toast.success('팔로우되었습니다.'))
        .catch(() => toast.error('에러가 발생하였습니다.'))
    })
  }

  return (
    <Button
      disabled={isPending}
      variant="primary"
      onClick={isFollowing ? onClickUnFollow : onClickFollow}
    >
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  )
}
