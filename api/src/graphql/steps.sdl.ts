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
    stepNftCheck: StepNftCheck
    attempts: [Attempt]!
    hasUserCompletedStep: Boolean
    hasAnonUserCompletedStep: Boolean
  }

  enum StepType {
    SIMPLE_TEXT
    NFT_CHECK
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
    createStep(input: CreateStepInput!): Step! @requireAuth(roles: ["ADMIN"])
    updateStep(id: String!, input: UpdateStepInput!): Step!
      @requireAuth(roles: ["ADMIN"])
    deleteStep(id: String!): Step! @requireAuth(roles: ["ADMIN"])
  }
`
