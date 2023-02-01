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
    userRewards: [UserReward!]! @requireAuth
    userReward(id: String!): UserReward @requireAuth
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
    createUserReward(input: CreateUserRewardInput!): UserReward! @requireAuth
    updateUserReward(id: String!, input: UpdateUserRewardInput!): UserReward!
      @requireAuth
    deleteUserReward(id: String!): UserReward! @requireAuth
  }
`
