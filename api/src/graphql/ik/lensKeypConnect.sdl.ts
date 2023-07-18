export const schema = gql`
  type UpsertLensKeypConnectResponse {
    success: Boolean
    errors: [String]
  }

  type Mutation {
    upsertLensKeypConnect(lensAddress: String): UpsertLensKeypConnectResponse
      @requireAuth
  }
`
