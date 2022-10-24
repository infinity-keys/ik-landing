export const schema = gql`
  type Pack {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    path: String!
    listPublicly: Boolean!
    nfts: [Nft]!
    bundles: [PacksOnBundles]!
    puzzles: [PuzzlesOnPacks]!
  }

  type Query {
    packs: [Pack!]! @requireAuth
    pack(id: String!): Pack @requireAuth
  }

  input CreatePackInput {
    name: String!
    path: String!
    listPublicly: Boolean!
  }

  input UpdatePackInput {
    name: String
    path: String
    listPublicly: Boolean
  }

  type Mutation {
    createPack(input: CreatePackInput!): Pack! @requireAuth
    updatePack(id: String!, input: UpdatePackInput!): Pack! @requireAuth
    deletePack(id: String!): Pack! @requireAuth
  }
`
