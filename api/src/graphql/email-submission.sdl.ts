export const schema = gql`
  type EmailSubmissionResponse {
    success: Boolean!
    message: String
  }

  type Mutation {
    sendEmail(
      email: String!
      puzzleId: String!
      userId: String!
    ): EmailSubmissionResponse! @skipAuth
  }
`
