export const schema = gql`
  type Puzzle {
    id: String!
    puzzleName: String!
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
    puzzle(id: String!): Puzzle @requireAuth
  }

  input CreatePuzzleInput {
    puzzleName: String!
    path: String!
    successMessage: String
    rewardNft: String!
    listPublicly: Boolean!
    listSortWeight: Int!
  }

  input UpdatePuzzleInput {
    puzzleName: String
    path: String
    successMessage: String
    rewardNft: String
    listPublicly: Boolean
    listSortWeight: Int
  }

  type Mutation {
    createPuzzle(input: CreatePuzzleInput!): Puzzle! @requireAuth
    updatePuzzle(id: String!, input: UpdatePuzzleInput!): Puzzle! @requireAuth
    deletePuzzle(id: String!): Puzzle! @requireAuth
  }
`
