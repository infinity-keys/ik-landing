export const schema = gql`
  type AddLensFormRoleResponse {
    success: Boolean
  }

  input AddLensFormInput {
    name: String!
    walletAddress: String!
    socialLinkOne: String!
    socialLinkTwo: String
  }

  type Mutation {
    addLensFormRole(externalAddress: String): AddLensFormRoleResponse!
      @requireAuth
    addLensForm(input: AddLensFormInput!): AddLensFormRoleResponse!
      @requireAuth(roles: ["ADMIN", "LENS_FORM"])
  }
`
