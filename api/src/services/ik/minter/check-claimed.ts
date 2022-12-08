import { contractLookup } from '@infinity-keys/contracts'
import { QueryResolvers } from 'types/graphql'

import {
  ETH_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
  POLYGON_CHAIN_ID,
  AVAX_CHAIN_ID,
} from 'src/lib/walletConstants'

export const checkClaimed: QueryResolvers['checkClaimed'] = async ({
  account,
  tokenId,
}) => {
  // Had check to see if tokenId exists => will now revert in try catch.
  // Could also move to constant from DB NFT metadata table or something

  // COMMENTS FROM NEXT:
  // checks if they've solved any puzzles at all
  // Next gate: check the DB for tokenId in both NFT table AND! pack table
  // ensures all related puzzles have been solved

  try {
    //POLYGON
    const polygonContract = contractLookup[POLYGON_CHAIN_ID]
    const polygonClaim = await polygonContract.checkIfClaimed(tokenId, account)
    if (polygonClaim)
      return {
        success: true,
        claimed: polygonClaim,
        chainClaimed: POLYGON_CHAIN_ID,
      }

    //AVAX
    const avaxContract = contractLookup[AVAX_CHAIN_ID]
    const avaxClaim = await avaxContract.checkIfClaimed(tokenId, account)
    if (avaxClaim)
      return { success: true, claimed: avaxClaim, chainClaimed: AVAX_CHAIN_ID }

    //ETH
    const ethContract = contractLookup[ETH_CHAIN_ID]
    const ethClaim = await ethContract.checkIfClaimed(tokenId, account)
    if (ethClaim)
      return { success: true, claimed: ethClaim, chainClaimed: ETH_CHAIN_ID }

    //Optimism
    const optContract = contractLookup[OPTIMISM_CHAIN_ID]
    const optClaim = await optContract.checkIfClaimed(tokenId, account)
    if (optClaim)
      return {
        success: true,
        claimed: optClaim,
        chainClaimed: OPTIMISM_CHAIN_ID,
      }

    return { success: true, claimed: false }
  } catch (error) {
    return { success: false, message: error }
  }
}
