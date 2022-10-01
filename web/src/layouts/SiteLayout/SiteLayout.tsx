import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/Header/Header'

type SiteLayoutProps = {
  children?: React.ReactNode
}

const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default SiteLayout
