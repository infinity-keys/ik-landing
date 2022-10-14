export const schema = gql`
  type DeleteSubmissionsByEmailResponse {
    success: Boolean!
    message: String
  }

  type Mutation {
    deleteSubmissionsByEmail(jwt: String!): DeleteSubmissionsByEmailResponse!
      @skipAuth
  }
`
