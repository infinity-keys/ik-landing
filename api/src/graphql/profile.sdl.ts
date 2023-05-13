export const schema = gql`
  type Mutation {
    deleteUserProgress: String @requireAuth
  }
`
