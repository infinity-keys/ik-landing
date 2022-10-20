export const schema = gql`
  type Step {
    stepId: String!
    solution: String!
    failMessage: String
    successMessage: String
    instructions: String
    challenge: String
    listSortWeight: Int!
    puzzleId: String!
    puzzle: Puzzle!
  }

  type Query {
    steps: [Step!]! @requireAuth
    step(stepId: String!): Step @requireAuth
  }

  input CreateStepInput {
    stepId: String!
    solution: String!
    failMessage: String
    successMessage: String
    instructions: String
    challenge: String
    listSortWeight: Int!
    puzzleId: String!
  }

  input UpdateStepInput {
    stepId: String
    solution: String
    failMessage: String
    successMessage: String
    instructions: String
    challenge: String
    listSortWeight: Int
    puzzleId: String
  }

  type Mutation {
    createStep(input: CreateStepInput!): Step! @requireAuth
    updateStep(stepId: String!, input: UpdateStepInput!): Step! @requireAuth
    deleteStep(stepId: String!): Step! @requireAuth
  }
`
