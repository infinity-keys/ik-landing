export const schema = gql`
  type Mutation {
    # I already have the types that exist for a step, so you don't need a
    # CreateBurdStepType...
    createBurdPuzzle(input: CreateBurdPuzzleInput!): Rewardable!
      @requireAuth(roles: ["ADMIN"])
  }

  input CreateBurdPuzzleInput {
    rewardable: CreateRewardableInput!
    puzzle: BurdPuzzleInput!
  }

  # replaced with "rewardable" below in "type Mutation"
  type CreateBurdPuzzleResponse {
    success: Boolean!
  }

  # we made this custon b.c. rewardableId is required
  # on input CreatePuzzleInput {} in puzzles.sdl.ts
  # eventually this needs the properties of: 'CreatePuzzleInput'
  input BurdPuzzleInput {
    isAnon: Boolean!
    rewardableId: String
    steps: [BurdStepInput!]!
  }

  enum StepTypeEnum {
    SIMPLE_TEXT
    NFT_CHECK
  }

  # we made this custom to follow the pattern above, just to
  # get things working in the Redwood GraphQL playground
  # eventually this needs the properties of: 'CreateStepInput'
  input BurdStepInput {
    type: StepTypeEnum!
    failMessage: String!
    stepSortWeight: Int!
  }
`
