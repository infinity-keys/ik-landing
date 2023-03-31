export const schema = gql`
  type Erc721ResponseData {
    tokenId: String
  }

  type Erc721Response {
    success: Boolean
    hasMatches: Boolean
  }

  type Query {
    getErc721TokenIds: Erc721Response! @skipAuth
  }
`
