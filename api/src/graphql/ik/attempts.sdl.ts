export const schema = gql`
  input MakeAttemptInput {
    stepId: String!
    data: JSON!
  }
  type MakeAttemptResponse {
    success: Boolean!
    finalStep: Boolean
    message: String
  }

  type Mutation {
    makeAttempt(stepId: String!, data: JSON!): MakeAttemptResponse! @requireAuth
  }
`
