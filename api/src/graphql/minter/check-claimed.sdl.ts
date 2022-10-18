export const schema = gql`
  type CheckClaimedResponse {
    success: Boolean!
    claimed: Boolean
    chainClaimed: Int
    message: String
  }

  type CheckClaimedInput {
    account: String!
    tokenId: String!
  }

  type Mutation {
    checkClaimed(account: String!, tokenId: String!): CheckClaimedResponse!
      @skipAuth
  }
`
