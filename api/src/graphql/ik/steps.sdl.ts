export const schema = gql`
  type StepProgress {
    stepId: String!
    solved: Boolean!
    stepSortWeight: Int!
  }

  type StepsByPuzzleIdResponse {
    puzzle: Puzzle!
    stepProgress: [StepProgress!]!
  }

  type Query {
    getStepsByPuzzleId(id: String!): StepsByPuzzleIdResponse @skipAuth
    optionalStep(id: String, puzzleId: String, stepNum: Int): Step @requireAuth
    anonOptionalStep(id: String, puzzleId: String, stepNum: Int): Step @skipAuth
  }
`
