import { useRef, useState } from 'react'

import { z } from 'zod'

import { useAuth } from '@redwoodjs/auth'

import Button from 'src/components/Button'
import Wrapper from 'src/components/Wrapper/Wrapper'

const isValidEmail = (email) => z.string().email().safeParse(email).success

const AuthPage = () => {
  const { logIn, logOut, isAuthenticated } = useAuth()
  const [errorMessage, setErrorMessage] = useState('')
  const emailRef = useRef(null)

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
      <div className="relative">
        {!isAuthenticated && (
          <input
            type="text"
            placeholder="email"
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
    </Wrapper>
  )
}

export default AuthPage
