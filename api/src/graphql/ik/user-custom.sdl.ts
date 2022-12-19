export const schema = gql`
  type Mutation {
    upsertUser(authId: String!, email: String!, publicAddress: String): User!
      @requireAuth
  }
`
