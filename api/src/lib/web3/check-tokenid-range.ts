import { GetWalletNFTsJSONResponse } from '@moralisweb3/common-evm-utils'
import Moralis from 'moralis'

import { logger } from 'src/lib/logger'

if (!Moralis.Core.isStarted) {
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  })
}

function tokenIdsExist(
  data: GetWalletNFTsJSONResponse,
  startId: number,
  endId: number
): boolean {
  if (data && data.result) {
    return (
      data.result.find((nft) => {
        const tokenId = nft.token_id
        return parseInt(tokenId) >= startId && parseInt(tokenId) <= endId
      }) !== undefined
    )
  }
  return false
}

export const getErc721TokenIds = async ({
  address,
  contractAddress,
  chainId,
  startIds,
  endIds,
}: {
  address: string
  contractAddress: string
  chainId: string
  startIds: number[]
  endIds: number[]
}) => {
  try {
    let hasMatches = false
    let cursor = null

    // Moralis limits the return data to 100 nfts, so we keep running the
    // function until we either have a match or we run out of nfts.
    do {
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain: chainId,
        tokenAddresses: [contractAddress],
        cursor,
      })

      // checking if any token ids fall within the specified range
      // hasMatches = tokenIdsExist(response.toJSON(), startId, endId)
      hasMatches = startIds.some((startId, index) => {
        const endId = endIds[index]
        return tokenIdsExist(response.toJSON(), startId, endId)
      })
      cursor = response.pagination.cursor
    } while (cursor !== '' && cursor !== null && !hasMatches)

    return {
      hasMatches, // do any token ids fall within the specified range (boolean)
    }
  } catch (e) {
    logger.error('Error checking token id range.', e)
    return {
      hasMatches: false,
      errors: ['Error checking token id ranges.'],
    }
  }
}
