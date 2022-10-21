export const schema = gql`
  type StepsOnPuzzles {
    id: String!
    stepId: String!
    step: Step!
    puzzleId: String!
    puzzle: Puzzle!
    stepSortWeight: Int!
    assignedAt: DateTime!
  }

  type Query {
    stepsOnPuzzleses: [StepsOnPuzzles!]! @requireAuth
    stepsOnPuzzles(id: String!): StepsOnPuzzles @requireAuth
  }

  input CreateStepsOnPuzzlesInput {
    stepId: String!
    puzzleId: String!
    stepSortWeight: Int!
    assignedAt: DateTime!
  }

  input UpdateStepsOnPuzzlesInput {
    stepId: String
    puzzleId: String
    stepSortWeight: Int
    assignedAt: DateTime
  }

  type Mutation {
    createStepsOnPuzzles(input: CreateStepsOnPuzzlesInput!): StepsOnPuzzles!
      @requireAuth
    updateStepsOnPuzzles(
      id: String!
      input: UpdateStepsOnPuzzlesInput!
    ): StepsOnPuzzles! @requireAuth
    deleteStepsOnPuzzles(id: String!): StepsOnPuzzles! @requireAuth
  }
`
