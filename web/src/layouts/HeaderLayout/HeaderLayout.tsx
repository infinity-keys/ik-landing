import { SkipNavLink } from '@redwoodjs/router'

import Header from 'src/components/Header/Header'

import '@reach/skip-nav/styles.css'

const HeaderLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <div className="absolute top-0 left-0 z-[55]">
        <SkipNavLink contentId="main-content" />
      </div>

      <Header />

      {children}
    </>
  )
}

export default HeaderLayout
