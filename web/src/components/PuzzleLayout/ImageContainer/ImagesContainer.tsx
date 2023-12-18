import { PropsWithChildren } from 'react'

const ImagesContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      {children}
    </div>
  )
}

export default ImagesContainer
