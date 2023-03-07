export const schema = gql`
  type Bundle {
    id: String!
    rewardable: Rewardable!
    rewardableId: String!
  }

  type Query {
    bundles: [Bundle!]! @requireAuth
    bundle(id: String!): Bundle @requireAuth
  }

  input CreateBundleInput {
    rewardableId: String!
  }

  input UpdateBundleInput {
    rewardableId: String
  }

  type Mutation {
    createBundle(input: CreateBundleInput!): Bundle!
      @requireAuth(roles: ["ADMIN"])
    updateBundle(id: String!, input: UpdateBundleInput!): Bundle!
      @requireAuth(roles: ["ADMIN"])
    deleteBundle(id: String!): Bundle! @requireAuth(roles: ["ADMIN"])
  }
`
