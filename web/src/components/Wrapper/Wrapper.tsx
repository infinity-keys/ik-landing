import type { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'

type WrapperProps = {
  full?: boolean
  radialBg?: boolean
  customClasses?: string[]
}

const Wrapper: FC<PropsWithChildren<WrapperProps>> = ({
  children,
  full = false,
  customClasses = [],
}) => (
  <div className={clsx(customClasses)}>
    <div
      className={clsx(
        'flex min-h-screen flex-col items-center md:justify-center',
        {
          'container px-4': !full,
        }
      )}
    >
      {children}
    </div>
  </div>
)

export default Wrapper
