import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import Image from 'next/image'

const font = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

export function Logo() {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white rounded-full p-1">
        <Image src="/spooky.svg" alt="next-twitch" width="80" height="80" />
      </div>
      <div className={cn('flex flex-col items-center', font.className)}>
        <p className="text-xl font-semibold">NEXT-TWITCH</p>
        <p className="text-sm text-muted-foreground">play</p>
      </div>
    </div>
  )
}
