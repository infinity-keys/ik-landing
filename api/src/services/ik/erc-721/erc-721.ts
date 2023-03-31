import type { QueryResolvers } from 'types/graphql'
import Moralis from 'moralis'

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
const rangeOfTokenIds: string[] = ['8946', '8946'] // we want all ids in this range

function tokenIdsExist(data: any, rangeOfTokenIds: string[]): boolean {
  if (data && data.result) {
    return (
      data.result.find((nft: any) => {
        const tokenId = nft.token_id
        return (
          parseInt(tokenId) >= parseInt(rangeOfTokenIds[0]) &&
          parseInt(tokenId) <= parseInt(rangeOfTokenIds[1])
        )
      }) !== undefined
    )
  }
  return false
}

export const getErc721TokenIds: QueryResolvers['getErc721TokenIds'] =
  async () => {
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
      tokenAddresses: [contractAddress],
    })

    // checking that the data can be accessed via Moralis
    // console.log(response.toJSON())

    // checking if any token ids fall within the specified range
    const hasMatches = tokenIdsExist(response.toJSON(), rangeOfTokenIds)

    return {
      success: true,
      hasMatches, // do any token ids fall within the specified range (boolean)
    }
  }
