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
  }

  type Query {
    getStepsByPuzzleId(id: String!): StepsByPuzzleIdResponse @requireAuth
  }

  type Mutation {
    makeAttempt(stepId: String!, data: JSON!): MakeAttemptResponse! @requireAuth
  }
`
