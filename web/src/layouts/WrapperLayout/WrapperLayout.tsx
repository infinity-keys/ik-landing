import Wrapper from 'src/components/Wrapper/Wrapper'

const WrapperLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Wrapper>
      <div className="pt-20">{children}</div>
    </Wrapper>
  )
}

export default WrapperLayout
