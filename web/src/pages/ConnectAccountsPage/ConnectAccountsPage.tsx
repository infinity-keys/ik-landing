import { useEffect, useState } from 'react'

import { ConnectAccountMutation } from 'types/graphql'

import { useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { MetaTags } from '@redwoodjs/web'

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

      {data?.connectAccount?.errors?.map((err, i) => (
        <p key={i}>{err}</p>
      ))}

      {error && <p>{error}</p>}

      {data?.connectAccount.success && <h1>Success!</h1>}
    </>
  )
}

export default ConnectAccountsPage
