import { FormEvent, useRef, useState } from 'react'

import { isValidEmail } from '@infinity-keys/core'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
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

const ProfilePage = () => {
  const { logIn, logOut, isAuthenticated, loading, currentUser } = useAuth()
  const { reconcilePuzzles, progressLoading } = useReconcileProgress()
  const [errorMessage, setErrorMessage] = useState('')
  const emailRef = useRef<HTMLInputElement | null>(null)

  const [deleteProgressLoading, setDeleteProgressLoading] = useState(false)

  const handleDeleteUserProgress = () => {
    setDeleteProgressLoading(true)

    setTimeout(() => {
      setDeleteProgressLoading(false)
    }, 200)
  }

  const handleLogOut = () => {
    setErrorMessage('')
    logOut()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    const email = emailRef.current ? emailRef.current.value : ''

    if (!isValidEmail(email)) {
      return setErrorMessage('Please enter a valid email')
    }

    try {
      await logIn({ email })
      // function -> reconcile cookies
      reconcilePuzzles()
    } catch (e) {
      setErrorMessage('Problem sending email')
    }
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
            <div className="flex flex-col items-center">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Your Email"
                  ref={emailRef}
                  className="mr-4 mb-2 rounded border border-brand-accent-primary bg-transparent text-lg text-white placeholder:text-gray-150 "
                />
                <Button type="submit" text="Log In" />
              </form>
              <p className="mt-8 max-w-prose">
                Infinity Keys takes your privacy seriously and will never store
                or associate your wallet address with your email.
              </p>
            </div>
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
      {currentUser &&
        currentUser.id === process.env.DELETE_PROGRESS_USER_ID && (
          <div className="flex justify-center pt-20">
            <ProgressDeleteButton onClick={handleDeleteUserProgress} />
          </div>
        )}
    </div>
  )
}

export default ProfilePage
