export const schema = gql`
  type StepPage {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    step: Step!
    stepId: String!
    body: String!
    image: String
    showStepGuideHint: Boolean!
    sortWeight: Int!
  }

  type Query {
    stepPages: [StepPage!]! @requireAuth
    stepPage(id: String!): StepPage @requireAuth
  }

  input CreateStepPageInput {
    stepId: String!
    body: String!
    image: String
    showStepGuideHint: Boolean!
    sortWeight: Int!
  }

  input UpdateStepPageInput {
    stepId: String
    body: String
    image: String
    showStepGuideHint: Boolean
    sortWeight: Int
  }

  type Mutation {
    createStepPage(input: CreateStepPageInput!): StepPage!
      @requireAuth(roles: ["ADMIN"])
    updateStepPage(id: String!, input: UpdateStepPageInput!): StepPage!
      @requireAuth(roles: ["ADMIN"])
    deleteStepPage(id: String!): StepPage! @requireAuth(roles: ["ADMIN"])
  }
`
