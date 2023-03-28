import Wrapper from 'src/components/Wrapper/Wrapper'
import { useLocation } from '@redwoodjs/router'

const WrapperLayout = ({ children }: { children?: React.ReactNode }) => {
  const { pathname } = useLocation()
  const pathArray = pathname.split('/').filter(Boolean)
  const baseClass =
    pathArray[0] && (pathArray[0] === 'pack' || pathArray[0] === 'puzzle')
      ? pathArray[0]
      : ''

  return (
    <Wrapper
      customClasses={[
        baseClass,
        baseClass ? `${baseClass}--${pathArray[1]}` : '',
      ]}
    >
      <div className="w-full pt-20">{children}</div>
    </Wrapper>
  )
}

export default WrapperLayout
