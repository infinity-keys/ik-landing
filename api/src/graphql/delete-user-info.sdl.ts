export const schema = gql`
  type DeleteAllUserInfoResponse {
    success: Boolean!
    message: String
  }

  type Mutation {
    deleteAllUserInfo(jwt: String!): DeleteAllUserInfoResponse! @skipAuth
  }
`
