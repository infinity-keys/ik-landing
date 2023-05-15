import { PropsWithChildren, createContext, useCallback, useState } from 'react'

import { useMutation } from '@apollo/client'

import { OAUTH_CODE_GRANT_MUTATION } from './graphql'

type SubmitCodeGrantParams = {
  code?: string | null
  grantState?: string | null
  type?: string | null
  accountId?: string | null
}

const OAuthContext = createContext<{
  isLoading: boolean
  error?: string
  submitCodeGrant?: ({
    code,
    grantState,
    type,
    accountId,
  }: SubmitCodeGrantParams) => Promise<{
    error?: string
    successMessage?: string
    data?: {
      action: string
      text: string
      status: string
    }
  }>
}>({
  isLoading: true,
})

const OAuthProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState({ isLoading: true, error: '' })
  const [codeGrantMutation] = useMutation(OAUTH_CODE_GRANT_MUTATION)

  const submitCodeGrant = useCallback(
    async ({ code, grantState, type, accountId }: SubmitCodeGrantParams) => {
      try {
        const { data } = await codeGrantMutation({
          variables: {
            type: type?.toUpperCase(),
            code,
            state: grantState,
            accountId,
          },
        })

        const { codeGrant } = data

        if (codeGrant.status === 'SUCCESS') {
          setState({ isLoading: false, error: '' })
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
        if (error instanceof Error) {
          setState({ isLoading: false, error: error.message })
          return { error: error.message }
        }
        return { error: 'There was a problem submitting code grant.' }
      }
    },
    [codeGrantMutation]
  )

  return (
    <OAuthContext.Provider
      value={{
        isLoading: state.isLoading,
        error: state.error,
        submitCodeGrant,
        // @NOTE: removed these since they are not used anywhere
        // getOAuthUrl,
        // openOAuthUrl,
        // revokeOAuth,
      }}
    >
      {children}
    </OAuthContext.Provider>
  )
}

const useOAuth = () => React.useContext(OAuthContext)

export { OAuthProvider, useOAuth }
