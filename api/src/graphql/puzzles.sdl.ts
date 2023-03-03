export const schema = gql`
  type Puzzle {
    id: String!
    isAnon: Boolean!
    rewardable: Rewardable!
    rewardableId: String!
    submissions: [Submission]!
    steps: [Step]!
  }

  type Query {
    puzzles: [Puzzle!]! @requireAuth
    puzzle(id: String!): Puzzle @skipAuth
  }

  input CreatePuzzleInput {
    isAnon: Boolean!
    rewardableId: String!
  }

  input UpdatePuzzleInput {
    isAnon: Boolean
    rewardableId: String
  }

  type Mutation {
    createPuzzle(input: CreatePuzzleInput!): Puzzle! @requireAuth
    updatePuzzle(id: String!, input: UpdatePuzzleInput!): Puzzle! @requireAuth
    deletePuzzle(id: String!): Puzzle! @requireAuth
  }
`
