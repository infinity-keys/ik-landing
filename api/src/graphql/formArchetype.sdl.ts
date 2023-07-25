export const schema = gql`
  type CreateBurdPuzzleResponse {
    success: Boolean!
  }
  type Mutation {
    createBurdPuzzle(input: CreateBurdPuzzleInput!): CreateBurdPuzzleResponse!
      @requireAuth(roles: ["ADMIN"])
  }

  input CreateBurdPuzzleInput {
    name: String!
    slug: String!
    explanation: String!
    successMessage: String
    listPublicly: Boolean!
    stepsArray: [CreateBurdStepType!]!
  }

  input CreateBurdStepType {
    type: StepType!
    failMessage: String
    successMessage: String
    challenge: String
    resourceLinks: String
    stepSortWeight: Int
    # @TODO: this is temporary and should be replaced with actual step types
    solution: String
  }
`
