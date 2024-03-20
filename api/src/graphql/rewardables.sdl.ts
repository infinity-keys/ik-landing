export const schema = gql`
  type Rewardable {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    slug: String!
    explanation: String
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

  input FormNftCreateInput {
    name: String!
    image: String!
  }

  input FormNftEditInput {
    name: String!
    image: String
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
    userRewardables(userId: String!): [Rewardable!]! @requireAuth
  }

  input CreateRewardableInput {
    name: String!
    explanation: String
    successMessage: String
    listPublicly: Boolean!
    type: RewardableType!
    sortWeight: Int
    orgId: String
    # Manually added
    puzzle: CreatePuzzleInput!
    nft: FormNftCreateInput!
  }

  input UpdateRewardableInput {
    name: String!
    explanation: String
    successMessage: String
    listPublicly: Boolean!
    type: RewardableType!
    sortWeight: Int
    orgId: String
    # Manually added
    puzzle: CreatePuzzleInput!
    nft: FormNftEditInput!
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
