export const schema = gql`
  type DeleteAllUserInfoResponse {
    success: Boolean!
    message: String
  }

  type EmailSubmissionResponse {
    success: Boolean!
    message: String
  }

  type Mutation {
    # # adds submission to database, then calls sendEmail service if
    # # email address was provided
    # createSubmissionWithOptionalEmail(
    #   input: CreateSubmissionInput!
    # ): Submission! @requireAuth

    # deletes a user by user id and all connected submissions
    # deletes remaining submissions where email addresses match
    deleteAllUserInfo(jwt: String!): DeleteAllUserInfoResponse! @requireAuth

    # # sends congrats email to user's email address
    # sendEmail(
    #   email: String!
    #   puzzleId: String!
    #   userId: String!
    # ): EmailSubmissionResponse! @skipAuth
  }
`
