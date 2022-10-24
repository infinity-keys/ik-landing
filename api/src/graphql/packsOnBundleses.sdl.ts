export const schema = gql`
  type PacksOnBundles {
    id: String!
    packId: String!
    pack: Pack!
    bundleId: String!
    bundle: Bundle!
    packSortWeight: Int!
    assignedAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    packsOnBundleses: [PacksOnBundles!]! @requireAuth
    packsOnBundles(id: String!): PacksOnBundles @requireAuth
  }

  input CreatePacksOnBundlesInput {
    packId: String!
    bundleId: String!
    packSortWeight: Int!
    assignedAt: DateTime!
  }

  input UpdatePacksOnBundlesInput {
    packId: String
    bundleId: String
    packSortWeight: Int
    assignedAt: DateTime
  }

  type Mutation {
    createPacksOnBundles(input: CreatePacksOnBundlesInput!): PacksOnBundles!
      @requireAuth
    updatePacksOnBundles(
      id: String!
      input: UpdatePacksOnBundlesInput!
    ): PacksOnBundles! @requireAuth
    deletePacksOnBundles(id: String!): PacksOnBundles! @requireAuth
  }
`
