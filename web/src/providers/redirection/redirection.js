import { isBrowser } from '@redwoodjs/prerender/browserUtils'
import { routes } from '@redwoodjs/router'

import { logIn } from 'src/providers/auth'
import { useOAuth } from 'src/providers/oAuth'

const LOCAL_REDIRECT_TO_KEY = 'redirect_to'

// If one of these types, treat the incoming action as a login
export const APPROVED_LOGIN_PROVIDERS = ['KEYP']

const saveRedirectTo = (redirect) =>
  redirect &&
  !redirect.includes('login') &&
  localStorage.setItem(LOCAL_REDIRECT_TO_KEY, redirect)

const getRedirectTo = () => {
  const url = localStorage.getItem(LOCAL_REDIRECT_TO_KEY)
  localStorage.removeItem(LOCAL_REDIRECT_TO_KEY)
  return url
}

const RedirectionContext = React.createContext({
  errorMessage: '',
  successMessage: '',
  isLoading: false,
})

const RedirectionProvider = ({ children }) => {
  const [state, setState] = React.useState({ isLoading: true })

  const { submitCodeGrant } = useOAuth()

  let url
  let code
  let grantState
  /* eslint-disable camelcase */
  let error_description
  let error
  let type

  if (isBrowser) {
    url = new URL(window.location.href) // Support prerender
    code = url.searchParams.get('code')
    grantState = url.searchParams.get('state')
    error = url.searchParams.get('error')
    error_description = url.searchParams.get('error_description')
    type = url.pathname.split('/redirect/')[1]
  }

  const submitLoginCodeGrant = async () => {
    // Note: login came from `useAuth`, but is now imported from `src/providers`
    const response = await logIn({
      code,
      state: grantState,
      type: type.toUpperCase(),
      method: 'login',
    })
    if (response.error || !response || !response.id)
      return setState({
        isLoading: false,
        errorMessage: response.error || 'Something went wrong',
      })

    setState({
      isLoading: false,
      successMessage: "Great - You're signed in!",
    })
    setTimeout(() => {
      window.location = routes.profile()
    }, [3000])
  }

  const completeOAuth = async () => {
    const { error: codeGrantError, successMessage: successMessageCodeGrant } =
      await submitCodeGrant({ code, grantState, type })
    if (codeGrantError)
      return setState({ errorMessage: codeGrantError, isLoading: false })
    console.log('submitCodeGrant success!')
    setState({ successMessage: successMessageCodeGrant, isLoading: false })
  }

  React.useEffect(() => {
    if (!isBrowser) return
    if (!url.pathname.includes('/redirect')) return

    if (error) {
      setState({
        isLoading: false,
        errorMessage: error_description || 'Something went wrong',
      })
    } else if (!code || !grantState) {
      setState({
        isLoading: false,
        errorMessage: 'Invalid redirect parameters',
      })
    } else if (APPROVED_LOGIN_PROVIDERS.includes(type.toUpperCase())) {
      submitLoginCodeGrant()
    } else {
      completeOAuth()
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [code, grantState])

  return (
    <RedirectionContext.Provider value={state}>
      {children}
    </RedirectionContext.Provider>
  )
}

const useRedirection = () => React.useContext(RedirectionContext)

export { RedirectionProvider, useRedirection, saveRedirectTo, getRedirectTo }
