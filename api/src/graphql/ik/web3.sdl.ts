export const schema = gql`
  type CheckBalanceResponse {
    success: Boolean!
    claimed: Boolean
    claimedTokens: [Boolean!]
    message: String
  }

  type CheckClaimedResponse {
    success: Boolean!
    claimed: Boolean
    chainClaimed: Int
    message: String
  }

  type CheckNftResponse {
    success: Boolean!
    nftPass: Boolean
    message: String
  }

  type CheckWalletAgeResponse {
    success: Boolean!
    approved: Boolean!
  }

  type VerifyResponse {
    success: Boolean!
    message: String
    signature: String
    claimedTokens: [Boolean!]
  }

  type Query {
    # checks user's balance of token ids
    checkBalance(
      account: String!
      tokenIds: [String!]!
      chainId: String!
    ): CheckBalanceResponse! @skipAuth

    # checks if user has NFT on any of the supported networks
    checkClaimed(account: String!, tokenId: String!): CheckClaimedResponse!
      @skipAuth

    # checks for NFT required for puzzle solution
    checkNft(
      account: String!
      chainId: Int!
      contractAddress: String!
      tokenId: Int
    ): CheckNftResponse! @skipAuth

    # checks age of wallet on eth, checks number of transactions on others
    checkWalletAge(account: String!, chainId: Int!): CheckWalletAgeResponse!
      @skipAuth

    # finds unique db entry by contract name and token id
    nftByContractAndTokenId(tokenId: Int!, contractName: String!): Nft @skipAuth

    # checks if user has the NFTs required to claim a gated token
    verify(
      account: String!
      tokenId: String!
      chainId: String!
      gatedIds: [String!]
    ): VerifyResponse! @skipAuth
  }
`
