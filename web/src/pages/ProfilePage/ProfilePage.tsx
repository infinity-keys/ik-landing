import { useState, lazy } from 'react'

import { useParams } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import ProfileCell from 'src/components/ProfileCell'
import Seo from 'src/components/Seo/Seo'
import logo from 'src/images/full-logo-1x.webp'

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

  const { redirectTo } = useParams()

  return (
    <div className="mx-6 min-h-[calc(100vh-80px)] justify-center pt-12 md:items-center md:pt-0">
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
            <div className="mx-auto max-w-md rounded-md bg-black/20 p-4 pb-8">
              <div className="mx-auto mb-6 w-64 md:w-80">
                <img src={logo} alt="" />
              </div>
              <Button
                href={
                  redirectTo
                    ? `${CLERK_SIGNIN_PORTAL_URL}?redirect_url=${window.location.origin}${redirectTo}`
                    : CLERK_SIGNIN_PORTAL_URL
                }
                openInNewTab={false}
                solid
              >
                Login
              </Button>
            </div>
          )}

          <p className="pt-2 text-center text-brand-accent-secondary">
            {errorMessage}
          </p>
        </div>
      )}
      {currentUser && hasRole('ADMIN') && (
        <div className="flex justify-center pb-20">
          <ProgressDeleteButton
            setDeleteProgressLoading={setDeleteProgressLoading}
          />
        </div>
      )}
    </div>
  )
}

export default ProfilePage
