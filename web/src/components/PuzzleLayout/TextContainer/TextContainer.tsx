import { PropsWithChildren, JSX } from 'react'

import ResponsiveHeight from 'src/components/PuzzleLayout/ResponsiveHeight/ResponsiveHeight'

const TextContainer = ({
  Button,
  children,
}: {
  Button: JSX.Element
} & PropsWithChildren) => {
  return (
    <div className="relative flex w-full flex-col gap-4 text-center">
      <div className="flex-1 border-y-2 border-stone-50">
        <ResponsiveHeight>
          <div className="flex h-full flex-col justify-center px-12 py-6">
            {children}
          </div>
        </ResponsiveHeight>
      </div>

      <div>{Button}</div>
    </div>
  )
}

export default TextContainer
