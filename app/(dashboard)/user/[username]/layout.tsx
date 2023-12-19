import { getMyUsernameByUsername } from '@/lib/auth-service'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { DashboardNavbar } from './_components/navbar'
import { DashboardSidebar } from './_components/sidebar'
import { DashboardContainer } from './_components/dashboard-container'

interface Props {
  params: { username: string }
  children: ReactNode
}

export default async function DashboardUserLayout({ params, children }: Props) {
  const user = await getMyUsernameByUsername(params.username)

  if (!user) {
    redirect('/')
  }

  return (
    <>
      <DashboardNavbar />
      <div className="flex h-full pt-20">
        <DashboardSidebar />
        <DashboardContainer>{children}</DashboardContainer>
      </div>
    </>
  )
}
