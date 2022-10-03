import { SkipNavLink, SkipNavContent } from '@redwoodjs/router'

import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/Header/Header'

import '@reach/skip-nav/styles.css'

type SiteLayoutProps = {
  children?: React.ReactNode
}

const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <>
      <div className="absolute top-0 left-0 z-[55]">
        <SkipNavLink contentId="main-content" />
      </div>

      <Header />
      <SkipNavContent id="main-content" />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default SiteLayout
