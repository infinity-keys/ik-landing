export const schema = gql`
  type StepBySlugResponse {
    puzzleId: String!
    step: Step!
  }
  type Query {
    optionalStep(id: String, puzzleId: String, stepNum: Int): Step @requireAuth
  }
`
