import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { LiveBadge } from './live-badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Skeleton } from './ui/skeleton'

const avatarSizes = cva('', {
  variants: {
    size: {
      default: 'h-8 w-8',
      lg: 'h-14 w-14',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

interface Props extends VariantProps<typeof avatarSizes> {
  username: string
  image: string
  isLive?: boolean
  showBadge?: boolean
}

export function UserAvatar({
  username,
  size = 'default',
  showBadge,
  image,
  isLive,
}: Props) {
  const canShowBadge = showBadge && isLive

  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && 'ring-2 ring-rose-500 border border-background',
          avatarSizes({ size }),
        )}
      >
        <AvatarImage src={image} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  )
}

interface SkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({ size }: SkeletonProps) => {
  return <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />
}
