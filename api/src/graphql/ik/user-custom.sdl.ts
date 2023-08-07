export const schema = gql`
  type AddLensFormRoleResponse {
    success: Boolean
  }
  type Mutation {
    upsertUser(authId: String!, email: String!): User! @requireAuth
    addLensFormRole(externalAddress: String): AddLensFormRoleResponse!
      @requireAuth
  }
`
