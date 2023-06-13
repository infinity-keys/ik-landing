export const schema = gql`
  type StepTokenIdRange {
    id: String!
    step: Step!
    stepId: String!
    contractAddress: String!
    chainId: String!
    startIds: [Int]!
    endIds: [Int]!
  }

  type Query {
    stepTokenIdRanges: [StepTokenIdRange!]! @requireAuth(roles: ["ADMIN"])
    stepTokenIdRange(id: String!): StepTokenIdRange
      @requireAuth(roles: ["ADMIN"])
  }

  input CreateStepTokenIdRangeInput {
    stepId: String!
    contractAddress: String!
    chainId: String!
    startIds: [Int]!
    endIds: [Int]!
  }

  input UpdateStepTokenIdRangeInput {
    stepId: String
    contractAddress: String
    chainId: String
    startIds: [Int]!
    endIds: [Int]!
  }

  type Mutation {
    createStepTokenIdRange(
      input: CreateStepTokenIdRangeInput!
    ): StepTokenIdRange! @requireAuth(roles: ["ADMIN"])
    updateStepTokenIdRange(
      id: String!
      input: UpdateStepTokenIdRangeInput!
    ): StepTokenIdRange! @requireAuth(roles: ["ADMIN"])
    deleteStepTokenIdRange(id: String!): StepTokenIdRange!
      @requireAuth(roles: ["ADMIN"])
  }
`
