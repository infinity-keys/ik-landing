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

  type claimResponse {
    success: Boolean!
    claimed: Boolean
    chainClaimed: Int
    signature: String
    message: String
    tokenId: Int
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
      tokenIds: [Int!]!
      chainId: Int!
    ): CheckBalanceResponse! @requireAuth

    # runs through entire nft claim flow
    claim(
      account: String!
      rewardableId: String!
      chainId: Int!
    ): claimResponse! @requireAuth

    # checks if user has NFT on any of the supported networks
    checkClaimed(account: String!, tokenId: Int!): CheckClaimedResponse!
      @requireAuth

    # checks for NFT required for puzzle solution
    checkNft(
      account: String!
      chainId: Int
      contractAddress: String
      tokenId: Int
      poapEventId: String
    ): CheckNftResponse! @requireAuth

    # checks age of wallet on eth, checks number of transactions on others
    checkWalletAge(account: String!, chainId: Int!): CheckWalletAgeResponse!
      @requireAuth

    # finds unique db entry by contract name and token id
    nftByContractAndTokenId(tokenId: Int!, contractName: String!): Nft
      @requireAuth

    # checks if user has the NFTs required to claim a gated token
    verify(
      account: String!
      tokenId: Int!
      chainId: Int!
      gatedIds: [Int!]
    ): VerifyResponse! @requireAuth
  }
`
