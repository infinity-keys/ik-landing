export const schema = gql`
  type ConnectAccountResponse {
    success: Boolean!
    message: String
    errors: [String]
  }

  type DeleteAccountConnectionResponse {
    success: Boolean!
    errors: [String]
  }

  type Mutation {
    connectAccount(
      code: String!
      state: String!
      provider: String
    ): ConnectAccountResponse! @requireAuth

    deleteAccountConnection(provider: String!): DeleteAccountConnectionResponse
      @requireAuth
  }
`
