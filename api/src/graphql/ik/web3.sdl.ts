export const schema = gql`
  type ClaimResponse {
    errors: [String!]
    claimed: Boolean
    chainClaimed: Int
    signature: String
    tokenId: Int
  }

  type Query {
    # runs through entire nft claim flow
    claim(account: String!, rewardableId: String!): ClaimResponse! @requireAuth
  }
`
