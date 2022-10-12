export const schema = gql`
  type Submission {
    id: String!
    puzzleId: String!
    userId: String!
    email: String
    address: String
  }

  type Query {
    submissions: [Submission!]! @requireAuth
    submission(id: String!): Submission @requireAuth
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
    updateSubmission(id: String!, input: UpdateSubmissionInput!): Submission!
      @requireAuth
    deleteSubmission(id: String!): Submission! @requireAuth
  }
`
