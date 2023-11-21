export const schema = gql`
  type Rewardable {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    slug: String!
    explanation: String!
    successMessage: String
    listPublicly: Boolean!
    type: RewardableType!
    sortType: RewardableSortType
    sortWeight: Int
    organization: Organization! @requireAuth(roles: ["ADMIN"])
    orgId: String!
    nfts: [Nft]!
    puzzle: Puzzle
    pack: Pack
    bundle: Bundle
    userRewards: [UserReward]!
    asParent: [RewardableConnection]!
    asChild: [RewardableConnection]!
    asChildPublicParentRewardables: [RewardableConnection]!
    migrateId: String
  }

  enum RewardableType {
    PUZZLE
    PACK
    BUNDLE
  }

  enum RewardableSortType {
    FEATURED
  }

  type Query {
    rewardables: [Rewardable!]! @requireAuth
    rewardable(id: String!): Rewardable @requireAuth
  }

  input CreateRewardableInput {
    name: String!
    slug: String!
    explanation: String!
    successMessage: String
    listPublicly: Boolean!
    type: RewardableType!
    sortWeight: Int
    orgId: String!
    migrateId: String
  }

  input UpdateRewardableInput {
    name: String
    slug: String
    explanation: String
    successMessage: String
    listPublicly: Boolean
    type: RewardableType
    sortWeight: Int
    orgId: String
    migrateId: String
  }

  type Mutation {
    addNftReward(id: String!): UserReward! @requireAuth
    createRewardable(input: CreateRewardableInput!): Rewardable!
      @requireAuth(roles: ["ADMIN"])
    updateRewardable(id: String!, input: UpdateRewardableInput!): Rewardable!
      @requireAuth(roles: ["ADMIN"])
    deleteRewardable(id: String!): Rewardable! @requireAuth(roles: ["ADMIN"])
  }
`
