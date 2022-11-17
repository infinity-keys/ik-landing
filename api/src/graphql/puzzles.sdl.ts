export const schema = gql`
  type Puzzle {
    rewardable: Rewardable!
    rewardableId: String!
    submissions: [Submission]!
    steps: [Step]!
  }

  type Query {
    puzzles: [Puzzle!]! @requireAuth
    puzzle(id: String!): Puzzle @requireAuth
  }

  input CreatePuzzleInput {
    rewardableId: String!
  }

  input UpdatePuzzleInput {
    rewardableId: String
  }

  type Mutation {
    createPuzzle(input: CreatePuzzleInput!): Puzzle! @requireAuth
    updatePuzzle(id: String!, input: UpdatePuzzleInput!): Puzzle! @requireAuth
    deletePuzzle(id: String!): Puzzle! @requireAuth
  }
`
