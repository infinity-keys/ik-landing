export const schema = gql`
  type ClaimResponse {
    errors: [String!]
    claimed: Boolean
    success: Boolean
    tokenId: Int
    explorerUrl: String
  }

  type Query {
    # runs through entire nft claim flow
    claim(rewardableId: String!): ClaimResponse! @requireAuth
  }
`
