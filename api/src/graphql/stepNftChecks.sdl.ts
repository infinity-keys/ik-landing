export const schema = gql`
  type StepNftCheck {
    id: String!
    step: Step!
    stepId: String!
    nftCheckData: [NftCheckDatum]!
    nftCheckLogic: NftCheckLogic!
  }

  enum NftCheckLogic {
    AND
    OR
  }

  type Query {
    stepNftChecks: [StepNftCheck!]! @requireAuth
    stepNftCheck(id: String!): StepNftCheck @requireAuth
  }

  input CreateStepNftCheckInput {
    stepId: String!
    nftCheckLogic: NftCheckLogic!
  }

  input UpdateStepNftCheckInput {
    stepId: String
    nftCheckLogic: NftCheckLogic
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
