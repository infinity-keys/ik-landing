export const schema = gql`
  type Step {
    id: String!
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
    step(id: String!): Step @requireAuth
  }

  input CreateStepInput {
    solution: String!
    failMessage: String
    successMessage: String
    instructions: String
    challenge: String
    listSortWeight: Int!
    puzzleId: String!
  }

  input UpdateStepInput {
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
    updateStep(id: String!, input: UpdateStepInput!): Step! @requireAuth
    deleteStep(id: String!): Step! @requireAuth
  }
`
