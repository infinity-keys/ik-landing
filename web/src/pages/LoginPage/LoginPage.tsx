import { useEffect } from 'react'

import { useParams, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button'
import { saveRedirectTo } from 'src/providers/redirection'

const LoginPortal = () => {
  const { signUp, isAuthenticated, reauthenticate } = useAuth()

  const { error, redirectTo } = useParams()

  const [errorText, setErrorText] = React.useState('')
  const getErrorText = (error) => {
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
      window.location = response.url + login_provider
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

  const getButton = (type, text) => (
    <div className="mt-6">
      <Button
        onClick={() => onSubmitSignUp(type)}
        text={text}
        size="small"
        variant="faded"
        border={false}
        fullWidth
      />
    </div>
  )

  return (
    <div className="flex justify-center">
      <div className="bg-black/20 py-8 px-12">
        <h1 className="rounded pb-4 text-2xl font-bold text-brand-accent-primary">
          Login with Keyp
        </h1>
        {getButton('KEYP_DISCORD', 'Discord')}
        {getButton('KEYP_GOOGLE', 'Google')}
        {errorText && <div className="rw-cell-error mt-2">{errorText}</div>}
      </div>
    </div>
  )
}

const LoginPage = () => {
  return (
    <>
      <MetaTags title="Sign In" description="Join to start collecting." />
      <LoginPortal />
    </>
  )
}

export default LoginPage
