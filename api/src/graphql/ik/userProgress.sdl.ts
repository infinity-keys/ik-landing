export const schema = gql`
  type DeleteUserProgressResponse {
    success: Boolean!
  }
  type Mutation {
    deleteUserProgress: DeleteUserProgressResponse! @requireAuth
  }
`
