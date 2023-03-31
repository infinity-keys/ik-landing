export const schema = gql`
  type Erc721ResponseData {
    address: String
    chain: String
    tokenAddress: String
    tokenId: String
  }

  type Erc721Response {
    success: Boolean
    data: [Erc721ResponseData]
    hasMatches: Boolean
  }

  type Query {
    # runs through entire nft claim flow
    getErc721TokenIds: Erc721Response! @skipAuth
  }
`
