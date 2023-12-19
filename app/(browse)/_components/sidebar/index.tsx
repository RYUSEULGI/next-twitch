import { getFollowUser } from '@/lib/follow-service'
import { getRecommended } from '@/lib/recommended-service'

import { FollowingList, FollowingSkeleton } from './following-list'
import { RecommendedList, RecommendedSkeleton } from './recommended-list'
import { Toggle } from './toggle'
import { Wrapper } from './wrapper'

export async function Sidebar() {
  const recommended = await getRecommended()
  const following = await getFollowUser()

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <FollowingList items={following} />
        <RecommendedList recommended={recommended} />
      </div>
    </Wrapper>
  )
}

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  )
}
