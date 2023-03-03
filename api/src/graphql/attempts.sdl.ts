export const schema = gql`
  type Attempt {
    id: String!
    attemptedAt: DateTime!
    user: User! @requireAuth(roles: ["ADMIN"])
    userId: String!
    step: Step!
    stepId: String!
    solve: Solve
  }

  type Query {
    attempts: [Attempt!]! @requireAuth(roles: ["ADMIN"])
    attempt(id: String!): Attempt @requireAuth(roles: ["ADMIN"])
  }

  input CreateAttemptInput {
    attemptedAt: DateTime!
    userId: String!
    stepId: String!
    data: JSON!
  }

  input UpdateAttemptInput {
    attemptedAt: DateTime
    userId: String
    stepId: String
    data: JSON
  }

  type Mutation {
    createAttempt(input: CreateAttemptInput!): Attempt!
      @requireAuth(roles: ["ADMIN"])
    updateAttempt(id: String!, input: UpdateAttemptInput!): Attempt!
      @requireAuth(roles: ["ADMIN"])
    deleteAttempt(id: String!): Attempt! @requireAuth(roles: ["ADMIN"])
  }
`
