export const schema = gql`
  type ClaimResponse {
    claimed: Boolean
    signature: String
    tokenId: Int
    errors: [String!]
  }

  type Query {
    claim(rewardableId: String!, account: String!): ClaimResponse! @requireAuth
  }
`
