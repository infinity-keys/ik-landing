import { ethers } from 'ethers'
import { QueryResolvers } from 'types/graphql'

import { contractLookup } from 'src/lib/lookups'

export const checkBalance: QueryResolvers['checkBalance'] = async ({
  account,
  tokenIds,
  chainId,
}) => {
  // Again, this whole API could be migrated to Moralis
  const contract = contractLookup[chainId]

  if (!contract)
    return {
      errors: ['Error looking up contract.'],
    }

  // ADD CHECK TO MAKE SURE TOKEN IDS VALID => Will just catch here
  // @TODO: make db lookup instead of hitting the chain
  // const numTokens = (await contract.totalSupplyAll()).length

  try {
    const accountArray = Array(tokenIds.length).fill(account)

    // returns type ethers.BigNumber
    const balances = await contract?.balanceOfBatch(accountArray, tokenIds)

    // check every balance of every tokenId- if 0 for any of them return false
    const claimedTokens: boolean[] = balances?.map(
      (b: ethers.BigNumber) => b.toNumber() > 0
    )
    // checks if all nft are claimed, returns true if eligible to claim pack nft
    const claimed = claimedTokens?.every((b) => b)

    return { claimed, claimedTokens }
  } catch (error) {
    return {
      errors: ['Error checking balance'],
    }
  }
}
