import { PropsWithChildren } from 'react'

const ImagesContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden md:max-w-[50%]">
      {children}
    </div>
  )
}

export default ImagesContainer
