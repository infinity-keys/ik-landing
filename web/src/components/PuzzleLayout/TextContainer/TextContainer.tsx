import { PropsWithChildren, JSX } from 'react'

const TextContainer = ({
  Button,
  children,
}: {
  Button: JSX.Element
} & PropsWithChildren) => {
  return (
    <div className="relative flex w-full flex-col gap-4 text-center">
      <div className="flex-1 border-y-2 border-stone-50">
        <div className="relative h-full">
          <div className="flex h-full min-h-[300px] flex-col justify-center px-12 py-6 md:min-h-[412px]">
            {children}
          </div>
        </div>
      </div>

      <div>{Button}</div>
    </div>
  )
}

export default TextContainer
