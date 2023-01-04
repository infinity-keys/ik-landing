export const schema = gql`
  type Solve {
    id: String!
    solvedAt: DateTime!
    user: User!
    userId: String!
    attempt: Attempt!
    attemptId: String!
    data: JSON
  }

  type Query {
    solves: [Solve!]! @requireAuth
    solve(id: String!): Solve @requireAuth
  }

  input CreateSolveInput {
    solvedAt: DateTime!
    userId: String!
    attemptId: String!
    data: JSON
  }

  input UpdateSolveInput {
    solvedAt: DateTime
    userId: String
    attemptId: String
    data: JSON
  }

  type Mutation {
    createSolve(input: CreateSolveInput!): Solve! @requireAuth
    updateSolve(id: String!, input: UpdateSolveInput!): Solve! @requireAuth
    deleteSolve(id: String!): Solve! @requireAuth
  }
`
