export const schema = gql`
  type StepOriumApi {
    id: String!
    step: Step!
    stepId: String!
    checkType: OriumCheckType!
  }

  enum OriumCheckType {
    HAS_CREATED_VAULT
    HAS_DEPOSITED_NFT
    HAS_CREATED_SCHOLARSHIP
  }

  type Query {
    stepOriumApis: [StepOriumApi!]! @requireAuth(roles: ["ADMIN"])
    stepOriumApi(id: String!): StepOriumApi @requireAuth(roles: ["ADMIN"])
  }

  input CreateStepOriumApiInput {
    stepId: String!
    checkType: OriumCheckType!
  }

  input UpdateStepOriumApiInput {
    stepId: String
    checkType: OriumCheckType
  }

  type Mutation {
    createStepOriumApi(input: CreateStepOriumApiInput!): StepOriumApi!
      @requireAuth(roles: ["ADMIN"])
    updateStepOriumApi(
      id: String!
      input: UpdateStepOriumApiInput!
    ): StepOriumApi! @requireAuth(roles: ["ADMIN"])
    deleteStepOriumApi(id: String!): StepOriumApi!
      @requireAuth(roles: ["ADMIN"])
  }
`
