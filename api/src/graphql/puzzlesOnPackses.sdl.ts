export const schema = gql`
  type PuzzlesOnPacks {
    id: String!
    puzzleId: String!
    puzzle: Puzzle!
    packId: String!
    pack: Pack!
    puzzleSortWeight: Int!
    assignedAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    puzzlesOnPackses: [PuzzlesOnPacks!]! @requireAuth
    puzzlesOnPacks(id: String!): PuzzlesOnPacks @requireAuth
  }

  input CreatePuzzlesOnPacksInput {
    puzzleId: String!
    packId: String!
    puzzleSortWeight: Int!
    assignedAt: DateTime!
  }

  input UpdatePuzzlesOnPacksInput {
    puzzleId: String
    packId: String
    puzzleSortWeight: Int
    assignedAt: DateTime
  }

  type Mutation {
    createPuzzlesOnPacks(input: CreatePuzzlesOnPacksInput!): PuzzlesOnPacks!
      @requireAuth
    updatePuzzlesOnPacks(
      id: String!
      input: UpdatePuzzlesOnPacksInput!
    ): PuzzlesOnPacks! @requireAuth
    deletePuzzlesOnPacks(id: String!): PuzzlesOnPacks! @requireAuth
  }
`
