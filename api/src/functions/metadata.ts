import type { APIGatewayEvent } from 'aws-lambda'

import { logger } from 'src/lib/logger'
import { nftByContractAndTokenId } from 'src/lib/nfts-custom/nfts-custom'

export const handler = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'GET') return { statusCode: 405 }

  const { contractName, tokenId } = event.queryStringParameters || {}
  if (!tokenId || !contractName) return { statusCode: 400 }

  try {
    const nft = await nftByContractAndTokenId(
      parseInt(tokenId, 10),
      contractName
    )

    logger.info(`Request for token ID: ${tokenId}`)

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nft),
    }
  } catch (e) {
    logger.error(e)
    return { statusCode: 500 }
  }
}
