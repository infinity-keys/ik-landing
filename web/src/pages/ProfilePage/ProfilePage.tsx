import { useState, lazy } from 'react'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import ProfileCell from 'src/components/ProfileCell'
import Seo from 'src/components/Seo/Seo'
import Wrapper from 'src/components/Wrapper/Wrapper'

const ProgressDeleteButton = lazy(
  () => import('src/components/ProgressDeleteButton/ProgressDeleteButton')
)

const CLERK_SIGNIN_PORTAL_URL = process.env.CLERK_SIGNIN_PORTAL_URL

if (!CLERK_SIGNIN_PORTAL_URL) {
  throw new Error('Missing CLERK_SIGNIN_PORTAL_URL variable')
}

const ProfilePage = () => {
  const { isAuthenticated, loading, logOut, currentUser, hasRole } = useAuth()
  const [errorMessage, setErrorMessage] = useState('')
  const [deleteProgressLoading, setDeleteProgressLoading] = useState(false)

  const handleLogOut = () => {
    setErrorMessage('')
    logOut()
  }

  return (
    <Wrapper>
      <Seo title="Profile" />
      {isAuthenticated && !loading && !deleteProgressLoading && (
        <div className="mx-auto w-full max-w-4xl pb-12">
          <ProfileCell handleLogOut={handleLogOut} />
        </div>
      )}

      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="relative text-center">
          {!isAuthenticated && (
            <Button
              href={`${CLERK_SIGNIN_PORTAL_URL}?redirect_url=http://localhost:8910/profile`}
              openInNewTab={false}
              solid
            >
              Login
            </Button>
          )}

          <p className="pt-2 text-center text-brand-accent-secondary">
            {errorMessage}
          </p>
        </div>
      )}
      {currentUser && hasRole('ADMIN') && (
        <div className="flex justify-center pt-20">
          <ProgressDeleteButton
            setDeleteProgressLoading={setDeleteProgressLoading}
          />
        </div>
      )}
    </Wrapper>
  )
}

export default ProfilePage
