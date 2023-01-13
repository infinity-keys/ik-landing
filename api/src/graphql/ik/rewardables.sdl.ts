export const schema = gql`
  type RewardablesCollection {
    rewardables: [Rewardable!]!
    totalCount: Int!
  }
  type Query {
    rewardableBySlug(slug: String!, type: RewardableType!): Rewardable
      @requireAuth
    rewardablesCollection(
      type: RewardableType
      page: Int
      count: Int
    ): RewardablesCollection @requireAuth
  }
`
