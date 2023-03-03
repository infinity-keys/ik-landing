export const schema = gql`
  type NftCheckDatum {
    id: String!
    contractAddress: String
    tokenId: Int
    chainId: Int
    poapEventId: String
    StepNftCheck: StepNftCheck
    stepNftCheckId: String
  }

  type Query {
    nftCheckData: [NftCheckDatum!]! @requireAuth(roles: ["ADMIN"])
    nftCheckDatum(id: String!): NftCheckDatum @requireAuth(roles: ["ADMIN"])
  }

  input CreateNftCheckDatumInput {
    contractAddress: String
    tokenId: Int
    chainId: Int
    poapEventId: String
    stepNftCheckId: String
  }

  input UpdateNftCheckDatumInput {
    contractAddress: String
    tokenId: Int
    chainId: Int
    poapEventId: String
    stepNftCheckId: String
  }

  type Mutation {
    createNftCheckDatum(input: CreateNftCheckDatumInput!): NftCheckDatum!
      @requireAuth(roles: ["ADMIN"])
    updateNftCheckDatum(
      id: String!
      input: UpdateNftCheckDatumInput!
    ): NftCheckDatum! @requireAuth(roles: ["ADMIN"])
    deleteNftCheckDatum(id: String!): NftCheckDatum!
      @requireAuth(roles: ["ADMIN"])
  }
`
