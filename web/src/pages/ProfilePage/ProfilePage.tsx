import { useState } from 'react'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import LoginModal from 'src/components/LoginModal/LoginModal'
import ProfileCell from 'src/components/ProfileCell'
import ProgressDeleteButton from 'src/components/ProgressDeleteButton/ProgressDeleteButton'
import Seo from 'src/components/Seo/Seo'
import useReconcileProgress from 'src/hooks/useReconcileProgress'

/*
  IMPORTANT: This page needs to run a GraphQL function to create a new user in
  the db. That function currently comes from ProfileCell.

  To create a user, we first check if they are authenticated with Magic.link,
  and then we run a GraphQL function (the query in ProfileCell) to call the
  getCurrentUser function. This function runs for all graphql requests. In it,
  we ensure the user has a valid token and authId, and create a new user or
  update an existing user.
*/

type CurrentUser = {
  roles: string[]
  // include other properties of currentUser here
}

const ProfilePage = () => {
  const {
    isAuthenticated,
    loading,
    logOut,
    currentUser: unknownUser,
  } = useAuth()

  const currentUser = unknownUser as CurrentUser | null

  const { reconcilePuzzles, progressLoading } = useReconcileProgress()
  const [errorMessage, setErrorMessage] = useState('')

  const [deleteProgressLoading, setDeleteProgressLoading] = useState(false)

  const handleDeleteUserProgress = () => {
    setDeleteProgressLoading(true)
  }

  const handleLogOut = () => {
    setErrorMessage('')
    logOut()
  }

  return (
    <div>
      <Seo title="Profile" />
      {isAuthenticated &&
        !progressLoading &&
        !loading &&
        !deleteProgressLoading && (
          <div className="mx-auto w-full max-w-lg pb-12">
            <ProfileCell />

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
          {!isAuthenticated ? (
            <LoginModal />
          ) : (
            <div>
              <Button
                onClick={handleLogOut}
                text={isAuthenticated ? 'Log Out' : 'Log In'}
              />
            </div>
          )}

          <p className="pt-2 text-center text-brand-accent-secondary">
            {errorMessage}
          </p>
        </div>
      )}
      {currentUser && currentUser.roles.includes('ADMIN') && (
        <div className="flex justify-center pt-20">
          <ProgressDeleteButton
            onClick={handleDeleteUserProgress}
            setDeleteProgressLoading={setDeleteProgressLoading}
          />
        </div>
      )}
    </div>
  )
}

export default ProfilePage
