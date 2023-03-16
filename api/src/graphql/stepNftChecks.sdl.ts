export const schema = gql`
  type StepNftCheck {
    id: String!
    step: Step!
    stepId: String!
    nftCheckData: [NftCheckDatum]!
    requireAllNfts: Boolean!
  }

  type Query {
    stepNftChecks: [StepNftCheck!]! @requireAuth(roles: ["ADMIN"])
    stepNftCheck(id: String!): StepNftCheck @requireAuth(roles: ["ADMIN"])
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
      @requireAuth(roles: ["ADMIN"])
    updateStepNftCheck(
      id: String!
      input: UpdateStepNftCheckInput!
    ): StepNftCheck! @requireAuth(roles: ["ADMIN"])
    deleteStepNftCheck(id: String!): StepNftCheck!
      @requireAuth(roles: ["ADMIN"])
  }
`
