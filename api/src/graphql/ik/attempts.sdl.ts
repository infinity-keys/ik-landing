export const schema = gql`
  input MakeAttemptInput {
    stepId: String!
    data: JSON!
  }

  type Mutation {
    makeAttempt(stepId: String!, data: JSON!): Attempt! @requireAuth
  }
`
