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
    attempts: [Attempt!]! @requireAuth
    attempt(id: String!): Attempt @requireAuth
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
    createAttempt(input: CreateAttemptInput!): Attempt! @requireAuth
    updateAttempt(id: String!, input: UpdateAttemptInput!): Attempt!
      @requireAuth
    deleteAttempt(id: String!): Attempt! @requireAuth
  }
`
