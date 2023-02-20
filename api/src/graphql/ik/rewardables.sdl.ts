export const schema = gql`
  type RewardablesCollection {
    rewardables: [Rewardable!]!
    totalCount: Int!
  }
  # Represents user completing a Step on a Puzzle
  type StepPuzzleProgress {
    id: String! #StepId here
    puzzleId: String!
    stepSortWeight: Int!
  }
  type Query {
    rewardableBySlug(slug: String!, type: RewardableType!): Rewardable @skipAuth
    rewardablesCollection(
      type: RewardableType
      page: Int
      count: Int
    ): RewardablesCollection @skipAuth
    rewardableClaim(id: String!): Rewardable @requireAuth
    # Steps per puzzle that user has completed
    userProgress: [StepPuzzleProgress!]! @requireAuth
  }

  type Mutation {
    addNftReward(id: String!): UserReward! @requireAuth
    # Synchronizes user's v1 and v2 cookie with actual progress in db
    reconcileProgress: Boolean @requireAuth
  }
`
