import { PropsWithChildren } from 'react'

const ResponsiveHeight = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative h-full min-h-[300px] md:min-h-[412px]">
      {children}
    </div>
  )
}

export default ResponsiveHeight
