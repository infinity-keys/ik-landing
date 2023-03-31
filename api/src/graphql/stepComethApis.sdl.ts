export const schema = gql`
  type StepComethApi {
    id: String!
    step: Step!
    stepId: String!
  }

  type Query {
    stepComethApis: [StepComethApi!]! @requireAuth(roles: ["ADMIN"])
    stepComethApi(id: String!): StepComethApi @requireAuth(roles: ["ADMIN"])
  }

  input CreateStepComethApiInput {
    stepId: String!
  }

  input UpdateStepComethApiInput {
    stepId: String
  }

  type Mutation {
    createStepComethApi(input: CreateStepComethApiInput!): StepComethApi!
      @requireAuth(roles: ["ADMIN"])
    updateStepComethApi(
      id: String!
      input: UpdateStepComethApiInput!
    ): StepComethApi! @requireAuth(roles: ["ADMIN"])
    deleteStepComethApi(id: String!): StepComethApi!
      @requireAuth(roles: ["ADMIN"])
  }
`
