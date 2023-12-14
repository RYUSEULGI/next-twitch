'use client'

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function Wrapper({ children }: Props) {
  return <aside>{children}</aside>
}
