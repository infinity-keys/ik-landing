import { useEffect } from 'react'

import { useParams, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
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
    <button onClick={() => onSubmitSignUp(type)} className="login-button mt-2">
      <div className="align-center m-1 flex items-center justify-center">
        <span className="mr-2">{text}</span>
      </div>
    </button>
  )

  return (
    <div className="flex justify-center text-white">
      <div className="login-portal-container w-80 sm:w-96">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          <span className="block xl:inline">Keyp Example App Redwood</span>
        </h1>
        <div className="mt-6">
          <div className="mb-2">
            <h2 className="color-grey-light text-center text-base font-bold">
              Sign in
            </h2>
          </div>
        </div>

        <div className="login-portal-container--button-wrapper ">
          {getButton('KEYP_DISCORD', 'Discord')} <br />
          {getButton('KEYP_NODE_OIDC', 'oidc-provider')} <br />
          {getButton('KEYP_GOOGLE', 'Google')} <br />
          {errorText && <div className="rw-cell-error mt-2">{errorText}</div>}
        </div>
        <div className="w-full text-center"></div>
        <h4 className="mt-6">
          <a className="mr-2 text-blue" href="/">
            Terms of Service
          </a>
          ·
          <a className="ml-2 text-blue" href="/">
            Privacy Policy
          </a>
        </h4>
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
