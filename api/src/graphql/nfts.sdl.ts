export const schema = gql`
  type Nft {
    id: String!
    tokenId: Int!
    contractName: String!
    data: JSON!
    cloudinaryId: String!
    puzzleId: String!
    puzzle: Puzzle!
  }

  type Query {
    nfts: [Nft!]! @requireAuth
    nft(id: String!): Nft @requireAuth
  }

  input CreateNftInput {
    tokenId: Int!
    contractName: String!
    data: JSON!
    cloudinaryId: String!
    puzzleId: String!
  }

  input UpdateNftInput {
    tokenId: Int
    contractName: String
    data: JSON
    cloudinaryId: String
    puzzleId: String
  }

  type Mutation {
    createNft(input: CreateNftInput!): Nft! @requireAuth
    updateNft(id: String!, input: UpdateNftInput!): Nft! @requireAuth
    deleteNft(id: String!): Nft! @requireAuth
  }
`
