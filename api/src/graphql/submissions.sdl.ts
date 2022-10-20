export const schema = gql`
  type Submission {
    submissionId: String!
    puzzleId: String!
    userId: String!
    data: JSONObject
  }

  type Query {
    submissions: [Submission!]! @requireAuth
    submission(submissionId: String!): Submission @requireAuth
  }

  input CreateSubmissionInput {
    puzzleId: String!
    userId: String!
    data: JSONObject
  }

  input UpdateSubmissionInput {
    puzzleId: String
    userId: String
    data: JSONObject
  }

  type Mutation {
    createSubmission(input: CreateSubmissionInput!): Submission! @requireAuth
    updateSubmission(
      submissionId: String!
      input: UpdateSubmissionInput!
    ): Submission! @requireAuth
    deleteSubmission(submissionId: String!): Submission! @requireAuth
  }
`
