export const schema = gql`
  type Puzzle {
    puzzleId: String!
    path: String!
    successMessage: String
    rewardNft: String!
    listPublicly: Boolean!
    listSortWeight: Int!
    steps: [Step]!
    packs: [Pack]!
    submissions: [Submission]!
    nft: Nft
  }

  type Query {
    puzzles: [Puzzle!]! @requireAuth
    puzzle(puzzleId: String!): Puzzle @requireAuth
  }

  input CreatePuzzleInput {
    puzzleId: String!
    path: String!
    successMessage: String
    rewardNft: String!
    listPublicly: Boolean!
    listSortWeight: Int!
  }

  input UpdatePuzzleInput {
    puzzleId: String
    path: String
    successMessage: String
    rewardNft: String
    listPublicly: Boolean
    listSortWeight: Int
  }

  type Mutation {
    createPuzzle(input: CreatePuzzleInput!): Puzzle! @requireAuth
    updatePuzzle(puzzleId: String!, input: UpdatePuzzleInput!): Puzzle!
      @requireAuth
    deletePuzzle(puzzleId: String!): Puzzle! @requireAuth
  }
`
