export const schema = gql`
  type AddCreatorToolsRoleResponse {
    success: Boolean!
  }

  type Mutation {
    addCreatorToolsRole: AddCreatorToolsRoleResponse! @requireAuth
  }
`
