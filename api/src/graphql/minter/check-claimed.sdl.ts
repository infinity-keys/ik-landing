export const schema = gql`
  type CheckClaimedResponse {
    success: Boolean!
    claimed: Boolean
    chainClaimed: Int
    message: String
  }

  type Query {
    checkClaimed(account: String!, tokenId: String!): CheckClaimedResponse!
      @skipAuth
  }
`
