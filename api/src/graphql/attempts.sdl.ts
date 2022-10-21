export const schema = gql`
  type Attempt {
    id: String!
    stepId: String!
    step: Step!
    userId: String!
    user: User!
    attemptedAt: DateTime!
    guess: String!
  }

  type Query {
    attempts: [Attempt!]! @requireAuth
    attempt(id: String!): Attempt @requireAuth
  }

  input CreateAttemptInput {
    stepId: String!
    userId: String!
    attemptedAt: DateTime!
    guess: String!
  }

  input UpdateAttemptInput {
    stepId: String
    userId: String
    attemptedAt: DateTime
    guess: String
  }

  type Mutation {
    createAttempt(input: CreateAttemptInput!): Attempt! @requireAuth
    updateAttempt(id: String!, input: UpdateAttemptInput!): Attempt!
      @requireAuth
    deleteAttempt(id: String!): Attempt! @requireAuth
  }
`
