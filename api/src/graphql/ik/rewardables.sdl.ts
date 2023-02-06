export const schema = gql`
  type RewardablesCollection {
    rewardables: [Rewardable!]!
    totalCount: Int!
  }
  type Query {
    rewardableBySlug(slug: String!, type: RewardableType!): Rewardable @skipAuth
    rewardablesCollection(
      type: RewardableType
      page: Int
      count: Int
    ): RewardablesCollection @skipAuth
    rewardableClaim(id: String!): Rewardable @requireAuth
  }

  type Mutation {
    addNftReward(id: String!): UserReward! @requireAuth
  }
`
