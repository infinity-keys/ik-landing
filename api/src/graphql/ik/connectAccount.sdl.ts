export const schema = gql`
  type ConnectAccountResponse {
    success: Boolean!
    message: String
    errors: [String]
  }

  type Mutation {
    connectAccount(
      code: String!
      state: String!
      provider: String
    ): ConnectAccountResponse! @requireAuth
  }
`
