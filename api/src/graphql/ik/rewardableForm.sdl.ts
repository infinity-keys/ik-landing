// we talked about getting rid of this at it just uses the Rewardable type,
// but we did not come to a comclution.
export const schema = gql`
  type RewardableResponse {
    rewardable: Rewardable
    success: Boolean!
    errorMessage: String
  }
  type Mutation {
    # I already have the types that exist for a step, so you don't need a
    # CreateBurdStepType...
    createRewardablePuzzle(input: CreateRewardableInput!): RewardableResponse!
      @requireAuth

    editRewardablePuzzle(
      input: UpdateRewardableInput!
      rewardableId: String!
      puzzleId: String!
    ): RewardableResponse! @requireAuth

    trashRewardablePuzzle(rewardableId: String!): RewardableResponse!
      @requireAuth
    restoreRewardablePuzzle(rewardableId: String!): RewardableResponse!
      @requireAuth
  }
`
