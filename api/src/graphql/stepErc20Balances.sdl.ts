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
    stepErc20Balances: [StepErc20Balance!]! @requireAuth(roles: ["ADMIN"])
    stepErc20Balance(id: String!): StepErc20Balance
      @requireAuth(roles: ["ADMIN"])
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
    ): StepErc20Balance! @requireAuth(roles: ["ADMIN"])
    updateStepErc20Balance(
      id: String!
      input: UpdateStepErc20BalanceInput!
    ): StepErc20Balance! @requireAuth(roles: ["ADMIN"])
    deleteStepErc20Balance(id: String!): StepErc20Balance!
      @requireAuth(roles: ["ADMIN"])
  }
`
