import { HTMLProps } from 'react'

import clsx from 'clsx'

interface SectionProps extends HTMLProps<HTMLElement> {
  largePadding?: boolean
  mediumPadding?: boolean
}

const Section = ({
  largePadding = true,
  mediumPadding = true,
  children,
  ...rest
}: SectionProps) => {
  return (
    <section
      className={clsx('mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8', {
        'md:py-28': mediumPadding,
        'lg:py-40': largePadding,
      })}
      {...rest}
    >
      {children}
    </section>
  )
}

export default Section
