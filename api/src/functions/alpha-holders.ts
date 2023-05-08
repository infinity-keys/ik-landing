import { EvmChain } from '@moralisweb3/common-evm-utils'
import { APIGatewayEvent } from 'aws-lambda'
import Moralis from 'moralis'

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

let moralisStarted = false

async function startMoralis() {
  if (moralisStarted) return
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY })
  moralisStarted = true
}

export const handler = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'GET') return { statusCode: 405 }
  if (!event.queryStringParameters) return { statusCode: 400 }
  if (!('tokenId' in event.queryStringParameters)) return { statusCode: 400 }
  const { tokenId } = event.queryStringParameters

  await startMoralis()

  // contract addresses
  const addressEthereum = '0x54b743D6055e3BBBF13eb2C748A3783516156e5B'
  const addressPolygon = '0x7e8E97A66A935061B2f5a8576226175c4fdE0ff9'
  const addressAvalanche = '0xB40fD6825a366081192d890d2760113C066761Ef'

  async function makeRequest(address, chain, tokenId, cursor) {
    return Moralis.EvmApi.nft.getNFTTokenIdOwners({
      address,
      chain,
      tokenId,
      cursor,
    })
  }

  async function getResults(address, chain, tokenId) {
    let cursor = null
    let addresses = []
    let total = 0

    do {
      try {
        const { raw: data } = await makeRequest(address, chain, tokenId, cursor)
        total = data.total
        cursor = data.cursor
        const result = data.result.map((address) => address.owner_of)
        addresses = addresses.concat(result)
      } catch (e) {
        return {
          statusCode: 500,
        }
      }
      await sleep(1000)
    } while (cursor !== '' && cursor !== null)

    return { total, addresses }
  }

  const { total: ethereumCount, addresses: ethereumAddresses } =
    await getResults(addressEthereum, EvmChain.ETHEREUM, tokenId)

  const { total: polygonCount, addresses: polygonAddresses } = await getResults(
    addressPolygon,
    EvmChain.POLYGON,
    tokenId
  )

  const { total: avalancheCount, addresses: avalancheAddresses } =
    await getResults(addressAvalanche, EvmChain.AVALANCHE, tokenId)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      totalCount: ethereumCount + polygonCount + avalancheCount,
      ethereumCount,
      ethereumAddresses,
      polygonCount,
      polygonAddresses,
      avalancheCount,
      avalancheAddresses,
    }),
  }
}
