export const schema = gql`
  type Query {
    nftByContractAndTokenId(tokenId: Int!, contractName: String!): Nft @skipAuth
  }
`
