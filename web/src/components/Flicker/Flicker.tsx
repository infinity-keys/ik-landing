import { ReactNode } from 'react'

import clsx from 'clsx'

interface FlickerProps {
  delay?: string
  once?: boolean
  bold?: boolean
  children: ReactNode
}

const Flicker = ({
  delay = '0s',
  once = false,
  bold = false,
  children,
}: FlickerProps) => (
  <span
    style={{ animationDelay: delay }}
    className={clsx(
      'text-brand-accent-primary opacity-0',
      once ? 'animate-fadeGlow' : 'animate-flickerGlow',
      bold ? 'font-bold' : 'font-medium'
    )}
  >
    {children}
  </span>
)

export default Flicker
