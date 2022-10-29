export const schema = gql`
  type CheckWalletAgeResponse {
    success: Boolean!
    approved: Boolean!
    message: String
  }

  type Query {
    checkWalletAge(account: String!, chainId: String!): CheckWalletAgeResponse!
      @skipAuth
  }
`
