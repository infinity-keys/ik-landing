// we talked about getting rid of this at it just uses the Rewardable type,
// but we did not come to a comclution.
export const schema = gql`
  type Mutation {
    # I already have the types that exist for a step, so you don't need a
    # CreateBurdStepType...
    createBurdPuzzle(input: CreateRewardableInput!): Rewardable!
      @requireAuth(roles: ["ADMIN"])
  }
`
