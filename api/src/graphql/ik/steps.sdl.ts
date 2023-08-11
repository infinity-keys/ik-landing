export const schema = gql`
  type StepBySlugResponse {
    puzzleId: String!
    step: Step!
  }
  type Query {
    stepBySlug(slug: String!, stepNum: Int!): Step! @requireAuth
  }
`
