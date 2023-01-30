export const schema = gql`
  type StepNftCheck {
    id: String!
    step: Step!
    stepId: String!
    contractAddress: String
    tokenId: Int
    chainId: Int
  }

  type Query {
    stepNftChecks: [StepNftCheck!]! @requireAuth
    stepNftCheck(id: String!): StepNftCheck @requireAuth
  }

  input CreateStepNftCheckInput {
    stepId: String!
    contractAddress: String
    tokenId: Int
    chainId: Int
  }

  input UpdateStepNftCheckInput {
    stepId: String
    contractAddress: String
    tokenId: Int
    chainId: Int
  }

  type Mutation {
    createStepNftCheck(input: CreateStepNftCheckInput!): StepNftCheck!
      @requireAuth
    updateStepNftCheck(
      id: String!
      input: UpdateStepNftCheckInput!
    ): StepNftCheck! @requireAuth
    deleteStepNftCheck(id: String!): StepNftCheck! @requireAuth
  }
`
