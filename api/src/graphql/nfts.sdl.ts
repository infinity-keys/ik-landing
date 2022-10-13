export const schema = gql`
  type Nft {
    nftId: String!
    tokenId: Int!
    contractName: String!
    data: JSON!
    cloudinaryId: String!
    puzzleId: String!
    puzzle: Puzzle!
  }

  type Query {
    nfts: [Nft!]! @requireAuth
    nft(nftId: String!): Nft @requireAuth
  }

  input CreateNftInput {
    nftId: String!
    tokenId: Int!
    contractName: String!
    data: JSON!
    cloudinaryId: String!
    puzzleId: String!
  }

  input UpdateNftInput {
    nftId: String
    tokenId: Int
    contractName: String
    data: JSON
    cloudinaryId: String
    puzzleId: String
  }

  type Mutation {
    createNft(input: CreateNftInput!): Nft! @requireAuth
    updateNft(nftId: String!, input: UpdateNftInput!): Nft! @requireAuth
    deleteNft(nftId: String!): Nft! @requireAuth
  }
`
