export const schema = gql`
  type StepSimpleText {
    step: Step!
    stepId: String!
    solution: String!
  }

  type Query {
    stepSimpleTexts: [StepSimpleText!]! @requireAuth
    stepSimpleText(id: String!): StepSimpleText @requireAuth
  }

  input CreateStepSimpleTextInput {
    stepId: String!
    solution: String!
  }

  input UpdateStepSimpleTextInput {
    stepId: String
    solution: String
  }

  type Mutation {
    createStepSimpleText(input: CreateStepSimpleTextInput!): StepSimpleText!
      @requireAuth
    updateStepSimpleText(
      id: String!
      input: UpdateStepSimpleTextInput!
    ): StepSimpleText! @requireAuth
    deleteStepSimpleText(id: String!): StepSimpleText! @requireAuth
  }
`
