export const schema = gql`
  type RewardableConnection {
    id: String!
    parentRewardable: Rewardable!
    parentId: String!
    childRewardable: Rewardable!
    childId: String!
    childSortWeight: Int
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    rewardableConnections: [RewardableConnection!]! @requireAuth
    rewardableConnection(id: String!): RewardableConnection @requireAuth
  }

  input CreateRewardableConnectionInput {
    parentId: String!
    childId: String!
    childSortWeight: Int
  }

  input UpdateRewardableConnectionInput {
    parentId: String
    childId: String
    childSortWeight: Int
  }

  type Mutation {
    createRewardableConnection(
      input: CreateRewardableConnectionInput!
    ): RewardableConnection! @requireAuth
    updateRewardableConnection(
      id: String!
      input: UpdateRewardableConnectionInput!
    ): RewardableConnection! @requireAuth
    deleteRewardableConnection(id: String!): RewardableConnection! @requireAuth
  }
`
