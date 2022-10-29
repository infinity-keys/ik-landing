export const schema = gql`
  type VerifyResponse {
    success: Boolean!
    message: String
    signature: String
    claimedTokens: [Boolean!]
  }

  type Query {
    verify(
      account: String!
      tokenId: String!
      chainId: String!
      gatedIds: [String!]
    ): VerifyResponse! @skipAuth
  }
`
