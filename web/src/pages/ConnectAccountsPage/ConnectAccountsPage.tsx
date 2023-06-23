import { useEffect } from 'react'

import { ConnectAccountMutation } from 'types/graphql'

import { Link, routes, useParams } from '@redwoodjs/router'
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
    }
  }
`

const ConnectAccountsPage = () => {
  const { code, state, provider } = useParams()
  console.log({ code, state, provider })

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
  console.log(data)
  useEffect(() => {
    if (code && state && provider) {
      connect()
    }
  }, [code, state, provider, connect])

  return (
    <>
      <MetaTags title="ConnectAccounts" description="ConnectAccounts page" />

      <h1>ConnectAccountsPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/ConnectAccountsPage/ConnectAccountsPage.tsx</code>
      </p>
      <p>
        My default route is named <code>connectAccounts</code>, link to me with
        `<Link to={routes.connectAccounts()}>ConnectAccounts</Link>`
      </p>
    </>
  )
}

export default ConnectAccountsPage
