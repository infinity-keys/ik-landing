import { Link, routes } from '@redwoodjs/router'

import Heading from 'src/components/Heading/Heading'
import Seo from 'src/components/Seo/Seo'
import HeaderFooterLayout from 'src/layouts/HeaderFooterLayout'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import WrapperLayout from 'src/layouts/WrapperLayout/WrapperLayout'
import Logo from 'src/svgs/Logo'

const NotFoundPage = () => {
  return (
    <HeaderFooterLayout>
      <MainLayout>
        <WrapperLayout>
          <Seo title="404 - Page Not Found" />

          <div className="text-center">
            <div className="pb-4 sm:mt-5 lg:mt-8">
              <Link
                to={routes.home()}
                className="inline-block"
                aria-label="Return home"
              >
                <Logo />
              </Link>
            </div>
            <Heading as="h1">heck tackle crab (check back later)</Heading>
          </div>
        </WrapperLayout>
      </MainLayout>
    </HeaderFooterLayout>
  )
}
export default NotFoundPage
