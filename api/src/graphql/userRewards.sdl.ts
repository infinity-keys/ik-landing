export const schema = gql`
  type UserReward {
    id: String!
    createdAt: DateTime!
    user: User!
    userId: String!
    rewardable: Rewardable!
    rewardableId: String!
    nfts: [Nft]!
  }

  type Query {
    userRewards: [UserReward!]! @requireAuth(roles: ["ADMIN"])
    userReward(id: String!): UserReward @requireAuth(roles: ["ADMIN"])
  }

  input CreateUserRewardInput {
    userId: String!
    rewardableId: String!
  }

  input UpdateUserRewardInput {
    userId: String
    rewardableId: String
  }

  type Mutation {
    createUserReward(input: CreateUserRewardInput!): UserReward!
      @requireAuth(roles: ["ADMIN"])
    updateUserReward(id: String!, input: UpdateUserRewardInput!): UserReward!
      @requireAuth(roles: ["ADMIN"])
    deleteUserReward(id: String!): UserReward! @requireAuth(roles: ["ADMIN"])
  }
`
