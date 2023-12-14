import { ReactNode } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

interface Props {
  label: string
  children: ReactNode
  asChild?: boolean
  side?: 'top' | 'left' | 'right' | 'bottom'
  align?: 'start' | 'center' | 'end'
}

export function Hint({ label, children, asChild, side, align }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          className="text-black bg-white"
          side={side}
          align={align}
        >
          <p className="font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
