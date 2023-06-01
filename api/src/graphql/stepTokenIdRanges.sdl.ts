export const schema = gql`
  type StepTokenIdRange {
    id: String!
    step: Step!
    stepId: String!
    contractAddress: String!
    chainId: String!
    startId: Int!
    endId: Int!
    startIds: [Int]!
    endIds: [Int]!
  }

  type Query {
    stepTokenIdRanges: [StepTokenIdRange!]! @requireAuth
    stepTokenIdRange(id: String!): StepTokenIdRange @requireAuth
  }

  input CreateStepTokenIdRangeInput {
    stepId: String!
    contractAddress: String!
    chainId: String!
    startId: Int!
    endId: Int!
    startIds: [Int]!
    endIds: [Int]!
  }

  input UpdateStepTokenIdRangeInput {
    stepId: String
    contractAddress: String
    chainId: String
    startId: Int
    endId: Int
    startIds: [Int]!
    endIds: [Int]!
  }

  type Mutation {
    createStepTokenIdRange(
      input: CreateStepTokenIdRangeInput!
    ): StepTokenIdRange! @requireAuth
    updateStepTokenIdRange(
      id: String!
      input: UpdateStepTokenIdRangeInput!
    ): StepTokenIdRange! @requireAuth
    deleteStepTokenIdRange(id: String!): StepTokenIdRange! @requireAuth
  }
`
