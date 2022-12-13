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
    organization: Organization!
    orgId: String!
    nfts: [Nft]!
    puzzle: Puzzle
    pack: Pack
    bundle: Bundle
    asParent: [RewardableConnection]!
    asChild: [RewardableConnection]!
  }

  enum RewardableType {
    PUZZLE
    PACK
    BUNDLE
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
    orgId: String!
  }

  input UpdateRewardableInput {
    name: String
    slug: String
    explanation: String
    successMessage: String
    listPublicly: Boolean
    type: RewardableType
    orgId: String
  }

  type Mutation {
    createRewardable(input: CreateRewardableInput!): Rewardable! @requireAuth
    updateRewardable(id: String!, input: UpdateRewardableInput!): Rewardable!
      @requireAuth
    deleteRewardable(id: String!): Rewardable! @requireAuth
  }
`
