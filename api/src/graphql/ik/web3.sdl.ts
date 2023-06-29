export const schema = gql`
  type ClaimResponse {
    errors: [String!]
    claimed: Boolean
    success: Boolean
    tokenId: Int
    explorerUrl: String
    unauthorized: Boolean
  }

  type Mutation {
    # runs through entire nft claim flow
    claim(rewardableId: String!, externalAddress: String): ClaimResponse!
      @requireAuth
  }
`
