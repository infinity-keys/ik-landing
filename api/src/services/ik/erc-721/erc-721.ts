import type { QueryResolvers } from 'types/graphql'
import Moralis from 'moralis'

if (!Moralis.Core.isStarted) {
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  })
}

// these four variables are going to eventually be dynamic
// for now they are hard coded here to test out this service function
const address: string = '0xc13eC844Eb19D6A72DDD5F2779484BA35279A817'
const contractAddress: string = '0xa4e3513c98b30d4d7cc578d2c328bd550725d1d0'
const chain: string = '0x89' // polygon
const tokenIds: string[] = ['2906', '0000', '6254'] // 2906 & 6254 exist in the data
const rangeOfTokenIds: string[] = ['1000', '3000'] // only 2906 & is between 2000 & 3000

function findMatchingTokenIds(data: any, tokenIds: string[]): string[] {
  const matchingTokenIds: string[] = []

  // checking if the token id's we specify exist in the data we get from Moralis
  if (data && data.result) {
    data.result.forEach((nft: any) => {
      const tokenId = nft.token_id
      if (
        tokenIds.includes(tokenId) &&
        // does the token id fall within the specified range of token ids
        parseInt(tokenId) >= parseInt(rangeOfTokenIds[0]) &&
        parseInt(tokenId) <= parseInt(rangeOfTokenIds[1])
      ) {
        matchingTokenIds.push(tokenId)
      }
    })
  }

  return matchingTokenIds
}

export const getErc721TokenIds: QueryResolvers['getErc721TokenIds'] =
  async () => {
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
      tokenAddresses: [contractAddress],
    })

    // checking that the data can be accessed via Moralis
    console.log(response.toJSON())

    // finding the matching token ids
    const matchingTokenIds = findMatchingTokenIds(response.toJSON(), tokenIds)

    // checking to see if we have matches or not (boolean)
    const hasMatches = matchingTokenIds.length > 0

    // defining the data as an array of objects
    const data = matchingTokenIds.map((tokenId: string) => ({
      address,
      chain,
      tokenAddress: contractAddress,
      tokenId,
    }))

    // checking that the function works as expected
    console.log('Matching Token IDs:', matchingTokenIds)

    return {
      success: true,
      data, // returning an array of objects containing the matching token ids
      hasMatches, // do provided token ids exist in the data (boolean)
    }
  }
