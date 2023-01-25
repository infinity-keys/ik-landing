import { useRef, useState } from 'react'

import { z } from 'zod'

import { useAuth } from '@redwoodjs/auth'

import Button from 'src/components/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import ProfileCell from 'src/components/ProfileCell'
import Wrapper from 'src/components/Wrapper/Wrapper'

/*
  IMPORTANT: This page needs to run a GraphQL function to create a new user in
  the db. That function currently comes from ProfileCell.

  To create a user, we first check if they are authenticated with Magic.link,
  and then we run a GraphQL function (the query in ProfileCell) to call the
  getCurrentUser function. This function runs for all graphql requests. In it,
  we ensure the user has a valid token and authId, and create a new user or
  update an existing user.
*/

const isValidEmail = (email) => z.string().email().safeParse(email).success

const AuthPage = () => {
  const { logIn, logOut, isAuthenticated, loading, userMetadata } = useAuth()
  const [errorMessage, setErrorMessage] = useState('')
  const emailRef = useRef(null)

  const handleClick = async () => {
    setErrorMessage('')
    if (isAuthenticated) return logOut()

    const email = emailRef.current.value
    if (!isValidEmail(email)) {
      return setErrorMessage('Please enter a valid email')
    }

    try {
      // @NOTE: redirectURI not working with built-in logIn function
      await logIn({ email })
      // function -> reconcile cookies
    } catch (e) {
      setErrorMessage('Problem sending email')
    }
  }

  return (
    <Wrapper>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="relative">
          {!isAuthenticated && (
            <input
              type="email"
              placeholder="Your Email"
              ref={emailRef}
              className="mr-4 rounded border border-turquoise bg-transparent text-lg text-white placeholder:text-gray-150"
            />
          )}
          <Button
            onClick={handleClick}
            text={isAuthenticated ? 'Log Out' : 'Log In'}
          />
          <p className="absolute -bottom-8 left-0">{errorMessage}</p>
        </div>
      )}

      {isAuthenticated && (
        <div className="pt-12">
          <ProfileCell authId={userMetadata.issuer} />
        </div>
      )}
    </Wrapper>
  )
}

export default AuthPage
