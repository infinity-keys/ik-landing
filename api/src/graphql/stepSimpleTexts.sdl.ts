export const schema = gql`
  type StepSimpleText {
    id: String!
    step: Step!
    stepId: String!
    # removing so users can't access it in query
    # solution: String! @requireAuth
    solutionCharCount: Int!
  }

  type Query {
    stepSimpleTexts: [StepSimpleText!]! @requireAuth
    stepSimpleText(id: String!): StepSimpleText @requireAuth
  }

  input CreateStepSimpleTextInput {
    stepId: String!
    solution: String!
    solutionCharCount: Int!
  }

  input UpdateStepSimpleTextInput {
    stepId: String
    solution: String
    solutionCharCount: Int
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
