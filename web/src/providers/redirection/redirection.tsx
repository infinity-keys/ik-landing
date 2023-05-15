import {
  useState,
  useCallback,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
} from 'react'

import { AuthProviderType } from '@infinity-keys/core'

import { isBrowser } from '@redwoodjs/prerender/browserUtils'
import { routes } from '@redwoodjs/router'

import { logIn } from 'src/providers/auth'
import { useOAuth } from 'src/providers/oAuth'

const LOCAL_REDIRECT_TO_KEY = 'redirect_to'

// If one of these types, treat the incoming action as a login
export const APPROVED_LOGIN_PROVIDERS = ['KEYP']

const saveRedirectTo = (redirect: string) =>
  !redirect.includes('login') &&
  localStorage.setItem(LOCAL_REDIRECT_TO_KEY, redirect)

const getRedirectTo = (): string | null => {
  const url = localStorage.getItem(LOCAL_REDIRECT_TO_KEY)
  localStorage.removeItem(LOCAL_REDIRECT_TO_KEY)
  return url
}

const RedirectionContext = createContext<{
  errorMessage?: string
  successMessage?: string
  isLoading: boolean
}>({
  errorMessage: '',
  successMessage: '',
  isLoading: false,
})

const RedirectionProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<{
    isLoading: boolean
    errorMessage?: string
    successMessage?: string
  }>({ isLoading: true })

  const [authState, setAuthState] = useState<{
    url: URL | null
    code: string | null
    grantState: string | null
    error_description?: string | null
    error?: string | null
    type: AuthProviderType
  }>({
    url: null,
    code: '',
    grantState: '',
    type: 'KEYP',
  })

  const { submitCodeGrant } = useOAuth()

  const submitLoginCodeGrant = useCallback(async () => {
    // Note: login came from `useAuth`, but is now imported from `src/providers`
    const response = await logIn({
      code: authState.code,
      state: authState.grantState,
      type: authState.type,
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
      window.location.href = routes.profile()
    }, 3000)
  }, [authState])

  const completeOAuth = useCallback(async () => {
    if (!submitCodeGrant)
      return setState({ errorMessage: 'No submitCodeGrant', isLoading: false })

    const { error: codeGrantError, successMessage: successMessageCodeGrant } =
      await submitCodeGrant({
        code: authState?.code,
        grantState: authState?.grantState,
        type: authState.type.toUpperCase(),
      })

    if (codeGrantError)
      return setState({ errorMessage: codeGrantError, isLoading: false })
    console.log('submitCodeGrant success!')
    setState({ successMessage: successMessageCodeGrant, isLoading: false })
  }, [authState, submitCodeGrant])

  useEffect(() => {
    if (isBrowser) {
      const url = new URL(window.location.href)

      setAuthState({
        url,
        code: url.searchParams.get('code'),
        grantState: url.searchParams.get('state'),
        error_description: url.searchParams.get('error_description'),
        error: url.searchParams.get('error'),
        type: 'KEYP',
      })
    }
  }, [])

  useEffect(() => {
    if (!isBrowser) return
    if (!authState?.url?.pathname?.includes('/redirect')) return

    if (authState.error) {
      setState({
        isLoading: false,
        errorMessage: authState.error_description || 'Something went wrong',
      })
    } else if (!authState.code || !authState.grantState) {
      setState({
        isLoading: false,
        errorMessage: 'Invalid redirect parameters',
      })
    } else if (
      authState?.type &&
      APPROVED_LOGIN_PROVIDERS.includes(authState.type.toUpperCase())
    ) {
      submitLoginCodeGrant()
    } else {
      completeOAuth()
    }
  }, [authState, submitLoginCodeGrant, completeOAuth])

  return (
    <RedirectionContext.Provider value={state}>
      {children}
    </RedirectionContext.Provider>
  )
}

const useRedirection = () => useContext(RedirectionContext)

export { RedirectionProvider, useRedirection, saveRedirectTo, getRedirectTo }
