import type { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'

type WrapperProps = {
  full?: boolean
  fullHeight?: boolean
  radialBg?: boolean
  customClasses?: string[]
}

const Wrapper: FC<PropsWithChildren<WrapperProps>> = ({
  children,
  full = false,
  fullHeight = false,
  radialBg = true,
  customClasses = [],
}) => (
  <div
    className={clsx(customClasses, 'relative z-0 bg-blue text-gray-100', {
      'radial-bg': radialBg,
    })}
  >
    <div
      className={clsx(
        'flex flex-col items-center justify-center',
        fullHeight ? 'min-h-screen' : ' min-h-[calc(100vh-80px)]',
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
