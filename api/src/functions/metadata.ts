import type { APIGatewayEvent } from 'aws-lambda'

import { logger } from 'src/lib/logger'
import {
  nftByContractAndTokenId,
  nftByStringId,
} from 'src/lib/nfts-custom/nfts-custom'

export const handler = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'GET') return { statusCode: 405 }
  const { contractName, tokenId, lookupId } = event.queryStringParameters || {}

  try {
    if (tokenId && contractName) {
      logger.info(`Request for token ID: ${tokenId}`)

      const nft = await nftByContractAndTokenId(
        parseInt(tokenId, 10),
        contractName
      )

      if (!nft?.data) {
        return { statusCode: 404 }
      }

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nft.data),
      }
    }

    if (lookupId) {
      logger.info(`Request for token ID: ${lookupId}`)

      const nft = await nftByStringId(lookupId)

      if (!nft?.data) {
        return { statusCode: 404 }
      }

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nft.data),
      }
    }

    return { statusCode: 400 }
  } catch (e) {
    logger.error(e)
    return { statusCode: 500 }
  }
}
