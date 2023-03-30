// copy formatting from web3.sdl.ts

// type vars & response that goes into a Graph QL response

// @requireAuth for us will be "skipauth"

// export const schema = gql`
//   type Erc721Response {
//     success: Boolean!
//   }

//   type Query {
//     # runs through entire nft claim flow
//     getErc721TokenIds: Erc721Response! @skipAuth
//   }
// `

export const schema = gql`
  type Erc721ResponseData {
    address: String
    chain: String
    tokenAddress: String
  }

  type Erc721Response {
    success: Boolean
    data: [Erc721ResponseData]
  }

  type Query {
    # runs through entire nft claim flow
    getErc721TokenIds: Erc721Response! @skipAuth
  }
`
