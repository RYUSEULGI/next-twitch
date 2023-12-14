import { ReactNode } from 'react'
import { Navbar } from './(home)/_components/navbar'

export default function BrowseLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="flex h-full pt-20">{children}</div>
    </div>
  )
}
