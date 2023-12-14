import { ReactNode, Suspense } from 'react'
import { Container } from './_components/container'
import { Navbar } from './_components/navbar'
import { Sidebar, SidebarSkeleton } from './_components/sidebar'

export default function BrowseLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </div>
  )
}
