export const schema = gql`
  type Submission {
    id: String!
    puzzleId: String!
    puzzle: Puzzle!
    userId: String!
    user: User!
    createdAt: DateTime!
    data: JSON!
  }

  type Query {
    submissions: [Submission!]! @requireAuth(roles: ["ADMIN"])
    submission(id: String!): Submission @requireAuth(roles: ["ADMIN"])
  }

  input CreateSubmissionInput {
    puzzleId: String!
    userId: String!
    data: JSON!
  }

  input UpdateSubmissionInput {
    puzzleId: String
    userId: String
    data: JSON
  }

  type Mutation {
    createSubmission(input: CreateSubmissionInput!): Submission!
      @requireAuth(roles: ["ADMIN"])
    updateSubmission(id: String!, input: UpdateSubmissionInput!): Submission!
      @requireAuth(roles: ["ADMIN"])
    deleteSubmission(id: String!): Submission! @requireAuth(roles: ["ADMIN"])
  }
`
