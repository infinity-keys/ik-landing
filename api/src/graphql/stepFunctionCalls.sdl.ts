export const schema = gql`
  type StepFunctionCall {
    id: String!
    step: Step!
    stepId: String!
    methodIds: [String]!
    contractAddress: String
    requireAllNfts: Boolean!
  }

  type Query {
    stepFunctionCalls: [StepFunctionCall!]! @requireAuth(roles: ["ADMIN"])
    stepFunctionCall(id: String!): StepFunctionCall
      @requireAuth(roles: ["ADMIN"])
  }

  input CreateStepFunctionCallInput {
    stepId: String!
    methodIds: [String]!
    contractAddress: String
    requireAllNfts: Boolean!
  }

  input UpdateStepFunctionCallInput {
    stepId: String
    methodIds: [String]!
    contractAddress: String
    requireAllNfts: Boolean
  }

  type Mutation {
    createStepFunctionCall(
      input: CreateStepFunctionCallInput!
    ): StepFunctionCall! @requireAuth(roles: ["ADMIN"])
    updateStepFunctionCall(
      id: String!
      input: UpdateStepFunctionCallInput!
    ): StepFunctionCall! @requireAuth(roles: ["ADMIN"])
    deleteStepFunctionCall(id: String!): StepFunctionCall!
      @requireAuth(roles: ["ADMIN"])
  }
`
