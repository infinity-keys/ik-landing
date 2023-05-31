export const schema = gql`
  type StepAssetTransfer {
    id: String!
    step: Step!
    stepId: String!
    toAddress: String!
    excludeZeroValue: Boolean!
  }

  type Query {
    stepAssetTransfers: [StepAssetTransfer!]! @requireAuth
    stepAssetTransfer(id: String!): StepAssetTransfer @requireAuth
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
    ): StepAssetTransfer! @requireAuth
    updateStepAssetTransfer(
      id: String!
      input: UpdateStepAssetTransferInput!
    ): StepAssetTransfer! @requireAuth
    deleteStepAssetTransfer(id: String!): StepAssetTransfer! @requireAuth
  }
`
