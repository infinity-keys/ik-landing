export const schema = gql`
  type StepNftCheck {
    id: String!
    step: Step!
    stepId: String!
    nftCheckData: [NftCheckDatum]!
  }

  type Query {
    stepNftChecks: [StepNftCheck!]! @requireAuth
    stepNftCheck(id: String!): StepNftCheck @requireAuth
  }

  input CreateStepNftCheckInput {
    stepId: String!
  }

  input UpdateStepNftCheckInput {
    stepId: String
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
