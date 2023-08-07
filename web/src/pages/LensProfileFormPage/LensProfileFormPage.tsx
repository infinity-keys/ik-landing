import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const LensProfileFormPage = () => {
  return (
    <>
      <MetaTags title="LensProfileForm" description="LensProfileForm page" />

      <h1>LensProfileFormPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/LensProfileFormPage/LensProfileFormPage.tsx</code>
      </p>
      <p>
        My default route is named <code>lensProfileForm</code>, link to me with
        `<Link to={routes.lensProfileForm()}>LensProfileForm</Link>`
      </p>
    </>
  )
}

export default LensProfileFormPage
