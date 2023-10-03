import { SkipNavContent } from '@redwoodjs/router'

const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <SkipNavContent id="main-content" />
      <main className="text-gray-100">{children}</main>
    </>
  )
}

export default MainLayout
