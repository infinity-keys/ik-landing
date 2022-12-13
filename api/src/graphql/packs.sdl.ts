export const schema = gql`
  type Pack {
    id: String!
    rewardable: Rewardable!
    rewardableId: String!
  }

  type Query {
    packs: [Pack!]! @requireAuth
    pack(id: String!): Pack @requireAuth
  }

  input CreatePackInput {
    rewardableId: String!
  }

  input UpdatePackInput {
    rewardableId: String
  }

  type Mutation {
    createPack(input: CreatePackInput!): Pack! @requireAuth
    updatePack(id: String!, input: UpdatePackInput!): Pack! @requireAuth
    deletePack(id: String!): Pack! @requireAuth
  }
`
