import { useEffect, useState, lazy } from 'react'

import { useParams } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import ProfileCell from 'src/components/ProfileCell'
import Seo from 'src/components/Seo/Seo'
import Wrapper from 'src/components/Wrapper/Wrapper'
import useReconcileProgress from 'src/hooks/useReconcileProgress'
import { clearRedirectTo } from 'src/providers/redirection'

const LoginModal = lazy(() => import('src/components/LoginModal/LoginModal'))
const ProgressDeleteButton = lazy(
  () => import('src/components/ProgressDeleteButton/ProgressDeleteButton')
)

const ProfilePage = () => {
  const { isAuthenticated, loading, logOut, currentUser } = useAuth()
  const { redirectTo } = useParams()

  const { reconcilePuzzles, progressLoading } = useReconcileProgress()
  const [errorMessage, setErrorMessage] = useState('')

  const [deleteProgressLoading, setDeleteProgressLoading] = useState(false)

  const handleLogOut = () => {
    setErrorMessage('')
    logOut()
  }

  useEffect(() => {
    // If a user manually navigates to the profile page, clear the redirect route
    // so they aren't navigated to the wrong page after logging in
    if (!redirectTo) {
      clearRedirectTo()
    }
  }, [redirectTo])

  return (
    <Wrapper>
      <Seo title="Profile" />
      {isAuthenticated &&
        !progressLoading &&
        !loading &&
        !deleteProgressLoading && (
          <div className="mx-auto w-full max-w-4xl pb-12">
            <ProfileCell handleLogOut={handleLogOut} />

            <button
              className="mx-auto mt-2 block italic text-gray-200 underline transition-colors hover:text-brand-accent-primary"
              onClick={() => reconcilePuzzles()}
            >
              Sync your progress
            </button>
          </div>
        )}

      {loading || progressLoading ? (
        <LoadingIcon />
      ) : (
        <div className="relative text-center">
          {!isAuthenticated && <LoginModal />}

          <p className="pt-2 text-center text-brand-accent-secondary">
            {errorMessage}
          </p>
        </div>
      )}
      {currentUser && currentUser.roles.includes('ADMIN') && (
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
