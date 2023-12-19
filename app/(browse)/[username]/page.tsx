import { isBlockedByUser } from '@/lib/block-service'
import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import { BlockButton } from './_components/block-button'
import { FollowButton } from './_components/follow-button'

interface Props {
  params: { username: string }
}

export default async function UserPage({ params }: Props) {
  const user = await getUserByUsername(params.username)

  if (!user) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.id)
  const isBlocked = await isBlockedByUser(user.id)

  return (
    <div className="flex flex-col gap-y-4">
      <p>{user.username}</p>
      <p>{user.id}</p>
      <p>{`${isFollowing}`}</p>
      <FollowButton isFollowing={isFollowing} followingId={user.id} />
      <BlockButton isBlocked={isBlocked} blockedId={user.id} />
    </div>
  )
}
