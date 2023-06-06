export const schema = gql`
  type StepErc20Balance {
    id: String!
    step: Step!
    stepId: String!
    contractAddress: String!
    chainId: String!
    minBalance: String!
  }

  type Query {
    stepErc20Balances: [StepErc20Balance!]! @requireAuth
    stepErc20Balance(id: String!): StepErc20Balance @requireAuth
  }

  input CreateStepErc20BalanceInput {
    stepId: String!
    contractAddress: String!
    chainId: String!
    minBalance: String!
  }

  input UpdateStepErc20BalanceInput {
    stepId: String
    contractAddress: String
    chainId: String
    minBalance: String
  }

  type Mutation {
    createStepErc20Balance(
      input: CreateStepErc20BalanceInput!
    ): StepErc20Balance! @requireAuth
    updateStepErc20Balance(
      id: String!
      input: UpdateStepErc20BalanceInput!
    ): StepErc20Balance! @requireAuth
    deleteStepErc20Balance(id: String!): StepErc20Balance! @requireAuth
  }
`
