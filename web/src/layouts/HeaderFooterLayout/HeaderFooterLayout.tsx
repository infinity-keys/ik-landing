import { SkipNavLink } from '@redwoodjs/router'

import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/Header/Header'

import '@reach/skip-nav/styles.css'

const HeaderFooterLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <div className="absolute top-0 left-0 z-[55]">
        <SkipNavLink contentId="main-content" />
      </div>

      <Header />

      {children}

      <Footer />
    </>
  )
}

export default HeaderFooterLayout
