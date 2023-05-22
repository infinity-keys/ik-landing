import {
  ETH_CHAIN_ID,
  OPTIMISM_CHAIN_ID,
  POLYGON_CHAIN_ID,
  AVAX_CHAIN_ID,
} from '@infinity-keys/constants'

import { contractLookup } from 'src/lib/lookups'

const FIRST_OPT_ONLY_TOKEN_ID = 170

export const checkClaimed = async ({
  account,
  tokenId,
}: {
  account: string
  tokenId: number
}) => {
  // @TODO: Had check to see if tokenId exists => will now revert in try catch.
  // Could also move to constant from DB NFT metadata table or something

  // COMMENTS FROM NEXT:
  // checks if they've solved any puzzles at all (JWT stuff)
  // Next gate: check the DB for tokenId in both NFT table AND! pack table (Graphql)
  // ensures all related puzzles have been solved (JWT checks)

  // Could move all of these checks to Moralis or ideally database-
  // every time someone claims, just update DB with token ID
  try {
    //Optimism
    const optContract = contractLookup[OPTIMISM_CHAIN_ID]
    const optClaim = await optContract.checkIfClaimed(tokenId, account)

    // NOTE: Tokens 170 and up are only minted on Optimism, so checking for them
    // on the other contracts will throw an error since they do not exist.
    if (tokenId >= FIRST_OPT_ONLY_TOKEN_ID || optClaim) {
      return {
        claimed: optClaim,
        ...(optClaim ? { chainClaimed: OPTIMISM_CHAIN_ID } : {}),
      }
    }

    //POLYGON
    const polygonContract = contractLookup[POLYGON_CHAIN_ID]
    const polygonClaim = await polygonContract.checkIfClaimed(tokenId, account)
    if (polygonClaim)
      return {
        claimed: polygonClaim,
        chainClaimed: POLYGON_CHAIN_ID,
      }

    //AVAX
    const avaxContract = contractLookup[AVAX_CHAIN_ID]
    const avaxClaim = await avaxContract.checkIfClaimed(tokenId, account)
    if (avaxClaim) return { claimed: avaxClaim, chainClaimed: AVAX_CHAIN_ID }

    //ETH
    const ethContract = contractLookup[ETH_CHAIN_ID]
    const ethClaim = await ethContract.checkIfClaimed(tokenId, account)
    if (ethClaim) return { claimed: ethClaim, chainClaimed: ETH_CHAIN_ID }

    return { claimed: false }
  } catch {
    return { errors: ['Error checking claimed NFT'] }
  }
}
