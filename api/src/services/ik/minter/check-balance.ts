import { contractLookup } from '@infinity-keys/contracts'
import { ethers } from 'ethers'
import { QueryResolvers } from 'types/graphql'

export const checkBalance: QueryResolvers['checkBalance'] = async ({
  account,
  tokenIds,
  chainId,
}) => {
  // Again, this whole API could be migrated to Moralis
  const contract = contractLookup[chainId]

  if (!contract)
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    }

  // ADD CHECK TO MAKE SURE TOKEN IDS VALID => Will just catch here

  try {
    const accountArray = Array(tokenIds.length).fill(account)

    // returns type ethers.BigNumber
    const balances = await contract?.balanceOfBatch(accountArray, tokenIds)

    // check every balance of every tokenId- if 0 for any of them return false
    const claimedTokens = balances?.map(
      (b: ethers.BigNumber) => b.toNumber() > 0
    )
    // checks if all nft are claimed, returns true if eligible to claim pack nft
    const claimed = claimedTokens?.every((b: boolean) => b)

    return { success: true, claimed: claimed, claimedTokens: claimedTokens }
  } catch (error) {
    return {
      success: false,
      message: error,
    }
  }
}
