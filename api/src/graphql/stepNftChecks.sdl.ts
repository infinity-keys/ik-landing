export const schema = gql`
  type StepNftCheck {
    id: String!
    step: Step!
    stepId: String!
    nftCheckData: [NftCheckDatum]!
    requireAllNfts: Boolean!
  }

  type Query {
    stepNftChecks: [StepNftCheck!]! @requireAuth
    stepNftCheck(id: String!): StepNftCheck @requireAuth
  }

  input CreateStepNftCheckInput {
    stepId: String!
    requireAllNfts: Boolean!
  }

  input UpdateStepNftCheckInput {
    stepId: String
    requireAllNfts: Boolean
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
