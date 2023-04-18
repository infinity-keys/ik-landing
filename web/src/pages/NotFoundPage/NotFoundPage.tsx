import { Link, routes } from '@redwoodjs/router'

import Heading from 'src/components/Heading/Heading'
import Seo from 'src/components/Seo/Seo'
import LogoFull1x from 'src/images/full-logo-1x.webp'
import LogoFull2x from 'src/images/full-logo-2x.webp'
import HeaderFooterLayout from 'src/layouts/HeaderFooterLayout'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import WrapperLayout from 'src/layouts/WrapperLayout/WrapperLayout'

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
                <img
                  srcSet={`${LogoFull1x}, ${LogoFull2x} 2x`}
                  src={LogoFull1x}
                  alt=""
                />
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
