import Wrapper from 'src/components/Wrapper/Wrapper'

const WrapperLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Wrapper>
      <div className="w-full pt-20">{children}</div>
    </Wrapper>
  )
}

export default WrapperLayout
