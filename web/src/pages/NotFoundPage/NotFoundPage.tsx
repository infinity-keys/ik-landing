import { Link, routes } from '@redwoodjs/router'

import Heading from 'src/components/Heading/Heading'
import Seo from 'src/components/Seo/Seo'
import Wrapper from 'src/components/Wrapper/Wrapper'
import SiteLayout from 'src/layouts/SiteLayout'
import Logo from 'src/svgs/Logo'

const NotFoundPage = () => {
  return (
    <SiteLayout>
      <Wrapper>
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
      </Wrapper>
    </SiteLayout>
  )
}
export default NotFoundPage
