export const schema = gql`
  input MakeAttemptInput {
    stepId: String!
    data: JSON!
  }

  type StepProgress {
    stepId: String!
    solved: Boolean!
    stepSortWeight: Int!
  }

  type StepsByPuzzleIdResponse {
    puzzle: Puzzle!
    stepProgress: [StepProgress!]!
  }

  type MakeAttemptResponse {
    success: Boolean!
    finalStep: Boolean
    message: String
  }

  type Query {
    getStepsByPuzzleId(id: String!): StepsByPuzzleIdResponse @skipAuth
    optionalStep(id: String, puzzleId: String, stepNum: Int): Step @requireAuth
  }

  type Mutation {
    makeAttempt(stepId: String!, data: JSON!): MakeAttemptResponse! @requireAuth
  }
`
