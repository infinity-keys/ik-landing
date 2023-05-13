import { FormEvent, useRef, useState, useEffect } from 'react'

import { isValidEmail } from '@infinity-keys/core'
// import { deleteUserProgress } from 'api/src/services/profile/profile'

import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import ProfileCell from 'src/components/ProfileCell'
import Seo from 'src/components/Seo/Seo'
import useReconcileProgress from 'src/hooks/useReconcileProgress'

const DELETE_USER_PROGRESS_MUTATION = gql`
  mutation DeleteUserProgress {
    deleteUserProgress
  }
`

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
  const {
    logIn,
    logOut,
    isAuthenticated,
    loading: authLoading,
    currentUser,
  } = useAuth()
  const { reconcilePuzzles, progressLoading } = useReconcileProgress()
  const [errorMessage, setErrorMessage] = useState('')
  const emailRef = useRef(null)
  const [deleteUserProgress] = useMutation(DELETE_USER_PROGRESS_MUTATION)

  const [isCorrectUser, setIsCorrectUser] = useState(false)

  useEffect(() => {
    if (currentUser && currentUser.id === process.env.DELETE_PROGRESS_USER_ID) {
      setIsCorrectUser(true)
    } else {
      setIsCorrectUser(false)
    }
  }, [currentUser])

  const handleLogOut = () => {
    setErrorMessage('')
    logOut()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    const email = emailRef.current.value
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

  const handleDeleteProgress = async () => {
    console.log('delete progress')
    console.log(`currentUser: ${currentUser}`)
    console.log(`currentUser.id: ${currentUser.id}`)
    console.log(`env id: ${process.env.DELETE_PROGRESS_USER_ID}`)
    if (currentUser && currentUser.id === process.env.DELETE_PROGRESS_USER_ID) {
      console.log('Correct user')
    } else {
      console.log('Incorrect user')
    }
    try {
      const response = await deleteUserProgress()
      console.log(response)
    } catch (error) {
      console.error('Failed to run deleteUserProgress mutation:', error)
    }
  }

  return (
    <div>
      <Seo title="Profile" />
      {isAuthenticated && !progressLoading && !authLoading && (
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

      {authLoading || progressLoading ? (
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
      {isCorrectUser && (
        <div className="flex justify-center pt-20">
          <Button onClick={handleDeleteProgress} text={'Clear my progress'} />
        </div>
      )}
    </div>
  )
}

export default ProfilePage
