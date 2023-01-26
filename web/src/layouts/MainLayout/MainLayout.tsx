import { SkipNavContent } from '@redwoodjs/router'

const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <SkipNavContent id="main-content" />
      <main>{children}</main>
    </>
  )
}

export default MainLayout
