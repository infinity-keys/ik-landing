import { useEffect, useState } from 'react'

import { SocialProviderType } from '@infinity-keys/core'

import { useParams, navigate, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button'
import LoadingIcon from 'src/components/LoadingIcon/LoadingIcon'
import { saveRedirectTo } from 'src/providers/redirection'

const LoginForm = ({ redirectPath }: { redirectPath?: string }) => {
  const { signUp, isAuthenticated, reauthenticate } = useAuth()
  const { error, redirectTo } = useParams()
  const [errorText, setErrorText] = useState('')
  const [loading, setLoading] = useState(false)

  const getErrorText = (error: string) => {
    if (error === 'expired') return `Session expired, please log in again.`
  }

  const onSubmitSignUp = async (type: SocialProviderType) => {
    setLoading(true)
    // @NOTE: dbAuth expects a username and password
    const response = await signUp({
      type: type.includes('KEYP') ? 'KEYP' : type,
      username: '',
      password: '',
    })

    if (response.url) {
      const url = new URL(response.url)
      url.searchParams.set('login_provider', type.split('KEYP_')[1])
      window.location.href = url.toString()
    } else {
      setLoading(false)
      console.log('Something went wrong')
    }
  }

  useEffect(() => {
    if (redirectTo) {
      saveRedirectTo(redirectTo) && reauthenticate()
    } else if (redirectPath) {
      saveRedirectTo(redirectPath) && reauthenticate()
    }
  }, [redirectTo, reauthenticate, redirectPath])

  useEffect(() => {
    if (error) setErrorText(getErrorText(error) || 'KEYP ERROR')
  }, [error])

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.profile())
    }
  }, [isAuthenticated])

  const getButton = (type: SocialProviderType, text: string) => (
    <div className="w-full max-w-[200px]">
      <Button
        onClick={() => onSubmitSignUp(type)}
        variant="faded"
        border={false}
        fullWidth
      >
        {text}
      </Button>
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center">
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="w-full max-w-md rounded-lg border-2 border-brand-accent-primary/10 bg-black/20 p-4 text-center">
          <div className="flex flex-col items-center gap-4 py-10 px-4">
            <h1 className="pb-2 text-2xl font-bold text-brand-accent-primary">
              Login to Infinity Keys
            </h1>
            {getButton('KEYP_DISCORD', 'Discord')}
            {getButton('KEYP_GOOGLE', 'Google')}
            {errorText && <div className="rw-cell-error mt-2">{errorText}</div>}
          </div>

          <p className="text-xs text-white/40">
            Powered by{' '}
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
      )}
    </div>
  )
}

export default LoginForm