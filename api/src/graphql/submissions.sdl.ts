export const schema = gql`
  type Submission {
    id: String!
    createdAt: DateTime!
    puzzleId: String!
    puzzle: Puzzle!
    user: User!
    userId: String!
    data: JSON
  }

  type Query {
    submissions: [Submission!]! @requireAuth
    submission(id: String!): Submission @requireAuth
  }

  input CreateSubmissionInput {
    puzzleId: String!
    userId: String!
    data: JSON
  }

  input UpdateSubmissionInput {
    puzzleId: String
    userId: String
    data: JSON
  }

  type Mutation {
    createSubmission(input: CreateSubmissionInput!): Submission! @requireAuth
    updateSubmission(id: String!, input: UpdateSubmissionInput!): Submission!
      @requireAuth
    deleteSubmission(id: String!): Submission! @requireAuth
  }
`
