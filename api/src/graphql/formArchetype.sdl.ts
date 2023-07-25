export const schema = gql`
  type CreateBurdPuzzleResponse {
    success: Boolean!
  }
  type Mutation {
    createBurdPuzzle(input: CreatePuzzleInput!): CreateBurdPuzzleResponse!
      @requireAuth(roles: ["ADMIN"])
  }

  input CreatePuzzleInput {
    name: String!
    slug: String!
    explanation: String
    successMessage: String
    listPublicly: Boolean
    stepsArray: [CreateStepType!]!
  }

  input CreateStepType {
    type: StepType!
    failMessage: String
    successMessage: String
    challenge: String
    resourceLinks: String
    stepSortWeight: Int
  }
`
