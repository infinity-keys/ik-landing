import {
  ETH_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
  POLYGON_CHAIN_ID,
  AVAX_CHAIN_ID,
} from '@infinity-keys/constants'
import { ethers } from 'ethers'

import { logger } from 'src/lib/logger'
import { contractLookup } from 'src/lib/lookups'

/**
 * This function returns a new boolean array based on a given 2D boolean array.
 * The value in the returned array at each index is true if at least one of the
 * arrays in the given 2D array has a true value at the same index.
 *
 * @param arrays - A 2D boolean array.
 * @returns A boolean array.
 */
const hasOneTruePerIndex = (arrays: boolean[][]): boolean[] => {
  // All inner arrays should be the same length (the length of the tokenIds array)
  const length = arrays[0].length

  // Return a new array created from an array-like object that has a length property.
  // The second parameter of Array.from is a map function that gets called on every element
  // of the array (in this case, every index from 0 to length-1).
  return Array.from({ length }, (_, i) =>
    // The some() method is called for each inner array at the current index.
    // It returns true as soon as it finds an array where the value at index i is true.
    arrays.some((arr) => arr[i])
  )
}

export const checkBalance = async ({
  account,
  tokenIds,
}: {
  account: string
  tokenIds: number[]
}) => {
  // Again, this whole API could be migrated to Moralis
  const contracts = [
    contractLookup[POLYGON_CHAIN_ID],
    contractLookup[AVAX_CHAIN_ID],
    contractLookup[ETH_CHAIN_ID],
    contractLookup[OPTIMISM_CHAIN_ID],
  ]

  try {
    const accountArray = Array(tokenIds.length).fill(account)

    // Returns type ethers.BigNumber
    const allBalances = await Promise.all(
      contracts.map((contract) =>
        contract?.balanceOfBatch(accountArray, tokenIds)
      )
    )

    // Get balance for every contract, return true if user has claimed token at
    // least once
    const allClaimedTokens: boolean[][] = allBalances?.map((bigNumberArr) =>
      bigNumberArr.map((b: ethers.BigNumber) => b.toNumber() > 0)
    )

    // Convert nested arrays into single array. Index will be true if at least
    // one of the arrays has true at that index
    const claimedTokens = hasOneTruePerIndex(allClaimedTokens)

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
