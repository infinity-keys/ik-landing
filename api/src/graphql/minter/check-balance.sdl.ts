export const schema = gql`
  type CheckBalanceResponse {
    success: Boolean!
    claimed: Boolean
    claimedTokens: [Boolean!]
    message: String
  }

  type Query {
    checkBalance(
      account: String!
      tokenIds: [String!]!
      chainId: String!
    ): CheckBalanceResponse! @skipAuth
  }
`
