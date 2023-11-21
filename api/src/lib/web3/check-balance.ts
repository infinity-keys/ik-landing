import { OPTIMISM_CHAIN_ID } from '@infinity-keys/constants'
import { ethers } from 'ethers'

import { logger } from 'src/lib/logger'
import { contractLookup } from 'src/lib/lookups'

export const checkBalance = async ({
  account,
  tokenIds,
}: {
  account: string
  tokenIds: number[]
}) => {
  try {
    const contract = contractLookup[OPTIMISM_CHAIN_ID]
    const accountArray = Array(tokenIds.length).fill(account)

    // Returns type ethers.BigNumber
    const balances = await contract?.balanceOfBatch(accountArray, tokenIds)

    // Check every balance of every tokenId- if 0 for any of them return false
    const claimedTokens: boolean[] = balances.map(
      (b: ethers.BigNumber) => b.toNumber() > 0
    )

    // Check if all nft are claimed, returns true if eligible to claim pack nft
    const claimed = claimedTokens?.every((b) => b)

    return { claimed, claimedTokens }
  } catch (error) {
    logger.error('Error at check-balance', error)
    return {
      errors: ['Error checking balance'],
    }
  }
}
