import Moralis from 'moralis'
import { GetWalletNFTsJSONResponse } from '@moralisweb3/common-evm-utils'
import { logger } from 'src/lib/logger'

if (!Moralis.Core.isStarted) {
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  })
}

const rangeOfTokenIds: number[] = [13230, 13233] // we want all ids in this range

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
  startId,
  endId,
}: {
  address: string
  contractAddress: string
  chainId: string
  startId: number
  endId: number
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
      hasMatches = tokenIdsExist(response.toJSON(), startId, endId)
      cursor = response.pagination.cursor
    } while (cursor !== '' && cursor !== null && !hasMatches)

    return {
      hasMatches, // do any token ids fall within the specified range (boolean)
    }
  } catch (e) {
    logger.error(e)
    return {
      hasMatches: false,
      errors: ['Error checking token id ranges.'],
    }
  }
}
