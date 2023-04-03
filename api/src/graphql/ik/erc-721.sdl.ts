export const schema = gql`
  type Erc721Response {
    hasMatches: Boolean
  }

  type Query {
    getErc721TokenIds: Erc721Response! @skipAuth
  }
`
