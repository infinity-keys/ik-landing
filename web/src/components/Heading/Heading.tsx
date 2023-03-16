import { HTMLProps } from 'react'

import clsx from 'clsx'

interface HeadingProps extends HTMLProps<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3'
  center?: boolean
  visual?: 's' | 'm' | 'l'
  turquoise?: boolean
}

export default function Heading({
  as = 'h2',
  center,
  visual = 'm',
  turquoise,
  children,
  ...rest
}: HeadingProps) {
  const classes = clsx(
    'tracking-tight font-bold',
    turquoise ? 'text-turquoise' : 'text-white',
    {
      'text-xl sm:text-2xl': visual === 's',
      'text-2xl sm:text-4xl': visual === 'm',
      'text-4xl sm:text-6xl': visual === 'l',
      'text-center': center,
      'text-turquoise': turquoise,
    }
  )

  switch (as) {
    case 'h1':
      return (
        <h1 className={classes} {...rest}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 className={classes} {...rest}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 className={classes} {...rest}>
          {children}
        </h3>
      )
  }
}
