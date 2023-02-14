export const schema = gql`
  type CheckBalanceResponse {
    errors: [String!]
    claimed: Boolean
    claimedTokens: [Boolean!]
  }

  type CheckClaimedResponse {
    errors: [String!]
    claimed: Boolean
    chainClaimed: Int
  }

  type ClaimResponse {
    errors: [String!]
    claimed: Boolean
    chainClaimed: Int
    signature: String
    tokenId: Int
  }

  type CheckNftResponse {
    errors: [String!]
    nftPass: Boolean
  }

  type CheckWalletAgeResponse {
    errors: [String!]
    approved: Boolean!
  }

  input NftCheckDatumInput {
    id: String!
    contractAddress: String
    tokenId: Int
    chainId: Int
    poapEventId: String
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
    ): ClaimResponse! @requireAuth

    # checks if user has NFT on any of the supported networks
    checkClaimed(account: String!, tokenId: Int!): CheckClaimedResponse!
      @requireAuth

    # checks for NFT required for puzzle solution
    checkNft(
      account: String!
      checkLogic: NftCheckLogic!
      nftCheckData: [NftCheckDatumInput!]!
    ): CheckNftResponse! @requireAuth

    # checks age of wallet on eth, checks number of transactions on others
    checkWalletAge(account: String!, chainId: Int!): CheckWalletAgeResponse!
      @requireAuth

    # finds unique db entry by contract name and token id
    nftByContractAndTokenId(tokenId: Int!, contractName: String!): Nft
      @requireAuth
  }
`
