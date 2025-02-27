import { HTMLProps } from 'react'

import clsx from 'clsx'

interface TextProps extends HTMLProps<HTMLParagraphElement> {
  marginTop?: boolean
}

const Text = ({ marginTop = true, children, ...rest }: TextProps) => {
  return (
    <p
      className={clsx('text-base md:text-lg xl:text-xl', {
        'mt-7': marginTop,
      })}
      {...rest}
    >
      {children}
    </p>
  )
}

export default Text
