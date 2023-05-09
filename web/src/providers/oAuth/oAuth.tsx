import { PropsWithChildren, createContext, useState } from 'react'

import { useMutation } from '@apollo/client'
import { oAuthUrlQuery, oAuthUrlQueryVariables } from 'types/graphql'

import {
  OAUTH_URL_MUTATION,
  OAUTH_CODE_GRANT_MUTATION,
  OAUTH_REVOKE_MUTATION,
} from './graphql'

const OAuthContext = createContext<{
  isLoading: boolean
  error?: string
  submitCodeGrant?: ({
    code,
    grantState,
    type,
  }: {
    code?: string | null
    grantState?: string | null
    type?: string | null
  }) => { error: string; successMessage: string }
  getOAuthUrl?: () => void
  revokeOAuth?: () => void
}>({
  isLoading: true,
})

const OAuthProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState({})

  const [oAuthUrlMutation] = useMutation(OAUTH_URL_MUTATION)
  const [codeGrantMutation] = useMutation(OAUTH_CODE_GRANT_MUTATION)
  const [revokeMutation] = useMutation(OAUTH_REVOKE_MUTATION)

  const getOAuthUrl = async (type) => {
    try {
      if (!type) throw 'No type provided'
      setState({ isLoading: true })
      const { data, error } = await oAuthUrlMutation({
        variables: { type },
      })
      if (error) throw error
      setState({})
      return data.oAuthUrl
    } catch (e) {
      const errorMessage = `getOAuthUrl() Error fetching ${type}. ${e?.message}`
      return setState({ error: errorMessage, isLoading: false })
    }
  }

  const revokeOAuth = async (type) => {
    try {
      const { error } = await revokeMutation({
        variables: { type },
      })
      if (error) throw error
      return true
    } catch (e) {
      console.error(e?.message)
      setState({ error: e?.message, isLoading: false })
      return false
    }
  }

  const submitCodeGrant = async ({ code, grantState, type, accountId }) => {
    try {
      const { data } = await codeGrantMutation({
        variables: {
          type: type.toUpperCase(),
          code,
          state: grantState,
          accountId,
        },
      })
      const { codeGrant } = data

      if (codeGrant.status === 'SUCCESS') {
        setState({ isLoading: false })
        return {
          data: codeGrant,
          successMessage: 'Great - connection complete!',
        }
      } else {
        const errorMessage = 'Something went wrong'
        setState({ isLoading: false, error: errorMessage })
        return { error: errorMessage }
      }
    } catch (error) {
      setState({ isLoading: false, error: error.message })
      return { error: error.message }
    }
  }

  return (
    <OAuthContext.Provider
      value={{
        isLoading: state.isLoading,
        error: state.error,
        getOAuthUrl,
        // openOAuthUrl,
        submitCodeGrant,
        revokeOAuth,
      }}
    >
      {children}
    </OAuthContext.Provider>
  )
}

const useOAuth = () => React.useContext(OAuthContext)

export { OAuthProvider, useOAuth }
