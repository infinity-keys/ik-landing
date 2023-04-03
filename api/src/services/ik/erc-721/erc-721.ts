import type { QueryResolvers } from 'types/graphql'
import Moralis from 'moralis'
import { GetWalletNFTsJSONResponse } from '@moralisweb3/common-evm-utils'
import { logger } from 'src/lib/logger'

if (!Moralis.Core.isStarted) {
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  })
}

// these three variables are going to eventually be dynamic
// for now they are hard coded here to test out this service function
const address: string = '0xc13eC844Eb19D6A72DDD5F2779484BA35279A817'
const contractAddress: string = '0xa4e3513c98b30d4d7cc578d2c328bd550725d1d0'
const chain: string = '0x89' // polygon
const rangeOfTokenIds: number[] = [13230, 13233] // we want all ids in this range

function tokenIdsExist(
  data: GetWalletNFTsJSONResponse,
  rangeOfTokenIds: number[]
): boolean {
  if (data && data.result) {
    return (
      data.result.find((nft) => {
        const tokenId = nft.token_id
        return (
          parseInt(tokenId) >= rangeOfTokenIds[0] &&
          parseInt(tokenId) <= rangeOfTokenIds[1]
        )
      }) !== undefined
    )
  }
  return false
}

export const getErc721TokenIds: QueryResolvers['getErc721TokenIds'] =
  async () => {
    try {
      let hasMatches = false
      let cursor = null

      // Moralis limits the return data to 100 nfts, so we keep running the
      // function until we either have a match or we run out of nfts.
      do {
        const response = await Moralis.EvmApi.nft.getWalletNFTs({
          address,
          chain,
          tokenAddresses: [contractAddress],
          cursor,
        })

        // checking if any token ids fall within the specified range
        hasMatches = tokenIdsExist(response.toJSON(), rangeOfTokenIds)
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
