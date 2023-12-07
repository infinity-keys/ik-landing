import { OPTIMISM_CHAIN_ID } from '@infinity-keys/constants'
import { ethers } from 'ethers'
import { Ok, Err, Result } from 'ts-results'

import { logger } from 'src/lib/logger'
import { contractLookup } from 'src/lib/lookups'

export const checkBalance = async ({
  account,
  tokenIds,
}: {
  account: string
  tokenIds: number[]
}): Promise<
  Result<
    {
      hasRequiredNfts: boolean
      claimedTokens: boolean[]
    },
    string
  >
> => {
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
    const hasRequiredNfts = claimedTokens?.every((b) => b)

    return new Ok({ hasRequiredNfts, claimedTokens })
  } catch (error) {
    logger.error('Error at check-balance', error)
    return new Err('Error occurred while checking balance.')
  }
}
