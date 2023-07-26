export const schema = gql`
  type CreateBurdPuzzleResponse {
    success: Boolean!
  }
  type Mutation {
    # I already have the types that exist for a step, so you don't need a
    # CreateBurdStepType...
    createBurdPuzzle(input: CreateBurdPuzzleInput!): CreateBurdPuzzleResponse!
      @requireAuth(roles: ["ADMIN"])
  }

  input CreateBurdPuzzleInput {
    rewardable: CreateRewardableInput!
    # steps: [CreateStepInput!]!
  }
`
