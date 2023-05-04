import { useEffect, useState } from 'react'

import { useParams, navigate, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button'
import Seo from 'src/components/Seo/Seo'
import { saveRedirectTo } from 'src/providers/redirection'

const LoginModal = () => {
  const { signUp, isAuthenticated, reauthenticate } = useAuth()
  const { error, redirectTo } = useParams()
  const [errorText, setErrorText] = useState('')

  const getErrorText = (error: string) => {
    if (error === 'expired') return `Session expired, please log in again.`
  }

  const onSubmitSignUp = async (type: string) => {
    let parsedType = type
    let login_provider = ''
    if (type.includes('KEYP')) {
      parsedType = 'KEYP'
      login_provider = `&login_provider=${type.split('KEYP_')[1]}`
    }
    const response = await signUp({ type: parsedType })

    if (response.url) {
      window.location.href = response.url + login_provider
    } else {
      console.log('Something went wrong')
    }
  }

  useEffect(() => {
    if (redirectTo) {
      saveRedirectTo(redirectTo) && reauthenticate()
    }
  }, [redirectTo, reauthenticate])

  useEffect(() => {
    if (error) setErrorText(getErrorText(error) || 'KEYP ERROR')
  }, [error])

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.profile())
    }
  }, [isAuthenticated])

  const getButton = (type: string, text: string) => (
    <div className="w-full max-w-[200px]">
      <Button
        onClick={() => onSubmitSignUp(type)}
        text={text}
        variant="faded"
        border={false}
        fullWidth
      />
    </div>
  )

  return (
    <div className="flex justify-center">
      <Seo title="Sign In" description="Join to start collecting." />

      <div className="w-full max-w-md rounded-lg border-2 border-brand-accent-primary/10 bg-black/20 p-4 text-center">
        <div className="flex flex-col items-center gap-4 p-10">
          <h1 className="pb-2 text-2xl font-bold text-brand-accent-primary">
            Login to Infinity Keys
          </h1>
          {getButton('KEYP_DISCORD', 'Discord')}
          {getButton('KEYP_GOOGLE', 'Google')}
          {errorText && <div className="rw-cell-error mt-2">{errorText}</div>}
        </div>

        <p className="text-xs text-white/40">
          powered by{' '}
          <a
            className="transition-colors hover:text-brand-accent-secondary"
            href="https://www.usekeyp.com/"
            target="_blank"
            rel="noreferrer"
          >
            Keyp
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginModal
