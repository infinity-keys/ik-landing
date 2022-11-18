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
    createBundle(input: CreateBundleInput!): Bundle! @requireAuth
    updateBundle(id: String!, input: UpdateBundleInput!): Bundle! @requireAuth
    deleteBundle(id: String!): Bundle! @requireAuth
  }
`
