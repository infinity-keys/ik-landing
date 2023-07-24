// work in progress still
export const schema = gql`
  type Puzzle {
    id: String!
    name: String!
    slug: String!
    steps: [Step!]!
  }

  input CreatePuzzleInput {
    name: String!
    slug: String!
    steps: [CreateStepInput!]!
  }

  input CreateStepInput {
    type: StepType!
    failMessage: String!
    solution: String
    nftId: String
  }

  enum StepType {
    SIMPLE_TEXT
    NFT_CHECK
  }

  type Mutation {
    createPuzzle(input: CreatePuzzleInput!): Puzzle!
  }
`
