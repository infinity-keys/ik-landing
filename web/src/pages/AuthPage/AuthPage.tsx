import { useEffect, useRef, useState } from 'react'

import { UpsertUser, UpsertUserVariables } from 'types/graphql'
import { z } from 'zod'

import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'

import Button from 'src/components/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import Wrapper from 'src/components/Wrapper/Wrapper'

const MUTATION = gql`
  mutation UpsertUser($authId: String!, $email: String!) {
    upsertUser(authId: $authId, email: $email) {
      id
    }
  }
`
const isValidEmail = (email) => z.string().email().safeParse(email).success

const AuthPage = () => {
  const { logIn, logOut, isAuthenticated, loading, userMetadata } = useAuth()

  const [errorMessage, setErrorMessage] = useState('')
  const emailRef = useRef(null)

  const [create] = useMutation<UpsertUser, UpsertUserVariables>(MUTATION)

  useEffect(() => {
    console.log(userMetadata)
    if (isAuthenticated) {
      create({
        variables: { email: userMetadata.email, authId: userMetadata.issuer },
      })
    }
  }, [isAuthenticated, userMetadata, create])

  const handleClick = async () => {
    if (isAuthenticated) return logOut()

    setErrorMessage('')
    const email = emailRef.current.value

    if (!isValidEmail(email)) {
      return setErrorMessage('Please enter a valid email')
    }

    try {
      const user = await logIn({ email })

      console.log('user: ', user)
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
    </Wrapper>
  )
}

export default AuthPage
