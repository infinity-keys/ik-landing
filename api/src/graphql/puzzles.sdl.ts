export const schema = gql`
  type Puzzle {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    puzzleName: String!
    path: String!
    successMessage: String
    listPublicly: Boolean!
    nfts: [Nft]!
    submissions: [Submission]!
    steps: [StepsOnPuzzles]!
    packs: [PuzzlesOnPacks]!
  }

  type Query {
    puzzles: [Puzzle!]! @requireAuth
    puzzle(id: String!): Puzzle @requireAuth
  }

  input CreatePuzzleInput {
    puzzleName: String!
    path: String!
    successMessage: String
    listPublicly: Boolean!
  }

  input UpdatePuzzleInput {
    puzzleName: String
    path: String
    successMessage: String
    listPublicly: Boolean
  }

  type Mutation {
    createPuzzle(input: CreatePuzzleInput!): Puzzle! @requireAuth
    updatePuzzle(id: String!, input: UpdatePuzzleInput!): Puzzle! @requireAuth
    deletePuzzle(id: String!): Puzzle! @requireAuth
  }
`
