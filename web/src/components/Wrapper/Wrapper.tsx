import type { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'

type WrapperProps = {
  full?: boolean
  radialBg?: boolean
}

const Wrapper: FC<PropsWithChildren<WrapperProps>> = ({
  children,
  full = false,
  radialBg = true,
}) => (
  <div
    className={clsx('relative z-0 bg-blue text-gray-100', {
      'radial-bg': radialBg,
    })}
  >
    <div
      className={clsx(
        'flex min-h-[calc(100vh-80px)] flex-col items-center justify-center',
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
