// we talked about getting rid of this at it just uses the Rewardable type,
// but we did not come to a comclution.
export const schema = gql`
  type BurdPuzzleResponse {
    rewardable: Rewardable
    success: Boolean!
    errorMessage: String
  }
  type Mutation {
    # I already have the types that exist for a step, so you don't need a
    # CreateBurdStepType...
    createBurdPuzzle(input: CreateRewardableInput!): BurdPuzzleResponse!
      @requireAuth(roles: ["ADMIN", "CREATOR_TOOLS_TESTER"])

    editBurdPuzzle(
      input: UpdateRewardableInput!
      rewardableId: String!
      puzzleId: String!
    ): BurdPuzzleResponse!
      @requireAuth(roles: ["ADMIN", "CREATOR_TOOLS_TESTER"])
  }
`
