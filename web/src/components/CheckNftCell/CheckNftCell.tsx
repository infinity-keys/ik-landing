import type {
  FindCheckNftQuery,
  FindCheckNftQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindCheckNftQuery(
    $account: String!
    $poapEventId: String
    $tokenId: Int
    $chainId: Int
  ) {
    checkNft: checkNft(
      account: $account
      poapEventId: $poapEventId
      tokenId: $tokenId
      chainId: $chainId
    ) {
      success
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindCheckNftQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  checkNft,
}: CellSuccessProps<FindCheckNftQuery, FindCheckNftQueryVariables>) => {
  return <div>{JSON.stringify(checkNft)}</div>
}
