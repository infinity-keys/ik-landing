export const schema = gql`
  type Puzzle {
    id: String!
    rewardable: Rewardable!
    rewardableId: String!
    submissions: [Submission]!
    requirements: [PuzzleRequirements]
    coverImage: String
    steps: [Step]!
  }

  enum PuzzleRequirements {
    HOLDERS_ONLY
    SOCIAL_ACCOUNT
    WALLET_GAS
    TRAVEL
    PATIENCE
    WORDPLAY
    DETAIL
    INTERACTIVE_OBJECT
  }

  type Query {
    puzzles: [Puzzle!]! @requireAuth
    puzzle(id: String!): Puzzle @skipAuth
  }

  input CreatePuzzleInput {
    rewardableId: String!
    steps: [CreateStepInput!]
    requirements: [PuzzleRequirements]!
    coverImage: String!
  }

  input UpdatePuzzleInput {
    rewardableId: String
    requirements: [PuzzleRequirements]!
    coverImage: String
  }

  type Mutation {
    createPuzzle(input: CreatePuzzleInput!): Puzzle!
      @requireAuth(roles: ["ADMIN"])
    updatePuzzle(id: String!, input: UpdatePuzzleInput!): Puzzle!
      @requireAuth(roles: ["ADMIN"])
    deletePuzzle(id: String!): Puzzle! @requireAuth(roles: ["ADMIN"])
  }
`
