export const schema = gql`
  type Puzzle {
    id: String!
    isAnon: Boolean!
    rewardable: Rewardable!
    rewardableId: String!
    submissions: [Submission]!
    requirements: [PuzzleRequirements]!
    coverImage: String
    steps: [Step]!
  }

  enum PuzzleRequirements {
    HOLDERS
    ACCOUNT
    WALLET
    GAS
    WALK
    PATIENCE
  }

  type Query {
    puzzles: [Puzzle!]! @requireAuth
    puzzle(id: String!): Puzzle @skipAuth
  }

  input CreatePuzzleInput {
    isAnon: Boolean!
    rewardableId: String!
    requirements: [PuzzleRequirements]!
    coverImage: String
  }

  input UpdatePuzzleInput {
    isAnon: Boolean
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
