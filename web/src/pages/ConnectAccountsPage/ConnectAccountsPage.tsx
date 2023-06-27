import { useEffect, useState } from 'react'

import capitalize from 'lodash/capitalize'
import { ConnectAccountMutation } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import Button from 'src/components/Button'

const CONNECT_ACCOUNT_MUTATION = gql`
  mutation ConnectAccountMutation(
    $code: String!
    $state: String!
    $provider: String!
  ) {
    connectAccount(code: $code, state: $state, provider: $provider) {
      success
      errors
    }
  }
`

const ConnectAccountsPage = () => {
  const [error, setError] = useState('')
  const { code, state, provider } = useParams()

  const [connect, { data }] = useMutation<ConnectAccountMutation>(
    CONNECT_ACCOUNT_MUTATION,
    {
      variables: {
        code,
        state,
        provider,
      },
      onCompleted({ connectAccount }) {
        if (connectAccount.success) {
          toast(`Successfully connected your ${capitalize(provider)} account`)
          navigate(routes.profile(), { replace: true })
        }
      },
    }
  )

  useEffect(() => {
    if (code && state && provider) {
      connect()
    } else {
      setError('Missing parameters')
    }
  }, [code, state, provider, connect])

  return (
    <>
      <MetaTags title="ConnectAccounts" description="ConnectAccounts page" />
      {(error || data?.connectAccount?.errors?.length) && (
        <div className="text-center">
          <h1 className="mb-2 text-4xl font-bold">Oops!</h1>
          {data?.connectAccount?.errors?.map((err, i) => (
            <p key={i} className="mb-2">
              {err}
            </p>
          ))}

          {error && <p>{error}</p>}

          <div className="mt-8">
            <Button text="Return to Profile Page" to={routes.profile()} />
          </div>
        </div>
      )}
    </>
  )
}

export default ConnectAccountsPage
