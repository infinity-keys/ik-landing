import { PropsWithChildren } from 'react'

const AbsoluteImage = ({ children }: PropsWithChildren) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {children}
    </div>
  )
}

export default AbsoluteImage
