export const schema = gql`
  type Bundle {
    id: String!
    createdAt: DateTime!
    name: String!
    path: String!
    rewardNftId: String!
    listPublicly: Boolean!
    nfts: [Nft]!
    packs: [PacksOnBundles]!
  }

  type Query {
    bundles: [Bundle!]! @requireAuth
    bundle(id: String!): Bundle @requireAuth
  }

  input CreateBundleInput {
    name: String!
    path: String!
    rewardNftId: String!
    listPublicly: Boolean!
  }

  input UpdateBundleInput {
    name: String
    path: String
    rewardNftId: String
    listPublicly: Boolean
  }

  type Mutation {
    createBundle(input: CreateBundleInput!): Bundle! @requireAuth
    updateBundle(id: String!, input: UpdateBundleInput!): Bundle! @requireAuth
    deleteBundle(id: String!): Bundle! @requireAuth
  }
`
