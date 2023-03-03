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
    rewardableConnections: [RewardableConnection!]!
      @requireAuth(roles: ["ADMIN"])
    rewardableConnection(id: String!): RewardableConnection
      @requireAuth(roles: ["ADMIN"])
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
    ): RewardableConnection! @requireAuth(roles: ["ADMIN"])
    updateRewardableConnection(
      id: String!
      input: UpdateRewardableConnectionInput!
    ): RewardableConnection! @requireAuth(roles: ["ADMIN"])
    deleteRewardableConnection(id: String!): RewardableConnection!
      @requireAuth(roles: ["ADMIN"])
  }
`
