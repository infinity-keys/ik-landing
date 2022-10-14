export const schema = gql`
  type Submission {
    submissionId: String!
    puzzleId: String!
    userId: String!
    email: String
    address: String
  }

  type DeleteSubmissionsByEmailResponse {
    success: Boolean!
    message: String
  }

  type Query {
    submissions: [Submission!]! @requireAuth
    submission(submissionId: String!): Submission @requireAuth
  }

  input CreateSubmissionInput {
    puzzleId: String!
    userId: String!
    email: String
    address: String
  }

  input UpdateSubmissionInput {
    puzzleId: String
    userId: String
    email: String
    address: String
  }

  type Mutation {
    createSubmission(input: CreateSubmissionInput!): Submission! @requireAuth
    updateSubmission(
      submissionId: String!
      input: UpdateSubmissionInput!
    ): Submission! @requireAuth
    deleteSubmission(submissionId: String!): Submission! @requireAuth
    deleteSubmissionsByEmail(jwt: String!): DeleteSubmissionsByEmailResponse!
      @skipAuth
  }
`
