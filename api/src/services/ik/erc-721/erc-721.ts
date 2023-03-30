// export const handler ... becomes exporting a function instead

// the name of the service is what is queried from the frontend...
// ...so name it a verb like "getErc721TokenIds"

// Copy example form "user-custom"
// "MutationResolvers['upsertUser'] = ({" becomes queryresolver instead
// "upsertUser" becomes "getErc721TokenIds"

// http://localhost:8911/graphql

// here is chair's wallet address that has the tokens were looking for (the ones from the contract address in the linear ticket)
// 0xc13eC844Eb19D6A72DDD5F2779484BA35279A817

// import type { QueryResolvers } from 'types/graphql'
// import Moralis from 'moralis'

// if (!Moralis.Core.isStarted) {
//   Moralis.start({
//     apiKey: process.env.MORALIS_API_KEY,
//   })
// }

// export const getErc721TokenIds: QueryResolvers['getErc721TokenIds'] = () => {
//   return {
//     success: true,
//   }
// }

import type { QueryResolvers } from 'types/graphql'
import Moralis from 'moralis'

if (!Moralis.Core.isStarted) {
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  })
}

export const handler = async () => {
  const address = '0xc13eC844Eb19D6A72DDD5F2779484BA35279A817'
  const contractAddress = '0xa4e3513c98b30d4d7cc578d2c328bd550725d1d0'

  const chain = '0x89'

  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    address,
    chain,
    tokenAddresses: [contractAddress],
  })

  console.log(response.toJSON())

  return {
    statusCode: 200,
  }
}

export const getErc721TokenIds: QueryResolvers['getErc721TokenIds'] =
  async () => {
    const response = handler()
    return {
      success: true,
      data: response.data,
    }
  }
