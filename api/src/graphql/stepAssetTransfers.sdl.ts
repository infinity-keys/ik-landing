export const schema = gql`
  type StepAssetTransfer {
    id: String!
    step: Step!
    stepId: String!
    toAddress: String!
    excludeZeroValue: Boolean!
  }

  type Query {
    stepAssetTransfers: [StepAssetTransfer!]! @requireAuth(roles: ["ADMIN"])
    stepAssetTransfer(id: String!): StepAssetTransfer
      @requireAuth(roles: ["ADMIN"])
  }

  input CreateStepAssetTransferInput {
    stepId: String!
    toAddress: String!
    excludeZeroValue: Boolean!
  }

  input UpdateStepAssetTransferInput {
    stepId: String
    toAddress: String
    excludeZeroValue: Boolean
  }

  type Mutation {
    createStepAssetTransfer(
      input: CreateStepAssetTransferInput!
    ): StepAssetTransfer! @requireAuth(roles: ["ADMIN"])
    updateStepAssetTransfer(
      id: String!
      input: UpdateStepAssetTransferInput!
    ): StepAssetTransfer! @requireAuth(roles: ["ADMIN"])
    deleteStepAssetTransfer(id: String!): StepAssetTransfer!
      @requireAuth(roles: ["ADMIN"])
  }
`
