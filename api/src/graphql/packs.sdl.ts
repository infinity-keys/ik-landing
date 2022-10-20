export const schema = gql`
  type Pack {
    id: String!
    name: String!
    path: String!
    rewardNftId: String!
    listPublicly: Boolean!
    listSortWeight: Int!
    puzzles: [Puzzle]!
  }

  type Query {
    packs: [Pack!]! @requireAuth
    pack(id: String!): Pack @requireAuth
  }

  input CreatePackInput {
    name: String!
    path: String!
    rewardNftId: String!
    listPublicly: Boolean!
    listSortWeight: Int!
  }

  input UpdatePackInput {
    name: String
    path: String
    rewardNftId: String
    listPublicly: Boolean
    listSortWeight: Int
  }

  type Mutation {
    createPack(input: CreatePackInput!): Pack! @requireAuth
    updatePack(id: String!, input: UpdatePackInput!): Pack! @requireAuth
    deletePack(id: String!): Pack! @requireAuth
  }
`
