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

  input RewardableConnectionInput {
    parentId: String!
    childSortWeight: Int
  }

  input CreateNftDataInput {
    create: [UpdateNftCheckDatumInput]
  }

  input StepNftCheckInput {
    requireAllNfts: Boolean!
    nftCheckData: CreateNftDataInput
  }

  input StepTypeData {
    stepSimpleText: UpdateStepSimpleTextInput
    stepNftCheck: StepNftCheckInput
    stepFunctionCall: UpdateStepFunctionCallInput
    stepComethApi: UpdateStepComethApiInput
    stepTokenIdRange: UpdateStepTokenIdRangeInput
  }

  input StepInput {
    failMessage: String
    successMessage: String
    challenge: String
    resourceLinks: String
    stepSortWeight: Int!
    type: StepType!
    stepTypeData: StepTypeData
  }

  input CreateRewardablesStepsNftsInput {
    name: String!
    slug: String!
    explanation: String!
    successMessage: String
    listPublicly: Boolean
    type: RewardableType!
    rewardableConnection: RewardableConnectionInput
    availableChains: [AvailableChains]!
    nft: CreateNftInput
    steps: [StepInput]
  }

  type CreateRewardablesStepsNftsResponse {
    id: String!
  }

  type Query {
    rewardableBySlug(slug: String!, type: RewardableType!): Rewardable @skipAuth
    rewardableBySlugWithAnonPuzzle(slug: String!): Rewardable @skipAuth
    rewardablesCollection(
      types: [RewardableType!]!
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
    createRewardablesStepsNfts(
      input: CreateRewardablesStepsNftsInput!
    ): CreateRewardablesStepsNftsResponse! @requireAuth(roles: ["ADMIN"])
  }
`
