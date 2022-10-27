export const schema = gql`
  type Nft {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    tokenId: Int!
    contractName: String!
    data: JSON!
    cloudinaryId: String!
    puzzles: [Puzzle]!
    packs: [Pack]!
    bundles: [Bundle]!
  }

  type Query {
    nfts: [Nft!]! @requireAuth
    nft(id: String!): Nft @requireAuth
    nftByContractAndTokenId(tokenId: Int!, contractName: String!): Nft
      @requireAuth
  }

  input CreateNftInput {
    tokenId: Int!
    contractName: String!
    data: JSON!
    cloudinaryId: String!
  }

  input UpdateNftInput {
    tokenId: Int
    contractName: String
    data: JSON
    cloudinaryId: String
  }

  type Mutation {
    createNft(input: CreateNftInput!): Nft! @requireAuth
    updateNft(id: String!, input: UpdateNftInput!): Nft! @requireAuth
    deleteNft(id: String!): Nft! @requireAuth
  }
`
