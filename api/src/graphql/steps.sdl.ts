export const schema = gql`
  type Step {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    failMessage: String
    successMessage: String
    challenge: String
    stepSortWeight: Int!
    puzzle: Puzzle!
    puzzleId: String!
    type: StepType!
    stepSimpleText: StepSimpleText
    migrateLandingRoute: String
    attempts: [Attempt]!
    hasUserCompletedStep: Boolean
  }

  enum StepType {
    SIMPLE_TEXT
  }

  type Query {
    steps: [Step!]! @skipAuth
    step(id: String!): Step @requireAuth
  }

  input CreateStepInput {
    failMessage: String
    successMessage: String
    challenge: String
    stepSortWeight: Int!
    puzzleId: String!
    type: StepType!
  }

  input UpdateStepInput {
    failMessage: String
    successMessage: String
    challenge: String
    stepSortWeight: Int
    puzzleId: String
    type: StepType
  }

  type Mutation {
    createStep(input: CreateStepInput!): Step! @requireAuth
    updateStep(id: String!, input: UpdateStepInput!): Step! @requireAuth
    deleteStep(id: String!): Step! @requireAuth
  }
`
