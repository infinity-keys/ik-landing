export const schema = gql`
  type Query {
    optionalStep(id: String, puzzleId: String, stepNum: Int): Step @requireAuth
    anonOptionalStep(id: String, puzzleId: String, stepNum: Int): Step @skipAuth
  }
`
