import { cn } from '@/lib/utils'

import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const font = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

export function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
          <Image src="/twitch.svg" alt="next-twitch" width={32} height={32} />
        </div>
        <div className={cn('hidden lg:block', font.className)}>
          <p className="text-lg font-semibold">NEXT_TWITCH</p>
          <p className="text-sm text-muted-foreground">dashboard</p>
        </div>
      </div>
    </Link>
  )
}
